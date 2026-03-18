import React from 'react';import { motion } from 'framer-motion';import { Users,Plus,Hash,MoreHorizontal } from 'lucide-react';
const groups = [
  { id:'1',name:'Turma Forex Iniciante',members:24,createdAt:'2026-01-15' },
  { id:'2',name:'Price Action Pro',members:12,createdAt:'2026-02-01' },
  { id:'3',name:'Trading Diário',members:38,createdAt:'2025-12-10' },
  { id:'4',name:'Mentoria VIP',members:8,createdAt:'2026-03-01' },
];
const anim = { hidden:{opacity:0,y:16},show:{opacity:1,y:0} };
export default function AdminGroups(){
  return(
    <motion.div initial="hidden" animate="show" transition={{staggerChildren:0.06}} className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <motion.div variants={anim} className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Grupos & Turmas</h1><p className="text-sm text-muted-foreground mt-1">Cria e gere turmas de alunos</p></div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all"><Plus size={16}/>Nova Turma</button>
      </motion.div>
      <motion.div variants={anim} className="grid sm:grid-cols-2 gap-3">
        {groups.map(g=>(
          <div key={g.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Hash size={18} className="text-primary"/></div>
                <div><p className="font-semibold text-foreground text-sm">{g.name}</p><p className="text-xs text-muted-foreground"><Users size={11} className="inline mr-1"/>{g.members} membros</p></div>
              </div>
              <button className="p-1 text-muted-foreground hover:text-foreground"><MoreHorizontal size={16}/></button>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
