import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, TrendingUp, MoreHorizontal, Pencil, Trash2, X } from 'lucide-react';

const initialItems = [
  { id: '1', title: 'EUR/USD Breakout +120 pips', result: '+120 pips', date: '2026-03-15', category: 'Breakout', desc: 'Breakout forte da consolidação no H4.' },
  { id: '2', title: 'GBP/JPY Reversão +85 pips', result: '+85 pips', date: '2026-03-12', category: 'Reversão', desc: 'Pin bar no suporte semanal.' },
  { id: '3', title: 'USD/CHF Tendência +200 pips', result: '+200 pips', date: '2026-03-08', category: 'Tendência', desc: 'Tendência descendente no D1.' },
  { id: '4', title: 'AUD/USD Scalp +45 pips', result: '+45 pips', date: '2026-03-05', category: 'Scalp', desc: 'Scalp rápido no M15.' },
];

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AdminMuseum() {
  const [items, setItems] = useState(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formResult, setFormResult] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const openNew = () => { setEditId(null); setFormTitle(''); setFormResult(''); setFormCategory(''); setFormDesc(''); setShowForm(true); };
  const openEdit = (item: typeof items[0]) => { setEditId(item.id); setFormTitle(item.title); setFormResult(item.result); setFormCategory(item.category); setFormDesc(item.desc); setShowForm(true); setMenuOpen(null); };
  const handleSave = () => {
    if (!formTitle) return;
    if (editId) {
      setItems(prev => prev.map(i => i.id === editId ? { ...i, title: formTitle, result: formResult, category: formCategory, desc: formDesc } : i));
    } else {
      setItems(prev => [...prev, { id: Date.now().toString(), title: formTitle, result: formResult, date: new Date().toISOString().split('T')[0], category: formCategory, desc: formDesc }]);
    }
    setShowForm(false);
  };
  const handleDelete = (id: string) => { setItems(prev => prev.filter(i => i.id !== id)); setDeleteConfirm(null); };

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <motion.div variants={anim} className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-2">Admin · Arquivo</p>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Museu de <span className="font-serif-italic text-primary/90">trades</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">Gere a galeria de provas sociais</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all active:scale-[0.98] shrink-0"><Plus size={16} />Novo Item</button>
      </motion.div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()} className="relative bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-premium z-10 space-y-4">
              <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">{editId ? 'Editar Item' : 'Novo Item'}</h3>
              <input value={formTitle} onChange={e => setFormTitle(e.target.value)} placeholder="Título" className="w-full h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
              <div className="grid grid-cols-2 gap-3">
                <input value={formResult} onChange={e => setFormResult(e.target.value)} placeholder="+120 pips" className="h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                <input value={formCategory} onChange={e => setFormCategory(e.target.value)} placeholder="Breakout" className="h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
              </div>
              <textarea value={formDesc} onChange={e => setFormDesc(e.target.value)} placeholder="Descrição..." rows={2} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none" />
              <button onClick={handleSave} disabled={!formTitle} className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-40 active:scale-[0.98]">{editId ? 'Guardar' : 'Criar'}</button>
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
              <h3 className="text-lg font-bold text-foreground mb-2">Eliminar Item</h3>
              <p className="text-sm text-muted-foreground mb-5">Tens a certeza?</p>
              <div className="flex gap-2">
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-destructive text-destructive-foreground font-semibold text-sm py-2.5 rounded-xl hover:bg-destructive/90 transition-all">Eliminar</button>
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-secondary text-foreground font-semibold text-sm py-2.5 rounded-xl hover:bg-secondary/80 transition-all">Cancelar</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div variants={anim} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(item => (
          <div key={item.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-all">
            <div className="h-32 bg-gradient-to-br from-primary/8 to-accent/20 flex items-center justify-center relative">
              <TrendingUp size={28} className="text-primary/20" />
              <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">{item.result}</div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.date} · {item.category}</p>
              </div>
              <div className="relative">
                <button onClick={() => setMenuOpen(menuOpen === item.id ? null : item.id)} className="p-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"><MoreHorizontal size={16} /></button>
                <AnimatePresence>
                  {menuOpen === item.id && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 top-8 z-20 bg-card border border-border rounded-xl shadow-premium overflow-hidden min-w-[140px]">
                      <button onClick={() => openEdit(item)} className="w-full px-4 py-2.5 text-left text-sm text-foreground hover:bg-secondary flex items-center gap-2 transition-colors"><Pencil size={14} /> Editar</button>
                      <button onClick={() => { setDeleteConfirm(item.id); setMenuOpen(null); }} className="w-full px-4 py-2.5 text-left text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2 transition-colors"><Trash2 size={14} /> Eliminar</button>
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
