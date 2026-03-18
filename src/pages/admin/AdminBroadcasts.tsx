import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Plus, Send, Bell, Volume2, Video, FileText, Users } from 'lucide-react';

const broadcasts = [
  { id: '1', title: 'Sinal EUR/USD — Compra', type: 'alert', date: 'Hoje, 14:30', target: 'Todos', status: 'sent' },
  { id: '2', title: 'Análise semanal', type: 'video', date: 'Hoje, 09:00', target: 'Todos', status: 'sent' },
  { id: '3', title: 'Dica de gestão de risco', type: 'text', date: 'Ontem', target: 'Turma Iniciante', status: 'sent' },
  { id: '4', title: 'Áudio: Mentalidade', type: 'audio', date: '15 Mar', target: 'Todos', status: 'sent' },
];
const typeIcons: Record<string, React.ElementType> = { text: FileText, audio: Volume2, video: Video, alert: Bell };
const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AdminBroadcasts() {
  const [showNew, setShowNew] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('text');
  const [target, setTarget] = useState('all');
  const [priority, setPriority] = useState('normal');

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <motion.div variants={anim} className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Broadcasts & Sinais</h1><p className="text-sm text-muted-foreground mt-1">Envia mensagens e sinais aos alunos</p></div>
        <button onClick={() => setShowNew(!showNew)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all">
          <Plus size={16}/> Novo
        </button>
      </motion.div>

      {showNew && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="bg-card border border-primary/20 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Novo Broadcast</h3>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título"
            className="w-full h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Conteúdo..." rows={3}
            className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none" />
          <div className="flex flex-wrap gap-3">
            <select value={type} onChange={e => setType(e.target.value)} className="h-9 px-3 rounded-lg bg-secondary border border-border text-xs text-foreground">
              <option value="text">Texto</option><option value="alert">Sinal</option><option value="video">Vídeo</option><option value="audio">Áudio</option>
            </select>
            <select value={target} onChange={e => setTarget(e.target.value)} className="h-9 px-3 rounded-lg bg-secondary border border-border text-xs text-foreground">
              <option value="all">Todos</option><option value="iniciante">Turma Iniciante</option><option value="vip">VIP</option>
            </select>
            <select value={priority} onChange={e => setPriority(e.target.value)} className="h-9 px-3 rounded-lg bg-secondary border border-border text-xs text-foreground">
              <option value="normal">Normal</option><option value="high">Alta</option><option value="urgent">Urgente</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="bg-primary text-primary-foreground font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2"><Send size={14}/>Enviar</button>
            <button onClick={() => setShowNew(false)} className="text-sm text-muted-foreground hover:text-foreground px-4 py-2.5 rounded-xl hover:bg-secondary transition-all">Cancelar</button>
          </div>
        </motion.div>
      )}

      <motion.div variants={anim} className="space-y-2">
        {broadcasts.map(b => {
          const Icon = typeIcons[b.type] || FileText;
          return (
            <div key={b.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/10 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Icon size={14} className="text-primary"/></div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.date} · {b.target}</p>
                </div>
              </div>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">Enviado</span>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
