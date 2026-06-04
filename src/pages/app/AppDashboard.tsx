import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Bot, Calendar, Crown, GraduationCap, Radio, Sparkles, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { hasAccess } from '@/lib/access';

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

type Mode = 'FREE' | 'PO3' | 'UPDATES' | 'MENTORSHIP' | 'PREMIUM';
type Card = { title: string; desc: string; href: string; icon: React.ElementType; tag?: string };

type Experience = {
  tag: string;
  title: string;
  italic: string;
  subtitle: string;
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
    tag: 'Money Makers · Start here',
    title: 'Escolhe o teu próximo',
    italic: 'nível',
    subtitle: 'Experimenta a plataforma, fala com o Mentor AI e desbloqueia a área certa para a tua fase.',
    cards: [
      { title: 'Power Of Three', desc: 'Curso principal, turma oficial, journal, museu e AI ilimitada.', href: '/checkout', icon: GraduationCap, tag: 'Formação' },
      { title: 'Área Premium', desc: 'Acede a updates e broadcasts para membros.', href: '/checkout', icon: Radio, tag: 'Premium' },
      { title: 'Mentoria', desc: 'Sessões privadas separadas, a partir de 10 USD por slot.', href: '/checkout', icon: Calendar, tag: '1:1' },
      { title: 'Mentor AI', desc: 'Começa com acesso limitado e desbloqueia uso ilimitado no Power Of Three.', href: '/app/chat', icon: Bot, tag: 'Preview' },
    ],
  },
  PO3: {
    tag: 'Power Of Three · Learning path',
    title: 'Continua a tua',
    italic: 'evolução',
    subtitle: 'A tua prioridade é consumir o curso, praticar no journal e usar a comunidade oficial.',
    cards: [
      { title: 'Continuar Curso', desc: 'Volta ao Power Of Three e mantém consistência no currículo.', href: '/app/courses', icon: GraduationCap, tag: 'Curso' },
      { title: 'Trading Journal', desc: 'Regista decisões, setups e evolução com disciplina.', href: '/app/trades', icon: BookOpen, tag: 'Prática' },
      { title: 'Museu', desc: 'Estuda exemplos e arquivos da academia.', href: '/app/museum', icon: Trophy, tag: 'Arquivo' },
      { title: 'Turma PO3', desc: 'Entra na turma oficial do Power Of Three.', href: '/app/groups', icon: Users, tag: 'Comunidade' },
    ],
    upsell: { title: 'Adicionar Área Premium', desc: 'Combina formação com broadcasts e updates de membros.', href: '/checkout', icon: Radio, tag: 'Cross-sell' },
  },
  UPDATES: {
    tag: 'Premium Updates · Member area',
    title: 'Área premium em',
    italic: 'foco',
    subtitle: 'A tua área principal são broadcasts. O próximo passo natural é desbloquear o método completo.',
    cards: [
      { title: 'Broadcasts', desc: 'Vê updates e avisos premium da Money Makers.', href: '/app/broadcasts', icon: Radio, tag: 'Premium' },
      { title: 'Mentor AI', desc: 'Usa o limite diário para clarificar contexto e disciplina.', href: '/app/chat', icon: Bot, tag: 'Limitado' },
    ],
    upsell: { title: 'Aprender Power Of Three', desc: 'Desbloqueia o método completo, turma, journal e museu.', href: '/checkout', icon: GraduationCap, tag: 'Próximo passo' },
  },
  MENTORSHIP: {
    tag: 'Mentoria · Private work',
    title: 'Acompanhamento',
    italic: 'privado',
    subtitle: 'A tua prioridade é marcar sessões, preparar tópicos e executar o plano definido com o mentor.',
    cards: [
      { title: 'Reservar Sessão', desc: 'Marca uma sessão privada. Slots separados a partir de 10 USD.', href: '/app/bookings', icon: Calendar, tag: 'Agenda' },
      { title: 'Mentor AI', desc: 'Apoio ilimitado para preparar dúvidas e rever conceitos.', href: '/app/chat', icon: Bot, tag: 'Suporte' },
    ],
    upsell: { title: 'Completar ecossistema', desc: 'Adiciona Power Of Three ou área premium para fechar formação e acompanhamento.', href: '/checkout', icon: Crown, tag: 'Upgrade' },
  },
  PREMIUM: {
    tag: 'Premium All Access · Command center',
    title: 'Centro de',
    italic: 'comando',
    subtitle: 'Tens acesso total ao ecossistema: formação, broadcasts, mentoria, journal, museu, AI e comunidade.',
    cards: [
      { title: 'Curso PO3', desc: 'Continua a formação principal.', href: '/app/courses', icon: GraduationCap, tag: 'Curso' },
      { title: 'Broadcasts', desc: 'Acompanha a área premium.', href: '/app/broadcasts', icon: Radio, tag: 'Premium' },
      { title: 'Mentoria', desc: 'Reserva e acompanha sessões privadas.', href: '/app/bookings', icon: Calendar, tag: '1:1' },
      { title: 'Journal', desc: 'Regista e melhora execução.', href: '/app/trades', icon: BookOpen, tag: 'Disciplina' },
    ],
  },
};

const recentBroadcasts = [
  { id: '1', title: 'Análise semanal', priority: 'high' as const, date: 'Hoje, 14:30' },
  { id: '2', title: 'Update premium', priority: 'urgent' as const, date: 'Hoje, 10:15' },
  { id: '3', title: 'Dica: Gestão de risco', priority: 'normal' as const, date: 'Ontem' },
];

const priorityColors = { normal: 'bg-muted text-muted-foreground', high: 'bg-primary/15 text-primary', urgent: 'bg-destructive/15 text-destructive' };
const priorityLabels = { normal: 'Normal', high: 'Alta', urgent: 'Urgente' };

function ActionCard({ card }: { card: Card }) {
  const Icon = card.icon;
  return (
    <Link to={card.href} className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/25 hover:bg-card/80">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon size={20} /></div>
        {card.tag && <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{card.tag}</span>}
      </div>
      <p className="text-sm font-semibold text-foreground">{card.title}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{card.desc}</p>
      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">Abrir <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" /></div>
    </Link>
  );
}

export default function AppDashboard() {
  const { user } = useAuth();
  const mode = getMode(user);
  const experience = experiences[mode];
  const canSeeBroadcasts = mode === 'UPDATES' || mode === 'PREMIUM';

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <motion.div variants={anim} className="rounded-3xl border border-border bg-card p-6 lg:p-8 overflow-hidden relative">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-3">{experience.tag}</p>
          <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">{experience.title} <span className="font-serif-italic text-primary/90">{experience.italic}</span></h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">{experience.subtitle}</p>
        </div>
      </motion.div>

      <motion.div variants={anim}>
        <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">Próximas ações</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">{experience.cards.map(card => <ActionCard key={card.title} card={card} />)}</div>
      </motion.div>

      {experience.upsell && (
        <motion.div variants={anim} className="rounded-2xl border border-primary/25 bg-primary/8 p-5 lg:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary"><Sparkles size={20} /></div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-1">{experience.upsell.tag}</p>
                <h3 className="font-semibold text-foreground">{experience.upsell.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{experience.upsell.desc}</p>
              </div>
            </div>
            <Link to={experience.upsell.href} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">Ver planos <ArrowRight size={16} /></Link>
          </div>
        </motion.div>
      )}

      {canSeeBroadcasts && (
        <motion.div variants={anim}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Broadcasts recentes</h2>
            <Link to="/app/broadcasts" className="text-xs text-primary hover:underline flex items-center gap-1">Ver todos <ArrowRight size={12} /></Link>
          </div>
          <div className="space-y-2">
            {recentBroadcasts.map(b => (
              <div key={b.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/10 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase ${priorityColors[b.priority]}`}>{priorityLabels[b.priority]}</div>
                  <span className="text-sm text-foreground truncate">{b.title}</span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 ml-3">{b.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
