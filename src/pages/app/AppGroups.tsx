import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Plus, Hash } from 'lucide-react';

const groups = [
  { id: '1', name: 'Turma Forex Iniciante', description: 'Grupo para novos traders', members: 24, lastMessage: 'Tarik: Boa sessão hoje!', createdAt: '2026-01-15' },
  { id: '2', name: 'Price Action Pro', description: 'Análise avançada de price action', members: 12, lastMessage: 'João: Alguém viu o EUR/USD?', createdAt: '2026-02-01' },
  { id: '3', name: 'Trading Diário', description: 'Partilha de setups diários', members: 38, lastMessage: 'Tarik: Análise semanal enviada', createdAt: '2025-12-10' },
  { id: '4', name: 'Mentoria VIP', description: 'Grupo exclusivo de mentoria', members: 8, lastMessage: 'Ana: Obrigada pelo feedback!', createdAt: '2026-03-01' },
];

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AppGroups() {
  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">

      <motion.div variants={anim}>
        <h1 className="text-2xl font-bold text-foreground">Grupos & Turmas</h1>
        <p className="text-sm text-muted-foreground mt-1">Participa em turmas e troca ideias com outros traders</p>
      </motion.div>

      <motion.div variants={anim} className="grid sm:grid-cols-2 gap-3">
        {groups.map(g => (
          <div key={g.id}
            className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all cursor-pointer group">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Hash size={18} className="text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{g.name}</p>
                <p className="text-xs text-muted-foreground">{g.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Users size={12} /> {g.members} membros</span>
              <span className="flex items-center gap-1"><MessageSquare size={12} /> {g.lastMessage?.substring(0, 30)}...</span>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
