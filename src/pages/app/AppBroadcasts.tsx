import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Volume2, Video, FileText, TrendingUp, TrendingDown, Radio, Activity, ShieldCheck, Zap } from 'lucide-react';
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
const anim = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

const deskStats = [
  { label: 'Live Alerts', value: '02', icon: Bell },
  { label: 'Market Bias', value: 'Bull', icon: TrendingUp },
  { label: 'Risk Mode', value: 'Safe', icon: ShieldCheck },
  { label: 'Desk Status', value: 'Live', icon: Radio },
];

export default function AppBroadcasts() {
  const { brand } = useBusinessConfig();
  const [filter, setFilter] = useState<'all' | 'alert' | 'text' | 'video' | 'audio'>('all');
  const filtered = filter === 'all' ? broadcasts : broadcasts.filter(b => b.type === filter);
  const unread = broadcasts.filter(b => !b.read).length;

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="min-h-full terminal-grid p-4 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section variants={anim} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-background shadow-premium">
          <div className="absolute inset-0 mm-brand-field opacity-85" />
          <div className="absolute inset-0 market-wave animate-market-drift opacity-65" />
          <div className="relative grid gap-8 p-6 lg:grid-cols-[1fr_0.9fr] lg:p-10">
            <div>
              <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-primary">Money Makers · Market Desk</p>
              <h1 className="font-display text-5xl uppercase leading-[0.88] text-foreground text-glow-primary sm:text-7xl">Live<br />Room</h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">Sinais, broadcasts e avisos operacionais do {brand.mentorName}. Menos ruído, mais leitura de mercado.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-xl bg-market-up/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-market-up"><span className="h-2 w-2 rounded-full bg-market-up animate-pulse-soft" /> Live Now</span>
                {unread > 0 && <span className="inline-flex items-center gap-2 rounded-xl bg-market-warn/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-market-warn">{unread} novos alertas</span>}
              </div>
            </div>

            <div className="terminal-panel rounded-3xl p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Desk Overview</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">London Session · Active</p>
                </div>
                <Activity size={18} className="text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {deskStats.map(s => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <s.icon size={16} className="mb-3 text-primary" />
                    <p className="font-mono-num text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={anim} className="terminal-panel rounded-3xl p-2">
          <div className="flex gap-1 overflow-x-auto pb-0 scrollbar-thin">
            {([['all', 'Todos'], ['alert', 'Sinais'], ['text', 'Texto'], ['video', 'Vídeo'], ['audio', 'Áudio']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setFilter(key)} className={`shrink-0 rounded-2xl px-4 py-3 text-[11px] font-mono uppercase tracking-[0.18em] transition-all ${filter === key ? 'bg-primary text-primary-foreground glow-primary-sm' : 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground'}`}>
                {label}
              </button>
            ))}
          </div>
        </motion.section>

        <motion.section variants={anim} className="grid gap-4 lg:grid-cols-[1fr_330px]">
          <div className="space-y-3">
            {filtered.map(b => {
              const Icon = typeIcons[b.type];
              const isSignal = b.type === 'alert';
              const sideClass = b.side === 'buy'
                ? 'bg-market-up/10 text-market-up border-market-up/30'
                : b.side === 'sell'
                  ? 'bg-market-down/10 text-market-down border-market-down/30'
                  : 'bg-market-warn/10 text-market-warn border-market-warn/30';
              const iconClass = isSignal ? sideClass : 'bg-white/[0.04] text-muted-foreground border-white/10';
              return (
                <div key={b.id} className={`terminal-panel cursor-pointer rounded-3xl p-5 transition-all hover:-translate-y-0.5 hover:border-primary/25 ${!b.read ? 'border-primary/25' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${iconClass}`}><Icon size={18} /></div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        {!b.read && <div className="h-2 w-2 shrink-0 rounded-full bg-market-warn animate-pulse-soft" />}
                        <p className={`truncate text-sm font-bold ${!b.read ? 'text-foreground' : 'text-foreground/80'}`}>{b.title}</p>
                      </div>
                      <p className="font-mono-num text-xs text-muted-foreground line-clamp-1">{b.content}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {isSignal && b.side && (
                          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-mono uppercase tracking-wider ${sideClass}`}>
                            {b.side === 'buy' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{b.side}
                          </span>
                        )}
                        <span className="rounded-full border border-white/10 bg-white/[0.035] px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{isSignal ? 'Signal' : b.type}</span>
                        <span className="ml-auto text-[10px] font-mono text-muted-foreground">{b.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="space-y-4">
            <div className="mm-glass rounded-3xl p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Zap size={22} /></div>
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary">Priority Signal</p>
              <h3 className="mt-2 text-xl font-bold text-foreground">EUR/USD Buy Zone</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Entrada em suporte. Confirmação necessária antes de executar.</p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {['Entry', 'TP', 'SL'].map((label, i) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3"><p className="text-[9px] font-mono text-muted-foreground">{label}</p><p className="mt-1 text-xs font-mono-num text-foreground">{i === 0 ? '1.0850' : i === 1 ? '1.0920' : '1.0810'}</p></div>)}
              </div>
            </div>
            <div className="terminal-panel rounded-3xl p-5">
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Desk Rules</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>• Não executar sem confirmação.</li>
                <li>• Risco máximo controlado.</li>
                <li>• Rever contexto no Mentor AI.</li>
              </ul>
            </div>
          </aside>
        </motion.section>
      </div>
    </motion.div>
  );
}
