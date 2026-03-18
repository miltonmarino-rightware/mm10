import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, Flame, Clock, ArrowRight } from 'lucide-react';

const events = [
  { id: '1', title: 'Desafio 30 Dias de Trading', desc: 'Opera 30 dias seguidos e documenta cada trade', date: '2026-04-01', endDate: '2026-04-30', status: 'upcoming' as const, type: 'challenge' as const, participants: 45, prize: 'Mentoria VIP grátis' },
  { id: '2', title: 'Sessão ao Vivo: Análise Semanal', desc: 'Análise dos mercados em tempo real com o Tarik', date: '2026-03-21', status: 'upcoming' as const, type: 'session' as const, participants: 120 },
  { id: '3', title: 'Campanha: Traga um Amigo', desc: 'Convida amigos e ganha benefícios exclusivos', date: '2026-03-01', endDate: '2026-03-31', status: 'active' as const, type: 'campaign' as const, participants: 30 },
  { id: '4', title: 'Desafio Demo Account', desc: 'Quem consegue melhor performance em conta demo?', date: '2026-02-15', endDate: '2026-03-15', status: 'ended' as const, type: 'challenge' as const, participants: 67, prize: 'Acesso premium 3 meses' },
];

const statusStyles = {
  active: { bg: 'bg-primary/10 text-primary', label: 'Activo', icon: Flame },
  upcoming: { bg: 'bg-warning/10 text-warning', label: 'Em Breve', icon: Clock },
  ended: { bg: 'bg-muted text-muted-foreground', label: 'Terminado', icon: Calendar },
};

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AppEvents() {
  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">

      <motion.div variants={anim}>
        <h1 className="text-2xl font-bold text-foreground">Eventos & Desafios</h1>
        <p className="text-sm text-muted-foreground mt-1">Participa em desafios e eventos da comunidade</p>
      </motion.div>

      {/* Active event highlight */}
      {events.filter(e => e.status === 'active').map(e => (
        <motion.div key={e.id} variants={anim}
          className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={16} className="text-primary" />
            <span className="text-xs font-semibold text-primary uppercase">Activo Agora</span>
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">{e.title}</h2>
          <p className="text-sm text-muted-foreground mb-3">{e.desc}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Users size={12} /> {e.participants} participantes</span>
            <span className="flex items-center gap-1"><Calendar size={12} /> Até {e.endDate}</span>
          </div>
        </motion.div>
      ))}

      {/* Events list */}
      <motion.div variants={anim} className="space-y-3">
        {events.filter(e => e.status !== 'active').map(e => {
          const st = statusStyles[e.status];
          return (
            <div key={e.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/10 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-primary" />
                  <h3 className="font-semibold text-foreground text-sm">{e.title}</h3>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase ${st.bg}`}>
                  {st.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{e.desc}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar size={12} /> {e.date}</span>
                {e.participants && <span className="flex items-center gap-1"><Users size={12} /> {e.participants}</span>}
                {e.prize && <span className="text-primary font-medium">🏆 {e.prize}</span>}
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
