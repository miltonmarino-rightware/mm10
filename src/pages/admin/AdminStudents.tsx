import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, BarChart3, GraduationCap, Search, MoreHorizontal } from 'lucide-react';

const students = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', joinDate: '2026-01-15', coursesCompleted: 3, tradesLogged: 45, lastActive: 'Hoje', group: 'Turma Iniciante' },
  { id: '2', name: 'Ana Costa', email: 'ana@email.com', joinDate: '2026-02-01', coursesCompleted: 1, tradesLogged: 22, lastActive: 'Ontem', group: 'Price Action Pro' },
  { id: '3', name: 'Miguel Santos', email: 'miguel@email.com', joinDate: '2025-12-10', coursesCompleted: 5, tradesLogged: 89, lastActive: 'Hoje', group: 'Mentoria VIP' },
  { id: '4', name: 'Sofia Pereira', email: 'sofia@email.com', joinDate: '2026-03-01', coursesCompleted: 0, tradesLogged: 5, lastActive: 'Há 3 dias', group: 'Turma Iniciante' },
  { id: '5', name: 'Pedro Oliveira', email: 'pedro@email.com', joinDate: '2026-01-20', coursesCompleted: 2, tradesLogged: 34, lastActive: 'Hoje', group: 'Trading Diário' },
];
const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AdminStudents() {
  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <motion.div variants={anim} className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Alunos</h1><p className="text-sm text-muted-foreground mt-1">Gere os teus alunos e progresso</p></div>
      </motion.div>
      <motion.div variants={anim} className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input className="w-full h-9 pl-8 pr-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Pesquisar alunos..." />
      </motion.div>
      <motion.div variants={anim} className="space-y-2">
        {students.map(s => (
          <div key={s.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/10 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold shrink-0">{s.name[0]}</div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.email} · {s.group}</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><GraduationCap size={12}/>{s.coursesCompleted} cursos</span>
                <span className="flex items-center gap-1"><BarChart3 size={12}/>{s.tradesLogged} trades</span>
                <span>{s.lastActive}</span>
              </div>
              <button className="p-1 text-muted-foreground hover:text-foreground"><MoreHorizontal size={16}/></button>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
