import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Plus, BookOpen, Clock, Users, MoreHorizontal, X, Pencil, Trash2 } from 'lucide-react';

const initialCourses = [
  { id: '1', title: 'Forex Fundamentos', modules: 8, duration: '4h 30m', students: 45, status: 'published' },
  { id: '2', title: 'Price Action Avançado', modules: 12, duration: '7h 15m', students: 28, status: 'published' },
  { id: '3', title: 'Gestão de Risco', modules: 6, duration: '3h', students: 38, status: 'published' },
  { id: '4', title: 'Psicologia de Trading', modules: 10, duration: '5h 45m', students: 19, status: 'draft' },
];

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AdminCourses() {
  const [courses, setCourses] = useState(initialCourses);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formModules, setFormModules] = useState('');
  const [formDuration, setFormDuration] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const openNew = () => { setEditId(null); setFormTitle(''); setFormModules(''); setFormDuration(''); setShowForm(true); };
  const openEdit = (c: typeof courses[0]) => { setEditId(c.id); setFormTitle(c.title); setFormModules(c.modules.toString()); setFormDuration(c.duration); setShowForm(true); setMenuOpen(null); };
  const handleSave = () => {
    if (!formTitle) return;
    if (editId) {
      setCourses(prev => prev.map(c => c.id === editId ? { ...c, title: formTitle, modules: parseInt(formModules) || 0, duration: formDuration } : c));
    } else {
      setCourses(prev => [...prev, { id: Date.now().toString(), title: formTitle, modules: parseInt(formModules) || 0, duration: formDuration, students: 0, status: 'draft' }]);
    }
    setShowForm(false);
  };
  const handleDelete = (id: string) => { setCourses(prev => prev.filter(c => c.id !== id)); setDeleteConfirm(null); };

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <motion.div variants={anim} className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-2">Admin · Academia</p>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Cursos <span className="font-serif-italic text-primary/90">premium</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">Gere os cursos premium da plataforma</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all active:scale-[0.98] shrink-0">
          <Plus size={16} /> Novo Curso
        </button>
      </motion.div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()} className="relative bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-premium z-10 space-y-4">
              <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">{editId ? 'Editar Curso' : 'Novo Curso'}</h3>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Título</label>
                <input value={formTitle} onChange={e => setFormTitle(e.target.value)} placeholder="Nome do curso"
                  className="w-full h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Módulos</label>
                  <input value={formModules} onChange={e => setFormModules(e.target.value)} placeholder="8" type="number"
                    className="w-full h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Duração</label>
                  <input value={formDuration} onChange={e => setFormDuration(e.target.value)} placeholder="4h 30m"
                    className="w-full h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
              </div>
              <button onClick={handleSave} disabled={!formTitle}
                className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-40 active:scale-[0.98]">
                {editId ? 'Guardar' : 'Criar Curso'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()} className="relative bg-card border border-destructive/20 rounded-2xl p-6 max-w-sm w-full shadow-premium z-10">
              <h3 className="text-lg font-bold text-foreground mb-2">Eliminar Curso</h3>
              <p className="text-sm text-muted-foreground mb-5">Tens a certeza? Esta acção não pode ser desfeita.</p>
              <div className="flex gap-2">
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-destructive text-destructive-foreground font-semibold text-sm py-2.5 rounded-xl hover:bg-destructive/90 transition-all">Eliminar</button>
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-secondary text-foreground font-semibold text-sm py-2.5 rounded-xl hover:bg-secondary/80 transition-all">Cancelar</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div variants={anim} className="space-y-3">
        {courses.map(c => (
          <div key={c.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/10 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><GraduationCap size={18} className="text-primary" /></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.title}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1"><BookOpen size={11} />{c.modules} módulos</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{c.duration}</span>
                    <span className="flex items-center gap-1"><Users size={11} />{c.students} alunos</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${c.status === 'published' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {c.status === 'published' ? 'Publicado' : 'Rascunho'}
                </span>
                <div className="relative">
                  <button onClick={() => setMenuOpen(menuOpen === c.id ? null : c.id)} className="p-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                  <AnimatePresence>
                    {menuOpen === c.id && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 top-8 z-20 bg-card border border-border rounded-xl shadow-premium overflow-hidden min-w-[140px]">
                        <button onClick={() => openEdit(c)} className="w-full px-4 py-2.5 text-left text-sm text-foreground hover:bg-secondary flex items-center gap-2 transition-colors">
                          <Pencil size={14} /> Editar
                        </button>
                        <button onClick={() => { setDeleteConfirm(c.id); setMenuOpen(null); }} className="w-full px-4 py-2.5 text-left text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2 transition-colors">
                          <Trash2 size={14} /> Eliminar
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
