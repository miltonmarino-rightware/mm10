import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, GraduationCap, BarChart3, Search, MoreHorizontal, UserX, Ban, X } from 'lucide-react';

const initialStudents = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', joinDate: '2026-01-15', coursesCompleted: 3, tradesLogged: 45, lastActive: 'Hoje', group: 'Turma Iniciante' },
  { id: '2', name: 'Ana Costa', email: 'ana@email.com', joinDate: '2026-02-01', coursesCompleted: 1, tradesLogged: 22, lastActive: 'Ontem', group: 'Price Action Pro' },
  { id: '3', name: 'Miguel Santos', email: 'miguel@email.com', joinDate: '2025-12-10', coursesCompleted: 5, tradesLogged: 89, lastActive: 'Hoje', group: 'Mentoria VIP' },
  { id: '4', name: 'Sofia Pereira', email: 'sofia@email.com', joinDate: '2026-03-01', coursesCompleted: 0, tradesLogged: 5, lastActive: 'Há 3 dias', group: 'Turma Iniciante' },
  { id: '5', name: 'Pedro Oliveira', email: 'pedro@email.com', joinDate: '2026-01-20', coursesCompleted: 2, tradesLogged: 34, lastActive: 'Hoje', group: 'Trading Diário' },
];

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AdminStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: string; type: 'remove' | 'ban' } | null>(null);

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()));

  const handleAction = () => {
    if (!confirmAction) return;
    setStudents(prev => prev.filter(s => s.id !== confirmAction.id));
    setConfirmAction(null);
  };

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <motion.div variants={anim} className="text-center">
        <h1 className="text-2xl font-bold text-foreground text-glow-primary">Alunos</h1>
        <p className="text-sm text-muted-foreground mt-1">Gere os teus alunos e progresso</p>
      </motion.div>

      <motion.div variants={anim} className="relative max-w-sm mx-auto sm:mx-0">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-9 pl-8 pr-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Pesquisar alunos..." />
      </motion.div>

      {/* Confirm modal */}
      <AnimatePresence>
        {confirmAction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setConfirmAction(null)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()} className="relative bg-card border border-destructive/20 rounded-2xl p-6 max-w-sm w-full shadow-premium z-10">
              <h3 className="text-lg font-bold text-foreground mb-2">
                {confirmAction.type === 'ban' ? 'Banir Aluno' : 'Remover Aluno'}
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                {confirmAction.type === 'ban'
                  ? 'O aluno será banido e perderá todo o acesso à plataforma.'
                  : 'O aluno será removido da plataforma.'}
              </p>
              <div className="flex gap-2">
                <button onClick={handleAction} className="flex-1 bg-destructive text-destructive-foreground font-semibold text-sm py-2.5 rounded-xl hover:bg-destructive/90 transition-all">
                  {confirmAction.type === 'ban' ? 'Banir' : 'Remover'}
                </button>
                <button onClick={() => setConfirmAction(null)} className="flex-1 bg-secondary text-foreground font-semibold text-sm py-2.5 rounded-xl hover:bg-secondary/80 transition-all">Cancelar</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div variants={anim} className="space-y-2">
        {filtered.map(s => (
          <div key={s.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/10 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold shrink-0">{s.name[0]}</div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{s.email} · {s.group}</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><GraduationCap size={12} />{s.coursesCompleted} cursos</span>
                <span className="flex items-center gap-1"><BarChart3 size={12} />{s.tradesLogged} trades</span>
                <span>{s.lastActive}</span>
              </div>
              <div className="relative">
                <button onClick={() => setMenuOpen(menuOpen === s.id ? null : s.id)} className="p-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">
                  <MoreHorizontal size={16} />
                </button>
                <AnimatePresence>
                  {menuOpen === s.id && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 top-8 z-20 bg-card border border-border rounded-xl shadow-premium overflow-hidden min-w-[150px]">
                      <button onClick={() => { setConfirmAction({ id: s.id, type: 'remove' }); setMenuOpen(null); }}
                        className="w-full px-4 py-2.5 text-left text-sm text-foreground hover:bg-secondary flex items-center gap-2 transition-colors">
                        <UserX size={14} /> Remover
                      </button>
                      <button onClick={() => { setConfirmAction({ id: s.id, type: 'ban' }); setMenuOpen(null); }}
                        className="w-full px-4 py-2.5 text-left text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2 transition-colors">
                        <Ban size={14} /> Banir
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
