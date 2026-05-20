import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageSquare, Hash, Lock, Crown, X, Check } from 'lucide-react';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AppGroups() {
  const { brand } = useBusinessConfig();
  const [paywall, setPaywall] = useState(false);

  const groups = [
    { id: 'p3', name: 'The Power of 3', description: 'Círculo institucional do mentor — análise ICT/SMC diária', members: 47, lastMessage: `${brand.mentorName}: Killzone de Londres aberta`, createdAt: '2026-01-01', locked: true, tier: 'inner' as const },
    { id: '1', name: 'Turma Forex Iniciante', description: 'Grupo para novos traders', members: 24, lastMessage: `${brand.mentorName}: Boa sessão hoje!`, createdAt: '2026-01-15', locked: false, tier: 'open' as const },
    { id: '2', name: 'Price Action Pro', description: 'Análise avançada de price action', members: 12, lastMessage: 'João: Alguém viu o EUR/USD?', createdAt: '2026-02-01', locked: false, tier: 'open' as const },
    { id: '3', name: 'Trading Diário', description: 'Partilha de setups diários', members: 38, lastMessage: `${brand.mentorName}: Análise semanal enviada`, createdAt: '2025-12-10', locked: false, tier: 'open' as const },
    { id: '4', name: 'Mentoria VIP', description: 'Grupo exclusivo de mentoria', members: 8, lastMessage: 'Ana: Obrigada pelo feedback!', createdAt: '2026-03-01', locked: false, tier: 'open' as const },
  ];

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">

      <motion.div variants={anim}>
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">Comunidade · Círculos</p>
        <h1 className="text-3xl font-bold text-foreground">
          Grupos & <span className="font-serif-italic font-normal">turmas</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Participa em turmas e troca ideias com outros traders</p>
      </motion.div>

      {/* Inner circle — The Power of 3 */}
      <motion.div variants={anim}
        onClick={() => setPaywall(true)}
        className="relative overflow-hidden rounded-2xl border border-market-warn/30 bg-gradient-to-br from-market-warn/10 via-card to-card p-6 cursor-pointer hover:border-market-warn/50 transition-all group">
        <div className="absolute top-0 right-0 w-40 h-40 bg-market-warn/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-market-warn/15 border border-market-warn/30 flex items-center justify-center shrink-0">
              <Crown size={20} className="text-market-warn" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-market-warn mb-1">Inner Circle · Premium</p>
              <h2 className="text-xl font-bold text-foreground">
                The Power of <span className="font-serif-italic font-normal text-market-warn">3</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                Círculo institucional do mentor. Análise ICT/SMC diária, killzones, alertas em tempo real.
              </p>
              <div className="flex items-center gap-4 text-[11px] font-mono text-muted-foreground mt-3">
                <span className="flex items-center gap-1.5"><Users size={12} /> 47 membros</span>
                <span className="flex items-center gap-1.5"><Lock size={12} /> acesso restrito</span>
              </div>
            </div>
          </div>
          <button className="hidden sm:inline-flex items-center gap-1.5 bg-foreground text-background text-[11px] font-mono uppercase tracking-wider px-3 py-2 rounded-lg group-hover:opacity-90 transition-all">
            <Lock size={12} /> Desbloquear
          </button>
        </div>
      </motion.div>

      <motion.div variants={anim}>
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">Turmas abertas</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {groups.filter(g => !g.locked).map(g => (
            <div key={g.id}
              className="bg-card border border-border rounded-2xl p-5 hover:border-foreground/20 transition-all cursor-pointer group">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center shrink-0">
                  <Hash size={18} className="text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground text-sm group-hover:text-market-warn transition-colors">{g.name}</p>
                  <p className="text-xs text-muted-foreground">{g.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1"><Users size={12} /> {g.members}</span>
                <span className="flex items-center gap-1 truncate"><MessageSquare size={12} /> {g.lastMessage?.substring(0, 28)}…</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Paywall modal */}
      <AnimatePresence>
        {paywall && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setPaywall(false)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative bg-card border border-market-warn/30 rounded-2xl p-7 max-w-md w-full shadow-premium z-10">
              <button onClick={() => setPaywall(false)} className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                <X size={18} />
              </button>
              <div className="w-12 h-12 rounded-xl bg-market-warn/15 border border-market-warn/30 flex items-center justify-center mb-4">
                <Crown size={20} className="text-market-warn" />
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-market-warn mb-1">Acesso restrito</p>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Junta-te ao <span className="font-serif-italic font-normal">Power of 3</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Acesso ao círculo institucional do mentor. Limite de membros activo.
              </p>
              <ul className="space-y-2.5 mb-6">
                {['Análise ICT/SMC diária ao vivo', 'Killzones de Londres e Nova Iorque', 'Sinais executados em tempo real', 'Voice chat semanal com o mentor'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check size={16} className="text-market-up mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-foreground font-mono-num">€297</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">/ mês</span>
              </div>
              <button className="w-full bg-foreground text-background font-semibold text-sm py-3 rounded-xl hover:opacity-90 transition-all active:scale-[0.98]">
                Aplicar para entrar
              </button>
              <p className="text-[10px] font-mono text-muted-foreground text-center mt-3">Aprovação manual · sujeita a entrevista</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
