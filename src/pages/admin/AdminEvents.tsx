import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Plus, Calendar, Users, Flame, Clock, X } from 'lucide-react';

const events = [
  { id: '1', title: 'Desafio 30 Dias', desc: 'Opera 30 dias seguidos e documenta cada trade. Prémio para os melhores.', date: '2026-04-01', endDate: '2026-04-30', status: 'upcoming' as const, type: 'challenge', participants: 45, prize: 'Mentoria VIP grátis' },
  { id: '2', title: 'Sessão ao Vivo', desc: 'Análise dos mercados em tempo real com o Tarik. Sessão semanal.', date: '2026-03-21', status: 'upcoming' as const, type: 'session', participants: 120 },
  { id: '3', title: 'Campanha Amigos', desc: 'Convida amigos para a plataforma e ganha benefícios exclusivos.', date: '2026-03-01', endDate: '2026-03-31', status: 'active' as const, type: 'campaign', participants: 30 },
  { id: '4', title: 'Desafio Demo', desc: 'Quem consegue melhor performance em conta demo?', date: '2026-02-15', endDate: '2026-03-15', status: 'ended' as const, type: 'challenge', participants: 67, prize: 'Acesso premium 3 meses' },
];

const statusStyles: Record<string, { bg: string; label: string }> = {
  active: { bg: 'bg-primary/10 text-primary', label: 'Activo' },
  upcoming: { bg: 'bg-warning/10 text-warning', label: 'Em Breve' },
  ended: { bg: 'bg-muted text-muted-foreground', label: 'Terminado' },
};

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AdminEvents() {
  const [selected, setSelected] = useState<string | null>(null);
  const detail = events.find(e => e.id === selected);

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <motion.div variants={anim} className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold text-foreground text-glow-primary">Eventos & Desafios</h1>
          <p className="text-sm text-muted-foreground mt-1">Cria e gere eventos da comunidade</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all active:scale-[0.98]"><Plus size={16} />Novo Evento</button>
      </motion.div>

      <motion.div variants={anim} className="space-y-3">
        {events.map(e => {
          const st = statusStyles[e.status];
          return (
            <div key={e.id} onClick={() => setSelected(e.id)}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/10 transition-colors cursor-pointer active:scale-[0.99]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2"><Trophy size={16} className="text-primary" /><h3 className="font-semibold text-foreground text-sm">{e.title}</h3></div>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase ${st.bg}`}>{st.label}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{e.desc}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar size={12} />{e.date}</span>
                <span className="flex items-center gap-1"><Users size={12} />{e.participants}</span>
                {e.prize && <span className="text-primary font-medium">🏆 {e.prize}</span>}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {detail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()} className="relative bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-premium z-10">
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"><X size={18} /></button>
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={20} className="text-primary" />
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase ${statusStyles[detail.status].bg}`}>{statusStyles[detail.status].label}</span>
              </div>
              <h2 className="text-lg font-bold text-foreground mb-2">{detail.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{detail.desc}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Calendar size={14} /><span>Início: {detail.date}</span></div>
                {detail.endDate && <div className="flex items-center gap-2"><Calendar size={14} /><span>Fim: {detail.endDate}</span></div>}
                <div className="flex items-center gap-2"><Users size={14} /><span>{detail.participants} participantes</span></div>
                {detail.prize && <div className="flex items-center gap-2 text-primary font-medium">🏆 {detail.prize}</div>}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
