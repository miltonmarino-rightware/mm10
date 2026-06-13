# MM10 Master Execution Spec

## Objetivo

Este documento é a fonte da verdade para continuar o desenvolvimento visual e funcional da plataforma Money Makers MM10 com Codex ou qualquer outro agente de código.

O produto não deve parecer uma academia genérica, dashboard admin, clone de TradingView ou app crypto. O objetivo é construir o **Money Makers Command Center**: uma plataforma premium para traders com identidade Money Makers, linguagem de terminal financeiro, comunidade, educação, IA, journal, market desk, mentoria e monetização.

---

## Regras de Marca

1. O logo oficial da Money Makers é intocável.
2. Não gerar novo logo.
3. Não alterar mascote, wordmark ou slogan.
4. UX/UI pode ser redesenhado, mas a marca deve permanecer fiel.
5. A linguagem visual deve ser premium, dark mode first, financeira e focada em execução.
6. Evitar aparência de template Lovable, SaaS genérico, crypto casino ou dashboard administrativo.

---

## Direção Visual

Referências principais:

- Money Makers official identity
- Bloomberg Terminal
- TradingView terminal logic
- Arounda Agency premium polish
- Linear / Raycast / Stripe clarity
- Apple-level spacing and hierarchy

Estilo esperado:

- Dark mode first
- Black / deep navy background
- Electric MM blue as action color
- White typography
- Subtle silver/gray secondary text
- Gold only as premium accent, never dominant
- Terminal grid backgrounds
- Glass panels
- Market glow
- Smooth motion
- Strong typography hierarchy
- Mobile-first behavior

---

## Design Tokens Existentes

Já existem tokens e utilities no `src/index.css`. Todos os próximos ficheiros devem reutilizar estes padrões:

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
- `bg-market-up/10`
- `bg-market-down/10`
- `bg-market-warn/10`

Não criar estilos paralelos se estes tokens resolverem o problema.

---

## Padrões de Componentes

Usar estes padrões em todas as páginas:

### Hero Premium

- `terminal-grid` no wrapper principal
- bloco hero com `mm-brand-field`
- overlay `market-wave`
- título com `font-display`
- tag superior em mono uppercase
- CTA principal com `bg-primary glow-primary`
- CTA secundário com border white/10

### Cards

- usar `terminal-panel rounded-3xl`
- hover discreto: `hover:-translate-y-1 hover:border-primary/25`
- não usar cards brancos ou fundos muito claros na app

### Métricas

- número com `font-mono-num`
- label com mono uppercase
- ícone azul MM
- borda `border-white/10`

### Modais

- backdrop `bg-background/85 backdrop-blur-md`
- modal `terminal-panel rounded-[2rem] shadow-premium`
- botão fechar com `text-muted-foreground hover:text-foreground`

### Locks / Gates

- conteúdo bloqueado deve usar premium lock visual
- CTA sempre para `/checkout`
- não esconder a existência do valor; mostrar preview premium

---

## Role Based Model

A plataforma já considera os seguintes modos:

- FREE
- PO3
- UPDATES
- MENTORSHIP
- PREMIUM
- ADMIN

Não quebrar o modelo de acesso existente. Sempre que uma página tiver conteúdo premium, usar o sistema existente de permissões e gates sempre que possível.

---

## Estado Atual Feito

### Foundation

- Paleta Money Makers Terminal aplicada em `src/index.css`.
- Tokens visuais criados.
- Dark mode first.
- Logo oficial preservado.

### Public Layer

- `src/pages/LandingPage.tsx`
  - Redesenhada como Money Makers Terminal Experience.
  - Hero premium.
  - Market panel.
  - Power Of Three narrative.

### Member Core Layer

- `src/pages/app/AppDashboard.tsx`
  - Daily Briefing.
  - Role-based experience.
  - Market Overview.
  - Mission card.
  - Quick Actions.

- `src/pages/app/AppCourses.tsx`
  - Power Of Three Academy OS.
  - Continue Learning.
  - Learning Roadmap.
  - AI Mentor panel.
  - Inner Circle panel.

- `src/pages/app/AppTrades.tsx`
  - Trading Journal Pro.
  - Execution Ledger.
  - Performance KPIs.
  - AI Review.
  - Premium trade modal.

- `src/pages/app/AppBroadcasts.tsx`
  - Money Makers Market Desk.
  - Live Room.
  - Desk Overview.
  - Priority Signal.
  - Desk Rules.

- `src/pages/app/AppMuseum.tsx`
  - Execution Archive.
  - Trade Museum.
  - Case Studies.
  - Premium locked case studies.

### Intelligence Layer

- `src/pages/app/AppChat.tsx`
  - ChatProvider wrapper maintained.

- `src/pages/ChatPage.tsx`
  - AI Command Center.
  - Strategy Context.
  - Quick Commands.
  - AI Usage.
  - Upgrade screen.

- `src/components/chat/EmptyState.tsx`
  - Money Makers Intelligence Desk.
  - Command cards.
  - Market context active.

- `src/components/chat/MessageBubble.tsx`
  - MM Intelligence.
  - Trader Input.
  - Premium bubbles.

- `src/components/chat/Composer.tsx`
  - Command Bar.
  - Money Makers risk warning.

- `src/components/chat/MessageList.tsx`
  - Market Context.
  - Memory Layer.
  - Risk Layer.
  - Intelligence Feed.

---

## Próxima Ordem de Execução

### Sprint 1 — Community Layer

Arquivos:

- `src/pages/app/AppGroups.tsx`
- `src/pages/app/AppMessages.tsx`

#### AppGroups.tsx

Transformar em **Inner Circle**.

Deve conter:

- Hero: `Inner Circle`
- Subtitle: comunidade privada do Power Of Three
- Cards de métricas:
  - Active Members
  - Live Rooms
  - Mentor Sessions
  - Weekly Wins
- Trading Rooms:
  - London Session
  - New York Session
  - Psychology Room
  - Risk Management
- Mentor Room card
- Leaderboard / Member Activity
- CTA para Power Of Three quando bloqueado

Visual:

- terminal-grid
- mm-brand-field hero
- terminal-panel cards
- member status badges
- premium community feel

#### AppMessages.tsx

Transformar em **Trading Network**.

Deve conter:

- Hero: `Trading Network`
- Inbox / threads premium
- Contact list com status online
- Mentor thread destacado
- Community inbox
- Message preview cards
- Search/filter
- Right panel com member profile / context

Visual:

- não parecer WhatsApp genérico
- parecer rede privada de traders
- usar terminal panels e badges

---

### Sprint 2 — Mentorship / Schedule Layer

Arquivos:

- `src/pages/app/AppBookings.tsx`
- `src/pages/app/AppEvents.tsx`

#### AppBookings.tsx

Transformar em **Private Mentorship Desk**.

Deve conter:

- Hero: `Private Mentorship`
- Slots separados a partir de 10 USD
- Agenda / session slots
- Mentor availability
- Booking summary
- Preparation checklist
- CTA para reservar

Regra comercial:

- Mentoria / marcação é separada dos outros produtos.
- Deve indicar claramente: `from 10 USD per slot`.

#### AppEvents.tsx

Transformar em **Live Sessions**.

Deve conter:

- Hero: `Live Sessions`
- Próximos eventos
- Webinars / market calls
- Premium events locked
- RSVP / Join CTA
- Event status: live, upcoming, replay

---

### Sprint 3 — Identity Layer

Arquivo:

- `src/pages/app/AppProfile.tsx`

Transformar em **Trader Profile**.

Deve conter:

- Trader identity card
- Subscription status
- Current plan
- AI usage
- Course progress
- Journal stats
- Risk profile
- Account settings

---

### Sprint 4 — Conversion Layer

Arquivos/pasta:

- `src/pages/checkout/*`
- criar arquivos se necessário

Criar fluxo comercial completo:

1. Pricing / Plan Selection
2. Checkout
3. Payment Success
4. Post-purchase onboarding

Produtos:

- Power Of Three
- Market Desk / Signals / Updates
- Mentorship bookings from 10 USD
- Premium All Access

Checkout deve parecer:

- Stripe + Apple + Money Makers Terminal
- cards premium
- order summary
- secure payment indicators
- upgrade copy clara

---

### Sprint 5 — Auth Layer Polish

Pasta:

- `src/pages/auth/*`

Objetivo:

- Login premium
- Register premium
- Forgot password if exists
- Splash / welcome experience
- usar logo oficial
- dark mode first

---

### Sprint 6 — Admin Layer

Pasta:

- `src/pages/admin/*`

Transformar em **Admin Mission Control**.

Módulos esperados:

- Users
- Plans
- Revenue
- Courses
- Broadcasts
- Events
- Bookings
- Analytics
- Role management

Admin deve ter aparência diferente do membro:

- mais operacional
- mais data dense
- status badges
- tables premium
- command center admin

---

### Sprint 7 — Backend / Functional Layer

Depois do visual, ligar dados reais:

- Cursos reais
- Trades reais
- Broadcasts reais
- Museum real
- Grupos reais
- Mensagens reais
- Bookings reais
- Eventos reais
- Pagamentos reais
- AI real
- Analytics reais
- Notificações
- Uploads/media

---

## Regras para Codex

Quando usar Codex:

1. Não redesenhar logo.
2. Não alterar rotas sem necessidade.
3. Não remover lógica existente sem razão.
4. Não trocar nomes de exports default.
5. Não quebrar hooks existentes.
6. Não substituir role based model.
7. Reutilizar tokens do `index.css`.
8. Alterar por sprint, não por ficheiro isolado.
9. Fazer commits pequenos por layer.
10. Depois de cada sprint, rodar build/lint se disponível.

---

## Prompt Recomendado para Codex

```text
You are working on the Money Makers MM10 platform.
Read docs/MM10_MASTER_SPEC.md first.
Do not redesign the logo.
Do not create a new brand.
Continue the visual system already implemented in index.css and the redesigned pages.

Implement Sprint 1 — Community Layer:
- src/pages/app/AppGroups.tsx as Inner Circle
- src/pages/app/AppMessages.tsx as Trading Network

Use the existing utilities:
terminal-grid, mm-brand-field, market-wave, terminal-panel, mm-glass, glow-primary, shadow-premium, font-display, font-mono-num.

Preserve existing data and logic when possible.
Do not introduce backend changes.
Focus only on premium UI/UX and consistency.
After changes, run typecheck/build if available.
```

---

## Definition of Done

Uma sprint só está concluída quando:

- Visual segue MM Terminal.
- Mobile não quebra.
- Desktop tem layout premium.
- Não há import inútil.
- Não há rota quebrada.
- Não há logo inventado.
- CTAs apontam para rotas existentes.
- Conteúdo premium aponta para `/checkout`.
- Código mantém TypeScript válido.

---

## North Star

Money Makers MM10 deve parecer uma plataforma que poderia competir globalmente:

- educação premium
- terminal financeiro
- comunidade privada
- AI mentor
- journal profissional
- market desk
- mentoria 1:1
- monetização clara

O objetivo final é transformar Money Makers num **Trading Operating System**.
