import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getFeatureAccess } from '@/lib/access';
import type { Feature } from '@/types/platform';

const FEATURE_COPY: Partial<Record<Feature, { title: string; body: string; cta: string }>> = {
  course_access: {
    title: 'Desbloqueia o Power of Three',
    body: 'Acede ao curso principal, journal, museu completo e turma privada do mentor.',
    cta: 'Ver Power of Three',
  },
  group_access: {
    title: 'Entra no círculo Power of Three',
    body: 'A turma privada é reservada para membros ativos do Power of Three.',
    cta: 'Desbloquear turma',
  },
  journal_access: {
    title: 'Desbloqueia o Trading Journal',
    body: 'Regista trades, acompanha evolução e transforma análise em disciplina.',
    cta: 'Aderir ao Power of Three',
  },
  museum_access: {
    title: 'Desbloqueia o Museu completo',
    body: 'Vê análises completas, exemplos reais e arquivos de execução da academia.',
    cta: 'Ver Power of Three',
  },
  signals_access: {
    title: 'Desbloqueia a sala de sinais',
    body: 'Acede aos sinais e alertas premium da Money Makers.',
    cta: 'Ver planos de sinais',
  },
  broadcasts_access: {
    title: 'Desbloqueia sinais e broadcasts',
    body: 'Recebe alertas, análises e avisos operacionais em tempo real.',
    cta: 'Ver planos de sinais',
  },
  mentorship_access: {
    title: 'Desbloqueia mentoria',
    body: 'Marca sessões privadas e recebe acompanhamento individual.',
    cta: 'Ver mentoria',
  },
  bookings_access: {
    title: 'Reserva uma sessão com o mentor',
    body: 'As reservas são uma linha separada de mentoria, a partir de 10 USD por slot.',
    cta: 'Ver mentoria',
  },
  messages_access: {
    title: 'Desbloqueia mensagens da comunidade',
    body: 'As mensagens privadas e de turma são reservadas para membros do Power of Three.',
    cta: 'Aderir ao Power of Three',
  },
  events_access: {
    title: 'Desbloqueia eventos premium',
    body: 'Eventos avançados ficam disponíveis para membros Premium All Access.',
    cta: 'Ver planos',
  },
};

function getCheckoutTarget(feature: Feature, upgradePlan?: string | null) {
  if (upgradePlan) return `/checkout`;
  if (feature === 'signals_access' || feature === 'broadcasts_access') return '/checkout';
  if (feature === 'mentorship_access' || feature === 'bookings_access') return '/checkout';
  return '/checkout';
}

export default function ProtectedFeatureRoute({ feature, children }: { feature: Feature; children: React.ReactNode }) {
  const { user } = useAuth();
  const access = getFeatureAccess(user, feature);

  if (access.level === 'full' || access.level === 'admin') return <>{children}</>;

  const copy = FEATURE_COPY[feature] ?? {
    title: 'Funcionalidade bloqueada',
    body: 'Esta área requer uma subscrição ativa da Money Makers.',
    cta: 'Ver planos',
  };

  return (
    <section className="min-h-[calc(100dvh-56px)] flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full rounded-3xl border border-primary/25 bg-card/80 p-8 shadow-2xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
          <Lock size={24} />
        </div>
        <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.28em] text-primary">Acesso restrito</p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{copy.title}</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.body}</p>
        <Link
          to={getCheckoutTarget(feature, access.upgradePlan)}
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.01]"
        >
          {copy.cta}
          <ArrowRight size={16} />
        </Link>
        {access.requiredPlans.length > 0 && (
          <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            Plano recomendado: {access.upgradePlan ?? access.requiredPlans[0]}
          </p>
        )}
      </div>
    </section>
  );
}
