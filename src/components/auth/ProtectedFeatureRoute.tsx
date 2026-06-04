import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar, CheckCircle2, GraduationCap, Lock, Radio, Sparkles, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getFeatureAccess } from '@/lib/access';
import type { Feature } from '@/types/platform';

type Paywall = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  icon: React.ElementType;
  benefits: string[];
  note: string;
};

const PAYWALLS: Partial<Record<Feature, Paywall>> = {
  course_access: {
    eyebrow: 'Power Of Three',
    title: 'Desbloqueia o curso principal',
    body: 'Entra no sistema completo de formação da Money Makers: método, disciplina, journal, museu e comunidade.',
    cta: 'Desbloquear Power Of Three',
    icon: GraduationCap,
    benefits: ['Curso principal completo', 'Turma oficial PO3', 'Trading Journal', 'Museu completo', 'Mentor AI ilimitado'],
    note: 'Recomendado para quem quer aprender o método e construir base real.',
  },
  group_access: {
    eyebrow: 'Turma privada',
    title: 'Entra na turma Power Of Three',
    body: 'A comunidade oficial é reservada para membros ativos do curso principal.',
    cta: 'Entrar no Power Of Three',
    icon: Users,
    benefits: ['Turma oficial', 'Discussões privadas', 'Acompanhamento da jornada', 'Ambiente de disciplina'],
    note: 'A comunidade só faz sentido com o curso ativo.',
  },
  journal_access: {
    eyebrow: 'Disciplina',
    title: 'Desbloqueia o Trading Journal',
    body: 'Transforma execução em dados. Regista decisões, setups e evolução com consistência.',
    cta: 'Aderir ao Power Of Three',
    icon: BookOpen,
    benefits: ['Registo de trades', 'Histórico de execução', 'Leitura de evolução', 'Base para melhoria'],
    note: 'O journal é parte do sistema Power Of Three.',
  },
  museum_access: {
    eyebrow: 'Arquivo premium',
    title: 'Desbloqueia o Museu completo',
    body: 'Estuda análises, exemplos e arquivos da academia para melhorar leitura de mercado.',
    cta: 'Ver Power Of Three',
    icon: Sparkles,
    benefits: ['Análises completas', 'Arquivos de execução', 'Exemplos reais', 'Contexto de estudo'],
    note: 'O museu completo pertence ao ecossistema Power Of Three.',
  },
  broadcasts_access: {
    eyebrow: 'Área premium',
    title: 'Desbloqueia broadcasts premium',
    body: 'Recebe updates, avisos e contexto operacional reservado a membros da área premium.',
    cta: 'Ver área premium',
    icon: Radio,
    benefits: ['Broadcasts premium', 'Updates operacionais', 'Avisos importantes', 'Contexto em tempo real'],
    note: 'Ideal para quem quer acompanhar a operação da Money Makers.',
  },
  signals_access: {
    eyebrow: 'Área premium',
    title: 'Desbloqueia a área premium',
    body: 'Acede ao conteúdo operacional reservado para membros premium.',
    cta: 'Ver área premium',
    icon: Radio,
    benefits: ['Área de membros', 'Broadcasts premium', 'Atualizações', 'Conteúdo operacional'],
    note: 'Podes combinar isto com Power Of Three para formação + execução.',
  },
  mentorship_access: {
    eyebrow: 'Mentoria',
    title: 'Desbloqueia acompanhamento privado',
    body: 'Marca sessões privadas e trabalha objetivos específicos com acompanhamento individual.',
    cta: 'Ver mentoria',
    icon: Calendar,
    benefits: ['Sessões privadas', 'Plano personalizado', 'Revisão individual', 'Acompanhamento direto'],
    note: 'Mentoria é uma linha separada de alto valor.',
  },
  bookings_access: {
    eyebrow: 'Sessões 1:1',
    title: 'Reserva uma sessão com o mentor',
    body: 'As reservas são separadas dos outros planos e começam a partir de 10 USD por slot.',
    cta: 'Ver mentoria',
    icon: Calendar,
    benefits: ['Reserva de sessão', 'Tópico personalizado', 'Confirmação pelo mentor', 'Histórico de reservas'],
    note: 'Reserva apenas quando tiveres um objetivo claro para a sessão.',
  },
  messages_access: {
    eyebrow: 'Comunidade',
    title: 'Desbloqueia mensagens da turma',
    body: 'Mensagens privadas e de turma são reservadas para membros ativos do Power Of Three.',
    cta: 'Aderir ao Power Of Three',
    icon: Users,
    benefits: ['Mensagens da turma', 'Comunidade PO3', 'Interação privada', 'Ambiente de evolução'],
    note: 'A comunicação acompanha o acesso ao curso principal.',
  },
  events_access: {
    eyebrow: 'Eventos premium',
    title: 'Desbloqueia eventos avançados',
    body: 'Eventos premium ficam disponíveis para membros com acesso completo.',
    cta: 'Ver planos',
    icon: Sparkles,
    benefits: ['Eventos especiais', 'Sessões avançadas', 'Acesso prioritário', 'Experiências premium'],
    note: 'Eventos avançados fazem parte do ecossistema completo.',
  },
};

function getPaywall(feature: Feature): Paywall {
  return PAYWALLS[feature] ?? {
    eyebrow: 'Acesso restrito',
    title: 'Funcionalidade bloqueada',
    body: 'Esta área requer uma subscrição ativa da Money Makers.',
    cta: 'Ver planos',
    icon: Lock,
    benefits: ['Acesso premium', 'Conteúdo protegido', 'Experiência completa'],
    note: 'Escolhe o plano certo para desbloquear esta área.',
  };
}

export default function ProtectedFeatureRoute({ feature, children }: { feature: Feature; children: React.ReactNode }) {
  const { user } = useAuth();
  const access = getFeatureAccess(user, feature);

  if (access.level === 'full' || access.level === 'admin') return <>{children}</>;

  const paywall = getPaywall(feature);
  const Icon = paywall.icon;

  return (
    <section className="min-h-[calc(100dvh-56px)] flex items-center justify-center px-6 py-16">
      <div className="max-w-4xl w-full grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-primary/25 bg-card/85 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
              <Icon size={24} />
            </div>
            <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.28em] text-primary">{paywall.eyebrow}</p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{paywall.title}</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground max-w-xl">{paywall.body}</p>
            <Link to="/checkout" className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.01]">
              {paywall.cta}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card/70 p-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-4">O que desbloqueias</p>
          <div className="space-y-3">
            {paywall.benefits.map(item => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/30 p-3">
                <CheckCircle2 size={16} className="mt-0.5 text-primary shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-xl bg-primary/8 p-3 text-xs leading-5 text-muted-foreground">{paywall.note}</p>
          {access.requiredPlans.length > 0 && (
            <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              Plano recomendado: {access.upgradePlan ?? access.requiredPlans[0]}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
