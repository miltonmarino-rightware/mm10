# Access Model Reconciliation Plan

Decouple **operational roles** (admin/mentor/staff) from **commercial entitlements** (derived from active subscriptions). Roles only govern platform management; what a customer sees is driven entirely by `subscriptions → product → entitlements`.

User decisions captured:
- Sidebar: **hide** items the user is not entitled to.
- Mentor: **operational only**, no content bypass.
- Paywall destination: **new `/plans` page**.
- FREE users: **auto-create a FREE subscription row** so entitlement logic always has a row to read.

---

## Phase 0 — Database & enums (foundation)

1. Extend `subscription_plan` enum with `FREE`, `SIGNALS_BASIC`, `SIGNALS_PLATINUM`, `SIGNALS_PREMIUM` (additive; existing values kept).
2. Ensure 7 rows exist in `products` (one per plan), seeded with price/duration/features. Mark the missing ones inactive if data not ready, but the rows must exist.
3. Rewrite trigger `handle_subscription_activation()`:
   - Remove the `UPDATE profiles SET role = …` block (role is operational, never written by purchase).
   - Replace hard-coded group join with a small lookup `plan_default_groups(plan_type, group_name)` so plans can opt-in to auto-add.
4. Update `handle_new_user()` to also insert a row into `subscriptions` with `plan_type='FREE'`, `status='active'`, `expires_at=NULL` (idempotent on conflict).
5. Backfill: insert FREE subscription for every existing user without any active subscription.
6. Tighten RLS on `broadcasts` SELECT: require `is_admin() OR is_mentor() OR is_signals_active()` in addition to the target filter, so FREE users cannot read `target='all'` broadcasts.
7. Add SQL helper `has_entitlement(text)` (security definer) that returns true if the caller has any active subscription whose plan grants the entitlement — used by future RLS tightening but not required everywhere now.

## Phase 1 — Single source of truth in the frontend

8. Rewrite `src/lib/access.ts`:
   - `Entitlement` union: `course_access | group_access | journal_access | ai_access | museum_full_access | signals_access | broadcasts_access | mentorship_access`.
   - `Operational` union: `admin_panel | manage_payments | manage_products | manage_payment_methods | manage_subscriptions | manage_content`.
   - `PLAN_ENTITLEMENTS` map per §3 of the audit.
   - `activeSubscriptions(user)`, `hasEntitlement(user, e)`, `isStaff(user)` (admin/super_admin), `hasOperationalPermission(user, p)`.
   - Remove `mentor` from the staff-bypass set; mentors get operational permissions for content management only.
9. Update `src/types/platform.ts` to align unions with the new enums.
10. Update `AuthContext`:
    - Expose `hasEntitlement`, `isStaff`, `hasOperationalPermission` (keep `hasAccess` as a thin shim during migration).
    - On hydrate, if user has zero `subscriptions`, optimistically treat as FREE so UI doesn't flicker before backfill row appears.

## Phase 2 — Route guards & navigation

11. In `src/App.tsx`:
    - Keep `ProtectedRoute` (auth-only).
    - Replace `AdminRoute` with `StaffRoute` using `isStaff()`.
    - Add `EntitledRoute entitlement="…"` that renders the child if entitled, otherwise redirects to `/plans?need=<entitlement>`.
    - Wrap: `/app/chat` (ai_access), `/app/courses` (course_access), `/app/trades` (journal_access), `/app/broadcasts` (broadcasts_access), `/app/bookings` (mentorship_access), `/app/groups` (group_access). `/app/museum`, `/app/messages`, `/app/events`, `/app/profile`, `/app` stay auth-only (content is filtered inside).
12. Rework `src/config/menu.ts` so each nav item carries an optional `requires?: Entitlement` (client) or `requires?: Operational` (admin).
13. Rework `DashboardLayout`:
    - Filter `clientNav` by `hasEntitlement` (hide non-entitled per user decision).
    - Filter `adminNav` by per-item operational permission.
    - Replace the email-substring "Admin panel" link with `isStaff(user)` check.

## Phase 3 — Paywall & checkout

14. Create `/plans` page driven by the live `products` table:
    - One card per active product with price (MZN/USD), features, "Subscrever" → `/checkout/:productId`.
    - Accepts `?need=<entitlement>` to highlight matching plans.
15. Fix `RequireFeature` component: link to `/plans?need=<feature>` instead of the non-existent `/app/checkout`. Use the new `hasEntitlement`.
16. Ensure `CheckoutCreatePage` reads the product by id from the table (no mocks).

## Phase 4 — Page-level content gating

17. Wrap premium sections inside each gated page with `RequireFeature` so a directly-typed URL renders the paywall card instead of an empty shell.
18. `AppCourses`: list all published courses; non-entitled users see "Subscrever para desbloquear" on premium cards. Public-visibility courses stay clickable.
19. `AppMuseum`: render public items to all authenticated users; lock premium tiles for non-entitled.
20. `AppBroadcasts`, `AppGroups`, `AppTrades`, `AppChat`, `AppBookings`: paywall card when not entitled.
21. `AppDashboard`: render entitlement-aware cards; show "Upgrade" tiles for entitlements the user is missing.
22. `AppProfile`: list active subscriptions + upgrade CTAs to `/plans`.
23. `LandingPage` CTAs: verify all "Comprar / Começar" buttons resolve to real product ids from the table.

## Phase 5 — Hygiene

24. Remove dead/mock access modals.
25. Add a Playwright smoke matrix: FREE, POWER_OF_THREE, SIGNALS_PREMIUM, POWER_OF_THREE+SIGNALS_PREMIUM, PREMIUM_ALL_ACCESS, admin — each navigates the sidebar and asserts visible items + that direct-URL access to gated routes redirects to `/plans`.
26. Update memory: replace "Two main profiles: Admin and Cliente/Aluno" with the new role/entitlement separation.

---

## Technical reference

```text
User
 ├─ profiles.role  ── operational (admin, super_admin, mentor, support, moderator, user)
 └─ subscriptions[] ── commercial (FREE, POWER_OF_THREE, SIGNALS_*, MENTORSHIP, PREMIUM_ALL_ACCESS)
                       │
                       └─▶ PLAN_ENTITLEMENTS map ──▶ Entitlement[] ──▶ UI gates + RLS helpers
```

Key invariants:
- Nothing outside the operational layer ever writes `profiles.role`.
- Nothing outside the commercial layer ever decides UI access by reading `profiles.role` (except `isStaff` bypass).
- Sidebar visibility = `hasEntitlement` (client) / `hasOperationalPermission` (admin).
- Direct-URL access to a gated route → `/plans?need=<entitlement>`.
- RLS remains the security boundary; UI gates are UX only.

## Out of scope (explicit)
- No visual redesign of pages.
- No checkout/payment flow refactor beyond using real product ids and adding the `/plans` page.
- No new admin features.

## Rollout order
Phase 0 → 1 → 2 → 3 → 4 → 5, with a DB-only deployable checkpoint after Phase 0 and a feature-flagged frontend checkpoint after Phase 2.
