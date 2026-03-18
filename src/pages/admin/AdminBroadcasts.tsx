import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Plus, Send, Bell, Volume2, Video, FileText, MoreHorizontal, Pencil, Trash2, X } from 'lucide-react';

const initialBroadcasts = [
  { id: '1', title: 'Sinal EUR/USD — Compra', content: 'Entry: 1.0850, TP: 1.0920, SL: 1.0810', type: 'alert', date: 'Hoje, 14:30', target: 'Todos', status: 'sent' },
  { id: '2', title: 'Análise semanal', content: 'Foco nos pares do G7 esta semana...', type: 'video', date: 'Hoje, 09:00', target: 'Todos', status: 'sent' },
  { id: '3', title: 'Dica de gestão de risco', content: 'Nunca arrisques mais de 2%...', type: 'text', date: 'Ontem', target: 'Turma Iniciante', status: 'sent' },
  { id: '4', title: 'Áudio: Mentalidade', content: 'Disciplina é a chave...', type: 'audio', date: '15 Mar', target: 'Todos', status: 'sent' },
];

const typeIcons: Record<string, React.ElementType> = { text: FileText, audio: Volume2, video: Video, alert: Bell };
const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AdminBroadcasts() {
  const [broadcasts, setBroadcasts] = useState(initialBroadcasts);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('text');
  const [target, setTarget] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const openNew = () => { setEditId(null); setTitle(''); setContent(''); setType('text'); setTarget('all'); setShowForm(true); };
  const openEdit = (b: typeof broadcasts[0]) => { setEditId(b.id); setTitle(b.title); setContent(b.content); setType(b.type); setShowForm(true); setMenuOpen(null); };
  const handleSave = () => {
    if (!title) return;
    if (editId) {
      setBroadcasts(prev => prev.map(b => b.id === editId ? { ...b, title, content, type } : b));
    } else {
      setBroadcasts(prev => [{ id: Date.now().toString(), title, content, type, date: 'Agora', target: target === 'all' ? 'Todos' : target, status: 'sent' }, ...prev]);
    }
    setShowForm(false);
  };
  const handleDelete = (id: string) => { setBroadcasts(prev => prev.filter(b => b.id !== id)); setDeleteConfirm(null); };

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <motion.div variants={anim} className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold text-foreground text-glow-primary">Broadcasts & Sinais</h1>
          <p className="text-sm text-muted-foreground mt-1">Envia mensagens e sinais aos alunos</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all active:scale-[0.98]">
          <Plus size={16} /> Novo
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
              <h3 className="text-lg font-bold text-foreground">{editId ? 'Editar Broadcast' : 'Novo Broadcast'}</h3>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título"
                className="w-full h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
              <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Conteúdo..." rows={3}
                className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none" />
              <div className="flex gap-3">
                <select value={type} onChange={e => setType(e.target.value)} className="h-9 px-3 rounded-lg bg-secondary border border-border text-xs text-foreground">
                  <option value="text">Texto</option><option value="alert">Sinal</option><option value="video">Vídeo</option><option value="audio">Áudio</option>
                </select>
                <select value={target} onChange={e => setTarget(e.target.value)} className="h-9 px-3 rounded-lg bg-secondary border border-border text-xs text-foreground">
                  <option value="all">Todos</option><option value="iniciante">Turma Iniciante</option><option value="vip">VIP</option>
                </select>
              </div>
              <button onClick={handleSave} disabled={!title}
                className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-40 flex items-center justify-center gap-2 active:scale-[0.98]">
                <Send size={14} /> {editId ? 'Guardar' : 'Enviar'}
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
              <h3 className="text-lg font-bold text-foreground mb-2">Eliminar Broadcast</h3>
              <p className="text-sm text-muted-foreground mb-5">Tens a certeza? Esta acção não pode ser desfeita.</p>
              <div className="flex gap-2">
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-destructive text-destructive-foreground font-semibold text-sm py-2.5 rounded-xl hover:bg-destructive/90 transition-all">Eliminar</button>
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-secondary text-foreground font-semibold text-sm py-2.5 rounded-xl hover:bg-secondary/80 transition-all">Cancelar</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div variants={anim} className="space-y-2">
        {broadcasts.map(b => {
          const Icon = typeIcons[b.type] || FileText;
          return (
            <div key={b.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/10 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Icon size={14} className="text-primary" /></div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.date} · {b.target}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">Enviado</span>
                <div className="relative">
                  <button onClick={() => setMenuOpen(menuOpen === b.id ? null : b.id)} className="p-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                  <AnimatePresence>
                    {menuOpen === b.id && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 top-8 z-20 bg-card border border-border rounded-xl shadow-premium overflow-hidden min-w-[140px]">
                        <button onClick={() => openEdit(b)} className="w-full px-4 py-2.5 text-left text-sm text-foreground hover:bg-secondary flex items-center gap-2 transition-colors"><Pencil size={14} /> Editar</button>
                        <button onClick={() => { setDeleteConfirm(b.id); setMenuOpen(null); }} className="w-full px-4 py-2.5 text-left text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2 transition-colors"><Trash2 size={14} /> Eliminar</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
