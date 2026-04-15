import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Bell, Volume2, Video, FileText } from 'lucide-react';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

const broadcasts = [
  { id: '1', title: 'Sinal EUR/USD — Compra no suporte', content: 'Entry: 1.0850, TP: 1.0920, SL: 1.0810', type: 'alert' as const, priority: 'urgent' as const, date: 'Hoje, 14:30', read: false },
  { id: '2', title: 'Análise semanal dos mercados', content: 'Esta semana o foco vai ser nos pares...', type: 'video' as const, priority: 'high' as const, date: 'Hoje, 09:00', read: false },
  { id: '3', title: 'Dica de gestão de risco', content: 'Nunca arrisques mais de 2% por operação...', type: 'text' as const, priority: 'normal' as const, date: 'Ontem', read: true },
  { id: '4', title: 'Áudio: Mentalidade vencedora', content: 'Novo áudio sobre disciplina no trading', type: 'audio' as const, priority: 'normal' as const, date: '15 Mar', read: true },
  { id: '5', title: 'Alerta GBP/JPY — Venda', content: 'Entry: 191.50, TP: 190.80, SL: 192.00', type: 'alert' as const, priority: 'high' as const, date: '14 Mar', read: true },
  { id: '6', title: 'Revisão mensal de Fevereiro', content: 'Resumo das operações do mês...', type: 'text' as const, priority: 'normal' as const, date: '12 Mar', read: true },
];

const typeIcons = { text: FileText, audio: Volume2, video: Video, alert: Bell };
const priorityStyles = {
  urgent: 'bg-destructive/15 text-destructive border-destructive/20',
  high: 'bg-primary/10 text-primary border-primary/20',
  normal: 'bg-muted text-muted-foreground border-border',
};

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AppBroadcasts() {
  const { brand } = useBusinessConfig();
  const [filter, setFilter] = useState<'all' | 'alert' | 'text' | 'video' | 'audio'>('all');
  const filtered = filter === 'all' ? broadcasts : broadcasts.filter(b => b.type === filter);
  const unread = broadcasts.filter(b => !b.read).length;

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">

      <motion.div variants={anim}>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Broadcasts & Sinais</h1>
          {unread > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{unread}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">Mensagens, sinais e alertas do {brand.mentorName}</p>
      </motion.div>

      <motion.div variants={anim} className="flex gap-2 overflow-x-auto pb-1">
        {([['all', 'Todos'], ['alert', 'Sinais'], ['text', 'Texto'], ['video', 'Vídeo'], ['audio', 'Áudio']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${filter === key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
            {label}
          </button>
        ))}
      </motion.div>

      <motion.div variants={anim} className="space-y-2">
        {filtered.map(b => {
          const Icon = typeIcons[b.type];
          return (
            <div key={b.id}
              className={`bg-card border rounded-xl p-4 cursor-pointer transition-all hover:border-primary/20 ${!b.read ? 'border-primary/15' : 'border-border'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${priorityStyles[b.priority]}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {!b.read && <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                    <p className={`text-sm font-semibold truncate ${!b.read ? 'text-foreground' : 'text-foreground/80'}`}>{b.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{b.content}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium uppercase ${priorityStyles[b.priority]}`}>
                      {b.type === 'alert' ? 'Sinal' : b.type}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{b.date}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
