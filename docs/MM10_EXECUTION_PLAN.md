# MM10 Execution Plan

## Purpose

This document is the sprint-by-sprint execution plan for finishing the Money Makers MM10 platform quickly while keeping the visual identity consistent.

Every coding agent must read:

1. `AGENTS.md`
2. `docs/MM10_MASTER_SPEC.md`
3. `docs/MM10_EXECUTION_PLAN.md`

Then execute only the current sprint requested by the user.

---

## Global Rules

- Do not redesign the Money Makers logo.
- Do not create a new brand.
- Do not remove existing routes.
- Do not change default exports unless required.
- Do not remove existing role-based access logic.
- Use the Money Makers Terminal visual system.
- Reuse utilities from `src/index.css`.
- No backend changes during visual sprints.
- No payment integrations during visual sprints.
- Keep TypeScript valid.
- Keep mobile and desktop responsive.

---

## Visual Utilities To Use

- `terminal-grid`
- `mm-brand-field`
- `market-wave`
- `terminal-panel`
- `mm-glass`
- `glow-primary`
- `glow-primary-sm`
- `shadow-premium`
- `shadow-card`
- `font-display`
- `font-mono-num`
- `text-gradient-primary`
- `text-market-up`
- `text-market-down`
- `text-market-warn`

---

# Sprint 1 — Community Layer

## Files

- `src/pages/app/AppGroups.tsx`
- `src/pages/app/AppMessages.tsx`

## Goal

Transform the community area into a premium private trading network.

### AppGroups.tsx → Inner Circle

Required experience:

- Hero: `Inner Circle`
- Subtitle: private Power Of Three trading community
- Metrics:
  - Active Members
  - Live Rooms
  - Mentor Sessions
  - Weekly Wins
- Trading rooms:
  - London Session
  - New York Session
  - Psychology Room
  - Risk Management
- Mentor Room card
- Member leaderboard
- Recent activity feed
- Premium lock CTA to `/checkout` when needed

### AppMessages.tsx → Trading Network

Required experience:

- Hero: `Trading Network`
- Private conversations layout
- Left side: contacts / threads
- Center: conversation preview/feed
- Right side: trader context/profile
- Mentor thread highlighted
- Online status indicators
- Premium visual style

## Done When

- Both pages use MM Terminal style.
- Both pages are responsive.
- No backend changes.
- Routes and exports preserved.
- Build/typecheck passes if available.

---

# Sprint 2 — Mentorship / Schedule Layer

## Files

- `src/pages/app/AppBookings.tsx`
- `src/pages/app/AppEvents.tsx`

## Goal

Create the premium scheduling and live session experience.

### AppBookings.tsx → Private Mentorship Desk

Required experience:

- Hero: `Private Mentorship`
- Clear commercial rule: `from 10 USD per slot`
- Mentor availability
- Session cards
- Booking summary
- Preparation checklist
- CTA to reserve

### AppEvents.tsx → Live Sessions

Required experience:

- Hero: `Live Sessions`
- Upcoming events
- Live / upcoming / replay status
- Premium locked events
- RSVP / Join CTA
- Market calls and webinars

## Done When

- Mentorship is clearly separate from other products.
- Events feel like premium trading sessions.
- No backend/payment integration added.

---

# Sprint 3 — Identity Layer

## File

- `src/pages/app/AppProfile.tsx`

## Goal

Transform the profile into a premium trader profile.

Required experience:

- Hero: `Trader Profile`
- Trader identity card
- Current plan
- Subscription status
- AI usage
- Course progress
- Journal stats
- Risk profile
- Account settings
- Upgrade CTA when relevant

---

# Sprint 4 — Conversion Layer

## Files

- `src/pages/checkout/*`

## Goal

Create or improve the monetization flow.

Required products:

- Power Of Three
- Market Desk / Signals / Updates
- Mentorship
- Premium All Access

Required screens:

- Pricing / plan selection
- Checkout
- Payment success
- Post-purchase onboarding

Rules:

- Do not add real payment provider unless existing code already supports it.
- CTA for locked premium content should use `/checkout`.
- The checkout experience should feel like Stripe + Apple + Money Makers Terminal.

---

# Sprint 5 — Auth Polish

## Files

- `src/pages/auth/*`

## Goal

Make authentication feel premium and aligned with Money Makers.

Required experience:

- Login screen
- Register screen
- Password recovery if present
- Mobile-first layout
- Official logo usage
- Dark mode first
- Welcome/splash energy

---

# Sprint 6 — Admin Layer

## Files

- `src/pages/admin/*`

## Goal

Transform admin into Mission Control.

Required modules:

- Users
- Plans
- Revenue
- Courses
- Broadcasts
- Events
- Bookings
- Analytics
- Role management

Admin should be more operational and data dense than the member experience.

---

# Sprint 7 — Backend / Functional Layer

Only after visual layer is stable.

Required integrations later:

- Real courses
- Real trades
- Real broadcasts
- Real museum archive
- Real groups
- Real messages
- Real bookings
- Real events
- Real checkout/payments
- Real AI context
- Analytics
- Notifications
- Upload/media
- Future Exness/broker integration

---

# Recommended Codex Workflow

## Step 1

Open Codex and connect/select the GitHub repository:

`miltonmarino-rightware/mm10`

If Codex asks for sandbox setup, allow it to inspect and modify the repository.

## Step 2

Start with Sprint 1 only.

Use this prompt:

```text
Read AGENTS.md, docs/MM10_MASTER_SPEC.md and docs/MM10_EXECUTION_PLAN.md first.

Implement Sprint 1 — Community Layer only.

Files:
- src/pages/app/AppGroups.tsx
- src/pages/app/AppMessages.tsx

Transform Groups into Inner Circle and Messages into Trading Network.

Preserve existing routes, hooks, exports and access logic.
Do not redesign the Money Makers logo.
Do not create a new brand.
Do not add backend or payment integrations.
Reuse the Money Makers Terminal utilities from src/index.css.

After changes, run build/typecheck if available and fix errors.
Summarize changed files and what was changed.
```

## Step 3

Review the diff.

Accept only if:

- It follows the Money Makers Terminal style.
- It does not invent new branding.
- It does not remove important logic.
- It does not create random files unnecessarily.
- TypeScript/build is clean.

## Step 4

Then execute Sprint 2 with the same pattern.

---

# Final Target

Money Makers MM10 should become a complete Trading Operating System:

- Landing
- Dashboard
- Courses
- Trading Journal
- Market Desk
- AI Mentor
- Execution Archive
- Inner Circle
- Trading Network
- Mentorship
- Events
- Profile
- Checkout
- Admin
- Backend
