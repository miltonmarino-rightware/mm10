import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Crown, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { hasAccess } from '@/lib/access';
import PremiumGate from '@/components/common/PremiumGate';

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AppGroups() {
  const navigate = useNavigate();
  const { platformUser } = useAuth();
  const canAccessGroup = hasAccess(platformUser, 'group_access');

  if (!canAccessGroup) {
    return (
      <PremiumGate
        feature="group_access"
        eyebrow="Grupo oficial do curso"
        title="The Power of 3"
        description="O grupo oficial só é desbloqueado com uma subscrição ativa do curso Power of Three. Aqui ficam as conversas, avisos, partilhas e acompanhamento da turma oficial."
        bullets={['Turma oficial do curso', 'Comunidade fechada de alunos', 'Avisos e acompanhamento do mentor', 'Acesso ligado à tua subscrição']}
        ctaLabel="Comprar Power of Three"
      />
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto"
    >
      <motion.div variants={anim}>
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">
          Comunidade · Turma Oficial
        </p>
        <h1 className="text-3xl font-bold text-foreground">
          The Power of <span className="font-serif-italic font-normal text-primary">3</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          A única turma oficial ligada ao curso Power of Three.
        </p>
      </motion.div>

      <motion.div
        variants={anim}
        className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 transition-all"
      >
        <div className="absolute top-0 right-0 w-52 h-52 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
              <Crown size={20} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-1">
                Power of Three · Grupo Oficial
              </p>
              <h2 className="text-xl font-bold text-foreground">Turma Power of 3</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                Grupo fechado para alunos com subscrição ativa do Power of Three. Toda a comunidade do curso deve viver aqui — sem turmas paralelas, sem grupos inventados e sem acesso fora da subscrição.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-muted-foreground mt-4">
                <span className="flex items-center gap-1.5"><Users size={12} /> turma oficial</span>
                <span className="flex items-center gap-1.5"><Lock size={12} /> acesso ativo</span>
                <span className="flex items-center gap-1.5"><MessageSquare size={12} /> comunidade do curso</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/app/messages')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
          >
            Entrar no grupo <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>

      <motion.div variants={anim} className="rounded-2xl border border-border bg-card p-5">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Estrutura da turma
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ['Acompanhamento', 'Avisos, orientações e acompanhamento ligado ao curso.'],
            ['Comunidade', 'Discussões entre alunos do Power of Three.'],
            ['Disciplina', 'Partilha de progresso, dúvidas e execução.'],
            ['Sem grupos paralelos', 'A Money Makers tem uma turma oficial para o curso.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-xl border border-border bg-secondary/40 p-4">
              <p className="font-semibold text-foreground text-sm">{title}</p>
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
