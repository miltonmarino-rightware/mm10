# AGENTS.md — Money Makers MM10

## Purpose

This repository contains the Money Makers MM10 platform. Any coding agent must follow this file and `docs/MM10_MASTER_SPEC.md` before making changes.

The product direction is **Money Makers Command Center**: a premium trading operating system with education, market desk, AI mentor, trading journal, community, mentorship and monetization.

Do not turn this product into a generic SaaS, crypto app, academy template, admin dashboard, or TradingView clone.

---

## Mandatory Reading Order

Before modifying files, read:

1. `AGENTS.md`
2. `docs/MM10_MASTER_SPEC.md`
3. Existing target files
4. Related hooks/components/types

---

## Brand Rules

- Do not redesign the Money Makers logo.
- Do not create a new logo.
- Do not replace the official mascot, wordmark, or slogan.
- Preserve Money Makers identity.
- UI can be improved, but brand assets are sacred.

---

## Visual System

Use the existing visual utilities from `src/index.css`:

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

Do not introduce a parallel design system unless absolutely necessary.

---

## Development Rules

- Preserve existing routes.
- Preserve default exports.
- Preserve hooks and context providers.
- Preserve the role-based access model.
- Do not remove business logic unless instructed.
- Do not add backend, payment, or database integrations during visual sprints unless explicitly requested.
- Use TypeScript-compatible code.
- Avoid unused imports.
- Keep mobile and desktop layouts working.
- Premium content should route to `/checkout`.

---

## Current Completed Visual Layers

Already redesigned:

- `src/pages/LandingPage.tsx`
- `src/pages/app/AppDashboard.tsx`
- `src/pages/app/AppCourses.tsx`
- `src/pages/app/AppTrades.tsx`
- `src/pages/app/AppBroadcasts.tsx`
- `src/pages/app/AppMuseum.tsx`
- `src/pages/ChatPage.tsx`
- `src/components/chat/EmptyState.tsx`
- `src/components/chat/MessageBubble.tsx`
- `src/components/chat/Composer.tsx`
- `src/components/chat/MessageList.tsx`

These files define the current visual standard. New work must look consistent with them.

---

## Remaining Execution Order

### Sprint 1 — Community Layer

Files:

- `src/pages/app/AppGroups.tsx`
- `src/pages/app/AppMessages.tsx`

Goal:

- Groups becomes **Inner Circle**
- Messages becomes **Trading Network**

### Sprint 2 — Mentorship / Schedule Layer

Files:

- `src/pages/app/AppBookings.tsx`
- `src/pages/app/AppEvents.tsx`

Goal:

- Bookings becomes **Private Mentorship Desk**
- Events becomes **Live Sessions**
- Mentorship must be clearly positioned as a separate paid product from 10 USD per slot.

### Sprint 3 — Identity Layer

File:

- `src/pages/app/AppProfile.tsx`

Goal:

- Profile becomes **Trader Profile**

### Sprint 4 — Conversion Layer

Files:

- `src/pages/checkout/*`

Goal:

- Create or improve pricing/checkout flow for:
  - Power Of Three
  - Market Desk / Signals / Updates
  - Mentorship
  - Premium All Access

### Sprint 5 — Auth Polish

Files:

- `src/pages/auth/*`

Goal:

- Premium login/register/welcome experience.

### Sprint 6 — Admin Layer

Files:

- `src/pages/admin/*`

Goal:

- Admin Mission Control.

---

## Definition of Done

A change is only complete when:

- It follows `docs/MM10_MASTER_SPEC.md`.
- It matches the current MM Terminal visual language.
- It works on mobile and desktop.
- It does not invent new branding.
- It does not break routes or exports.
- It does not remove access logic.
- It has no obvious TypeScript errors.
- It summarizes changed files and intent.

---

## Recommended Agent Prompt

Use this when starting a sprint:

```text
Read AGENTS.md and docs/MM10_MASTER_SPEC.md first.
Implement the next sprint exactly as described.
Preserve existing routes, hooks, exports, and role-based access.
Do not redesign the logo or create a new brand.
Reuse the existing Money Makers Terminal utilities from src/index.css.
No backend changes unless explicitly requested.
After changes, run build/typecheck if available and fix errors.
Summarize changed files and visual changes.
```
