import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Volume2, Video, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

const broadcasts = [
  { id: '1', title: 'Sinal EUR/USD — Compra no suporte', content: 'Entry: 1.0850 · TP: 1.0920 · SL: 1.0810', type: 'alert' as const, side: 'buy' as const, priority: 'urgent' as const, date: 'Hoje, 14:30', read: false },
  { id: '2', title: 'Análise semanal dos mercados', content: 'Esta semana o foco vai ser nos pares...', type: 'video' as const, side: null, priority: 'high' as const, date: 'Hoje, 09:00', read: false },
  { id: '3', title: 'Dica de gestão de risco', content: 'Nunca arrisques mais de 2% por operação...', type: 'text' as const, side: null, priority: 'normal' as const, date: 'Ontem', read: true },
  { id: '4', title: 'Áudio: Mentalidade vencedora', content: 'Novo áudio sobre disciplina no trading', type: 'audio' as const, side: null, priority: 'normal' as const, date: '15 Mar', read: true },
  { id: '5', title: 'Alerta GBP/JPY — Venda', content: 'Entry: 191.50 · TP: 190.80 · SL: 192.00', type: 'alert' as const, side: 'sell' as const, priority: 'high' as const, date: '14 Mar', read: true },
  { id: '6', title: 'Revisão mensal de Fevereiro', content: 'Resumo das operações do mês...', type: 'text' as const, side: null, priority: 'normal' as const, date: '12 Mar', read: true },
];

const typeIcons = { text: FileText, audio: Volume2, video: Video, alert: Bell };

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
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">Broadcasts · Live Desk</p>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-foreground">
            Sinais & <span className="font-serif-italic font-normal">avisos</span>
          </h1>
          {unread > 0 && (
            <span className="font-mono-num text-[11px] uppercase tracking-wider bg-market-warn/10 text-market-warn border border-market-warn/30 px-2 py-0.5 rounded">
              {unread} new
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">Mensagens, sinais e alertas do {brand.mentorName}</p>
      </motion.div>

      <motion.div variants={anim} className="flex gap-2 overflow-x-auto pb-1">
        {([['all', 'Todos'], ['alert', 'Sinais'], ['text', 'Texto'], ['video', 'Vídeo'], ['audio', 'Áudio']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all shrink-0 ${filter === key ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground border border-border'}`}>
            {label}
          </button>
        ))}
      </motion.div>

      <motion.div variants={anim} className="space-y-2">
        {filtered.map(b => {
          const Icon = typeIcons[b.type];
          const isSignal = b.type === 'alert';
          const sideClass = b.side === 'buy'
            ? 'bg-market-up/10 text-market-up border-market-up/30'
            : b.side === 'sell'
              ? 'bg-market-down/10 text-market-down border-market-down/30'
              : 'bg-market-warn/10 text-market-warn border-market-warn/30';
          const iconClass = isSignal
            ? sideClass
            : 'bg-secondary text-muted-foreground border-border';
          return (
            <div key={b.id}
              className={`bg-card border rounded-xl p-4 cursor-pointer transition-all hover:border-foreground/20 ${!b.read ? 'border-foreground/15' : 'border-border'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${iconClass}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {!b.read && <div className="w-1.5 h-1.5 rounded-full bg-market-warn shrink-0" />}
                    <p className={`text-sm font-semibold truncate ${!b.read ? 'text-foreground' : 'text-foreground/80'}`}>{b.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 font-mono-num">{b.content}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {isSignal && b.side && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider border ${sideClass} inline-flex items-center gap-1`}>
                        {b.side === 'buy' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {b.side}
                      </span>
                    )}
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider bg-secondary text-muted-foreground border border-border">
                      {isSignal ? 'Signal' : b.type}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground ml-auto">{b.date}</span>
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
