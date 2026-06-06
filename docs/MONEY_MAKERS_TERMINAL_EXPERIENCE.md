# Money Makers Terminal Experience

## Status

Vision foundation v1. This document is the product, design and motion direction before the next visual rebuild.

## Core idea

Money Makers should not feel like a generic trading course website.

Money Makers should feel like a private financial terminal built around Owen, the Money Makers method and the daily discipline of the trader.

The product direction is:

```text
Money Makers Terminal
=
Trading Operating System
+
Private Academy
+
Market Desk
+
AI Mentor
+
Inner Circle
+
Mentorship Layer
```

## Why this matters

The platform is not only selling access to content.

It is selling:

- discipline
- clarity
- market routine
- access to Owen
- a private trading environment
- a sense of belonging
- daily progress
- operational confidence

The design must therefore communicate:

```text
premium
market-driven
institutional
fast
alive
serious
cinematic
trusted
```

Not:

```text
course marketplace
crypto hype
fake luxury
generic SaaS
basic admin dashboard
```

## North Star

A user should open Money Makers every day because the platform answers:

```text
What is happening in the market today?
What is Owen watching?
What should I study next?
What should I avoid?
How am I progressing?
What should I journal?
What should I ask the Mentor AI?
```

The daily ritual is the product.

## Primary product concept

### Daily Market Briefing

The home experience should become a daily command center.

Suggested structure:

```text
Good morning, Milton

Market Status
- London session
- New York session
- Volatility context
- Instruments watched

Owen Briefing
- Broadcast of the day
- Market warning
- Focus area

Your Plan
- Continue course
- Journal next trade
- Ask Mentor AI
- Check Inner Circle

Progress
- Course progress
- Journal streak
- Discipline score
- AI usage
```

## Platform pillars

### 1. Market Desk

Current related areas:

- broadcasts
- signals
- market updates
- premium alerts

Future name options:

- Market Desk
- Owen Market Desk
- MM Market Desk

Purpose:

```text
Operational market awareness.
```

### 2. Academy

Current related areas:

- Power Of Three
- lessons
- modules
- course progress
- museum

Future name options:

- Academy
- Power Of Three Academy
- Learning Desk

Purpose:

```text
Structured trading education.
```

### 3. Mentor AI

Current related areas:

- AI chat
- AI limits
- AI sessions

Future direction:

Mentor AI is not just a chat. It should become the command interface of the platform.

Examples:

```text
Ask: What should I focus on today?
Ask: Review my journal entry.
Ask: Explain this market condition.
Ask: Build a study plan for this week.
```

Purpose:

```text
Daily guidance, conversion and retention.
```

### 4. Inner Circle

Current related areas:

- groups
- messages
- community
- events

Future name options:

- Inner Circle
- PO3 Inner Circle
- Money Makers Circle

Purpose:

```text
Exclusive community, not generic group chat.
```

### 5. Mentorship

Current related areas:

- bookings
- booking slots
- mentorship sessions

Purpose:

```text
High-value private guidance.
```

Booking remains separate from courses and signals. The 10 USD slot logic is part of the mentorship revenue layer.

## Visual language

### Direction

```text
Dark financial terminal
Deep navy / graphite base
Electric blue accents
Subtle green/red market signals
Premium glass panels
High contrast typography
Thin grid lines
Live status dots
Ticker-inspired micro UI
Depth and blur
```

### Avoid

```text
Fake gold luxury
Overused crypto coins
Random candlestick wallpaper
Lamborghini aesthetics
Too many glowing effects
Generic course cards
```

## 3D language

3D should not be decoration only.

It should represent market energy and product meaning.

Recommended 3D concepts:

### Market Energy Field

Abstract flowing market structure with lines, depth, nodes and volatility waves.

Use for:

- landing hero
- dashboard background
- loading state

### Terminal Graph Object

A 3D graph or data surface that feels like financial telemetry, not a normal chart.

Use for:

- Market Desk
- Daily Briefing
- premium product hero

### Floating Financial Objects

Subtle floating objects only when they support the story:

- market grid
- abstract candles
- price nodes
- data cubes
- risk/reward geometry

Avoid making coins the main identity.

## Motion language

Motion should feel like market intelligence, not random animation.

### Micro motion

- hover lift
- magnetic CTA
- soft card glow
- active navigation pulse
- live status dots

### Ambient motion

- slow market wave
- drifting grid
- subtle particle field
- terminal scanlines
- background volatility pulse

### Cinematic motion

- section transitions
- zoom into terminal
- parallax depth
- dashboard reveal
- briefing cards entering sequentially

## Landing experience concept

The landing page should feel like entering a private terminal.

Suggested flow:

```text
1. Hero: The Market Never Sleeps
2. Terminal preview: Daily Briefing
3. Owen layer: Mentor / authority / method
4. Product pillars: Market, Academy, AI, Inner Circle, Mentorship
5. Power Of Three: core product
6. Market Desk / Premium Area
7. Mentorship
8. Proof / credibility / future partner layer
9. Checkout CTA
```

## Member app concept

The member app should not start as a generic dashboard.

It should start as:

```text
Daily Briefing
```

Navigation should be pillar-based:

```text
Home
Market Desk
Academy
Mentor AI
Inner Circle
Mentorship
Profile
```

Admin stays operational:

```text
Payments
Subscriptions
Products
Payment Methods
Broadcasts
Users
Analytics
```

## Feature map

### Already exists / should keep

- Supabase Auth
- subscriptions
- payments
- products
- payment methods
- broadcasts
- signals
- groups
- messages
- bookings
- booking slots
- AI sessions
- AI usage
- entitlement engine
- route gating
- dashboard segmentation
- paywall engine

### Needs connection to real data

- AppBroadcasts
- AppBookings
- Dashboard metrics
- Daily briefing
- broadcasts reads
- booking slots
- booking status

### New features to consider

#### Daily Briefing

Source:

- Owen broadcast
- market note
- AI-generated summary
- user progress
- next action

#### Streaks

- daily login streak
- journal streak
- learning streak
- AI streak

#### Trader Progress Profile

- course progress
- journal score
- discipline score
- consistency score

#### Owen Presence Layer

- daily note
- video briefing
- audio briefing
- pinned message

#### Partner Layer

For future Exness-ready positioning:

- partner section
- broker education disclaimer
- sponsored events
- partner campaigns
- broker-safe language

## Exness-ready positioning

The platform should look mature enough for a broker partner to see value.

What a partner should perceive:

```text
This is not only a mentor selling courses.
This is a structured trading education ecosystem with community, retention, data and operations.
```

Important:

Do not build the visual identity around Exness yet.

Build it so a future partnership feels natural.

## Product naming recommendations

Current names can stay in database, but UI can evolve.

```text
Broadcasts -> Market Desk
Groups -> Inner Circle
Courses -> Academy
Bookings -> Mentorship
Dashboard -> Daily Briefing
AI Chat -> Mentor AI
Museum -> Case Studies / Archive
Trading Journal -> Journal
```

## Implementation roadmap

### Phase 1: Visual foundation

- design tokens
- dark terminal palette
- typography hierarchy
- card system
- motion rules
- grid/background system

### Phase 2: Landing rebuild

- cinematic hero
- 3D market field
- product pillars
- Owen authority
- checkout CTAs

### Phase 3: App shell rebuild

- pillar navigation
- terminal-style sidebar
- better mobile nav
- status indicators

### Phase 4: Daily Briefing

- replace generic dashboard
- market/status briefing
- next actions
- progress widgets

### Phase 5: Real data connection

- broadcasts from Supabase
- bookings from Supabase
- dashboard metrics from Supabase
- AI usage from Supabase

### Phase 6: 3D and motion layer

- Three.js / React Three Fiber experiments
- animated terminal background
- page transitions
- interaction states

## Design rule

Every visual effect must answer one of these:

```text
Does it increase trust?
Does it increase focus?
Does it increase perceived value?
Does it increase daily usage?
Does it support conversion?
```

If not, remove it.

## Final direction

Money Makers Terminal Experience is the new strategic direction.

The product should feel like:

```text
A private market terminal where Owen guides traders through education, market awareness, AI support, community and mentorship.
```

This is the foundation for the next visual redesign.
