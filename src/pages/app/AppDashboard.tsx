import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Bot, Calendar, Crown, GraduationCap, Radio, Sparkles, Target, Trophy, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { hasAccess } from '@/lib/access';

const anim = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

type Mode = 'FREE' | 'PO3' | 'UPDATES' | 'MENTORSHIP' | 'PREMIUM';
type Card = { title: string; desc: string; href: string; icon: React.ElementType; tag?: string };

type Experience = {
  tag: string;
  title: string;
  subtitle: string;
  mission: string;
  cards: Card[];
  upsell?: Card;
};

function getMode(user: ReturnType<typeof useAuth>['user']): Mode {
  const course = hasAccess(user, 'course_access');
  const updates = hasAccess(user, 'broadcasts_access');
  const mentorship = hasAccess(user, 'mentorship_access') || hasAccess(user, 'bookings_access');
  if (course && updates && mentorship) return 'PREMIUM';
  if (mentorship) return 'MENTORSHIP';
  if (updates) return 'UPDATES';
  if (course) return 'PO3';
  return 'FREE';
}

const experiences: Record<Mode, Experience> = {
  FREE: {
    tag: 'Guest Terminal · Preview Access',
    title: 'WHERE TRADERS COME TO WIN',
    subtitle: 'Explora o ecossistema Money Makers. O terminal completo começa no Power Of Three.',
    mission: 'Desbloquear o método certo para a tua fase.',
    cards: [
      { title: 'Power Of Three', desc: 'Curso principal, turma oficial, journal, museu e AI ilimitada.', href: '/checkout', icon: GraduationCap, tag: 'Formação' },
      { title: 'Market Desk', desc: 'Updates, broadcasts e leitura operacional para membros.', href: '/checkout', icon: Radio, tag: 'Premium' },
      { title: 'Mentoria', desc: 'Sessões privadas separadas, a partir de 10 USD por slot.', href: '/checkout', icon: Calendar, tag: '1:1' },
      { title: 'Mentor AI', desc: 'Preview limitado. Power Of Three desbloqueia uso ilimitado.', href: '/app/chat', icon: Bot, tag: 'Preview' },
    ],
  },
  PO3: {
    tag: 'Power Of Three · Trader Development',
    title: 'DISCIPLINE. EXECUTION. WEALTH.',
    subtitle: 'O teu foco é estudar o método, praticar no journal e executar com consistência.',
    mission: 'Completar o próximo módulo e registar a próxima decisão no journal.',
    cards: [
      { title: 'Continuar Curso', desc: 'Volta ao Power Of Three e mantém consistência no currículo.', href: '/app/courses', icon: GraduationCap, tag: 'Curso' },
      { title: 'Trading Journal', desc: 'Regista decisões, setups e evolução com disciplina.', href: '/app/trades', icon: BookOpen, tag: 'Prática' },
      { title: 'Museu', desc: 'Estuda exemplos e arquivos da academia.', href: '/app/museum', icon: Trophy, tag: 'Arquivo' },
      { title: 'Inner Circle', desc: 'Entra na turma oficial do Power Of Three.', href: '/app/groups', icon: Users, tag: 'Comunidade' },
    ],
    upsell: { title: 'Adicionar Market Desk', desc: 'Combina formação com broadcasts e updates de membros.', href: '/checkout', icon: Radio, tag: 'Cross-sell' },
  },
  UPDATES: {
    tag: 'Market Desk · Premium Updates',
    title: 'MARKET INTELLIGENCE DESK',
    subtitle: 'A tua área principal são broadcasts. O próximo passo natural é desbloquear o método completo.',
    mission: 'Acompanhar o próximo update e proteger o capital.',
    cards: [
      { title: 'Broadcasts', desc: 'Vê updates e avisos premium da Money Makers.', href: '/app/broadcasts', icon: Radio, tag: 'Premium' },
      { title: 'Mentor AI', desc: 'Usa o limite diário para clarificar contexto e disciplina.', href: '/app/chat', icon: Bot, tag: 'Limitado' },
    ],
    upsell: { title: 'Aprender Power Of Three', desc: 'Desbloqueia o método completo, turma, journal e museu.', href: '/checkout', icon: GraduationCap, tag: 'Próximo passo' },
  },
  MENTORSHIP: {
    tag: 'Mentorship · Private Access',
    title: 'PRIVATE EXECUTION ROOM',
    subtitle: 'Marca sessões, prepara tópicos e executa o plano definido com o mentor.',
    mission: 'Reservar ou preparar a próxima sessão 1:1.',
    cards: [
      { title: 'Reservar Sessão', desc: 'Marca uma sessão privada. Slots separados a partir de 10 USD.', href: '/app/bookings', icon: Calendar, tag: 'Agenda' },
      { title: 'Mentor AI', desc: 'Apoio para preparar dúvidas e rever conceitos.', href: '/app/chat', icon: Bot, tag: 'Suporte' },
    ],
    upsell: { title: 'Completar ecossistema', desc: 'Adiciona Power Of Three ou Market Desk para fechar formação e acompanhamento.', href: '/checkout', icon: Crown, tag: 'Upgrade' },
  },
  PREMIUM: {
    tag: 'Premium All Access · Command Center',
    title: 'FULL TERMINAL UNLOCKED',
    subtitle: 'Tens acesso total ao ecossistema: formação, market desk, mentoria, journal, museu, AI e comunidade.',
    mission: 'Operar o dia com visão total do sistema.',
    cards: [
      { title: 'Curso PO3', desc: 'Continua a formação principal.', href: '/app/courses', icon: GraduationCap, tag: 'Curso' },
      { title: 'Market Desk', desc: 'Acompanha broadcasts e sinais.', href: '/app/broadcasts', icon: Radio, tag: 'Premium' },
      { title: 'Mentoria', desc: 'Reserva e acompanha sessões privadas.', href: '/app/bookings', icon: Calendar, tag: '1:1' },
      { title: 'Journal', desc: 'Regista e melhora execução.', href: '/app/trades', icon: BookOpen, tag: 'Disciplina' },
    ],
  },
};

const market = [
  { symbol: 'EUR/USD', value: '1.08745', change: '+0.31%', up: true },
  { symbol: 'XAU/USD', value: '2,329.15', change: '+0.41%', up: true },
  { symbol: 'NAS100', value: '19,712.45', change: '-0.21%', up: false },
];

const bars = [42, 58, 51, 76, 64, 88, 72, 94, 86, 100, 91, 112];

function ActionCard({ card }: { card: Card }) {
  const Icon = card.icon;
  return (
    <Link to={card.href} className="group terminal-panel rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-primary shadow-card"><Icon size={20} /></div>
        {card.tag && <span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{card.tag}</span>}
      </div>
      <p className="text-sm font-semibold text-foreground">{card.title}</p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{card.desc}</p>
      <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary">Abrir <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" /></div>
    </Link>
  );
}

export default function AppDashboard() {
  const { user } = useAuth();
  const mode = getMode(user);
  const experience = experiences[mode];
  const canSeeBroadcasts = mode === 'UPDATES' || mode === 'PREMIUM';

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="min-h-full terminal-grid p-4 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section variants={anim} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-background shadow-premium">
          <div className="absolute inset-0 mm-brand-field opacity-90" />
          <div className="absolute inset-0 market-wave animate-market-drift opacity-70" />
          <div className="absolute -right-24 top-12 h-72 w-72 rounded-full border border-white/10 bg-primary/10 blur-3xl" />
          <div className="relative grid gap-8 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <div className="space-y-8">
              <div>
                <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.32em] text-primary">{experience.tag}</p>
                <h1 className="font-display text-4xl uppercase leading-[0.92] text-foreground text-glow-primary sm:text-5xl lg:text-7xl">
                  Daily<br />Briefing
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">{experience.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/app/chat" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground glow-primary transition hover:scale-[1.01]">
                  Abrir Mentor AI <ArrowRight size={16} />
                </Link>
                <Link to="/checkout" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-white/[0.07]">
                  Ver planos
                </Link>
              </div>
            </div>

            <div className="terminal-panel rounded-3xl p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Market Overview</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">London Session · Market Open</p>
                </div>
                <span className="rounded-full bg-market-up/10 px-3 py-1 text-[10px] font-mono uppercase text-market-up">Live</span>
              </div>
              <div className="mb-5 flex h-36 items-end gap-2 rounded-2xl border border-white/10 bg-black/20 p-4">
                {bars.map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-primary/80" style={{ height: `${Math.min(h, 100)}%`, opacity: 0.28 + i / 20 }} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {market.map(item => (
                  <div key={item.symbol} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                    <p className="text-[10px] font-mono text-muted-foreground">{item.symbol}</p>
                    <p className="mt-2 text-sm font-mono-num text-foreground">{item.value}</p>
                    <p className={`text-[10px] font-mono ${item.up ? 'text-market-up' : 'text-market-down'}`}>{item.change}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={anim} className="grid gap-3 lg:grid-cols-4">
          <div className="terminal-panel rounded-3xl p-5 lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Target size={22} /></div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary">Today's Mission</p>
                <h2 className="mt-2 text-xl font-bold text-foreground">{experience.mission}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">O terminal mostra só o próximo passo. Menos ruído, mais execução.</p>
              </div>
            </div>
          </div>
          <div className="terminal-panel rounded-3xl p-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Power Of Three</p>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-4xl font-mono-num font-bold text-foreground">72%</span>
              <Sparkles size={22} className="text-primary" />
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10"><div className="h-full w-[72%] rounded-full bg-primary" /></div>
          </div>
          <div className="terminal-panel rounded-3xl p-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Journal Streak</p>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-4xl font-mono-num font-bold text-foreground">21</span>
              <Zap size={22} className="text-premium-gold" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">dias de disciplina</p>
          </div>
        </motion.section>

        <motion.section variants={anim}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Próximas ações</h2>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{mode}</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{experience.cards.map(card => <ActionCard key={card.title} card={card} />)}</div>
        </motion.section>

        {experience.upsell && (
          <motion.section variants={anim} className="mm-glass rounded-3xl p-5 lg:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Sparkles size={20} /></div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-1">{experience.upsell.tag}</p>
                  <h3 className="font-semibold text-foreground">{experience.upsell.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{experience.upsell.desc}</p>
                </div>
              </div>
              <Link to={experience.upsell.href} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground glow-primary-sm">Ver planos <ArrowRight size={16} /></Link>
            </div>
          </motion.section>
        )}

        {canSeeBroadcasts && (
          <motion.section variants={anim} className="terminal-panel rounded-3xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Market Desk · Broadcasts recentes</h2>
              <Link to="/app/broadcasts" className="flex items-center gap-1 text-xs text-primary hover:underline">Ver todos <ArrowRight size={12} /></Link>
            </div>
            <div className="grid gap-2 lg:grid-cols-3">
              {['Análise semanal', 'Update premium', 'Dica: Gestão de risco'].map((title, index) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-[9px] font-mono uppercase tracking-[0.16em] text-primary">{index === 1 ? 'Urgente' : 'Desk'}</span>
                  <p className="mt-3 text-sm font-semibold text-foreground">{title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{index === 0 ? 'Hoje, 14:30' : index === 1 ? 'Hoje, 10:15' : 'Ontem'}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.div>
  );
}
