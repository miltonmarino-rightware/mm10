import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, Target, AlertTriangle, Filter, Plus, X, Brain, ShieldCheck, Activity } from 'lucide-react';

const trades = [
  { id: '1', pair: 'EUR/USD', type: 'buy' as const, result: 'win' as const, pips: 45, date: '2026-03-17', lotSize: 0.5, notes: 'Boa entrada no suporte diário', setup: 'Support Bounce', rr: '1:2.5' },
  { id: '2', pair: 'GBP/JPY', type: 'sell' as const, result: 'loss' as const, pips: -22, date: '2026-03-16', lotSize: 0.3, notes: 'Stop apertado demais, deveria ter dado mais espaço', setup: 'Trend Following', rr: '1:1.5' },
  { id: '3', pair: 'USD/CHF', type: 'buy' as const, result: 'win' as const, pips: 67, date: '2026-03-15', lotSize: 0.5, notes: 'Breakout forte com volume acima da média', setup: 'Breakout', rr: '1:3' },
  { id: '4', pair: 'AUD/USD', type: 'sell' as const, result: 'win' as const, pips: 31, date: '2026-03-14', lotSize: 0.2, notes: 'Entrada limpa na resistência', setup: 'Resistance Rejection', rr: '1:2' },
  { id: '5', pair: 'EUR/GBP', type: 'buy' as const, result: 'loss' as const, pips: -18, date: '2026-03-13', lotSize: 0.4, notes: 'Entrei cedo demais, antes da confirmação', setup: 'Fib Retracement', rr: '1:1.8' },
  { id: '6', pair: 'USD/JPY', type: 'sell' as const, result: 'win' as const, pips: 53, date: '2026-03-12', lotSize: 0.5, notes: 'Pin bar no H4 com confluência', setup: 'Pin Bar', rr: '1:2.2' },
  { id: '7', pair: 'GBP/USD', type: 'buy' as const, result: 'breakeven' as const, pips: 0, date: '2026-03-11', lotSize: 0.3, notes: 'Moveu SL para BE, fechou no zero', setup: 'EMA Cross', rr: '1:2' },
  { id: '8', pair: 'EUR/JPY', type: 'sell' as const, result: 'win' as const, pips: 38, date: '2026-03-10', lotSize: 0.5, notes: 'Seguiu tendência D1 perfeitamente', setup: 'Trend Continuation', rr: '1:1.9' },
];

const totalPips = trades.reduce((sum, t) => sum + t.pips, 0);
const wins = trades.filter(t => t.result === 'win').length;
const losses = trades.filter(t => t.result === 'loss').length;
const winRate = Math.round((wins / (wins + losses)) * 100);

const stats = [
  { label: 'Win Rate', value: `${winRate}%`, icon: Target, desc: 'execução validada' },
  { label: 'Profit Factor', value: '2.18', icon: ShieldCheck, desc: 'risco controlado' },
  { label: 'Total Pips', value: totalPips > 0 ? `+${totalPips}` : totalPips.toString(), icon: TrendingUp, desc: 'net performance' },
  { label: 'Drawdown', value: '4.2%', icon: AlertTriangle, desc: 'zona segura' },
];

const resultColors = {
  win: 'text-market-up bg-market-up/10 border-market-up/30',
  loss: 'text-market-down bg-market-down/10 border-market-down/30',
  breakeven: 'text-muted-foreground bg-white/[0.04] border-white/10',
};

const pipsColor = (p: number) => p > 0 ? 'text-market-up' : p < 0 ? 'text-market-down' : 'text-muted-foreground';
const anim = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

type Tab = 'overview' | 'journal' | 'analytics' | 'review';

export default function AppTrades() {
  const [filter, setFilter] = useState<'all' | 'win' | 'loss'>('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('overview');
  const filtered = filter === 'all' ? trades : trades.filter(t => t.result === filter);
  const detail = trades.find(t => t.id === selected);

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="min-h-full terminal-grid p-4 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section variants={anim} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-background shadow-premium">
          <div className="absolute inset-0 mm-brand-field opacity-80" />
          <div className="absolute inset-0 market-wave animate-market-drift opacity-60" />
          <div className="relative flex flex-col gap-6 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
            <div>
              <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.3em] text-primary">Trading Journal Pro</p>
              <h1 className="font-display text-4xl uppercase leading-none text-foreground text-glow-primary sm:text-6xl">Execution<br />Ledger</h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">Regista operações, identifica padrões, protege o capital e transforma cada trade em dados de evolução.</p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground glow-primary transition hover:scale-[1.01]">
              <Plus size={16} /> Novo Trade
            </button>
          </div>
        </motion.section>

        <motion.section variants={anim} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="terminal-panel rounded-3xl p-5">
              <div className="mb-5 flex items-center justify-between">
                <s.icon size={18} className="text-primary" />
                <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground">0{i + 1}</span>
              </div>
              <p className="text-3xl font-mono-num font-bold text-foreground">{s.value}</p>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{s.label}</p>
              <p className="mt-2 text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </motion.section>

        <motion.section variants={anim} className="terminal-panel rounded-3xl p-2">
          <div className="grid grid-cols-4 gap-1">
            {(['overview', 'journal', 'analytics', 'review'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-2xl px-3 py-3 text-[10px] font-mono uppercase tracking-[0.18em] transition ${tab === t ? 'bg-primary text-primary-foreground glow-primary-sm' : 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground'}`}>
                {t}
              </button>
            ))}
          </div>
        </motion.section>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <motion.section variants={anim} className="terminal-panel rounded-3xl p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Performance · Pips por trade</h3>
                <p className="mt-1 text-sm text-muted-foreground">Últimas execuções registadas</p>
              </div>
              <Activity size={18} className="text-primary" />
            </div>
            <div className="flex h-52 items-end gap-1.5 rounded-3xl border border-white/10 bg-black/20 p-5">
              {trades.map(t => (
                <div key={t.id} className="flex flex-1 flex-col items-center gap-2">
                  <div className={`w-full rounded-t-lg transition-all ${t.result === 'win' ? 'bg-market-up' : t.result === 'loss' ? 'bg-market-down' : 'bg-muted'}`} style={{ height: `${Math.abs(t.pips) * 1.9 + 12}px`, opacity: t.result === 'win' ? 0.95 : 0.7 }} />
                  <span className="text-[9px] font-mono text-muted-foreground">{t.pair.split('/')[0]}</span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.aside variants={anim} className="space-y-4">
            <div className="mm-glass rounded-3xl p-5">
              <div className="mb-4 flex items-center gap-2 text-primary"><Brain size={17} /><span className="text-[10px] font-mono uppercase tracking-[0.22em]">AI Review</span></div>
              <h3 className="text-lg font-bold text-foreground">O teu padrão dominante</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Os melhores resultados vêm de breakouts e rejeições limpas. Evita entradas antes da confirmação.</p>
            </div>
            <div className="terminal-panel rounded-3xl p-5">
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Best Setup</p>
              <p className="mt-3 text-2xl font-bold text-foreground">Breakout</p>
              <p className="mt-1 text-sm text-market-up">+67 pips · 1:3 RR</p>
            </div>
          </motion.aside>
        </div>

        <motion.section variants={anim}>
          <div className="mb-4 flex items-center gap-2">
            <Filter size={14} className="text-muted-foreground" />
            {(['all', 'win', 'loss'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`rounded-xl px-3 py-2 text-[11px] font-mono uppercase tracking-wider transition-all ${filter === f ? 'bg-primary text-primary-foreground' : 'border border-white/10 bg-white/[0.035] text-muted-foreground hover:text-foreground'}`}>
                {f === 'all' ? 'Todos' : f === 'win' ? 'Ganhos' : 'Perdas'}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filtered.map(t => (
              <div key={t.id} onClick={() => setSelected(t.id)} className="terminal-panel flex cursor-pointer items-center justify-between rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-primary/25 active:scale-[0.99]">
                <div className="flex min-w-0 items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${resultColors[t.result]}`}>{t.type === 'buy' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}</div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-num text-sm font-bold text-foreground">{t.pair}</span>
                      <span className={`rounded border px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${t.type === 'buy' ? 'border-market-up/30 bg-market-up/10 text-market-up' : 'border-market-down/30 bg-market-down/10 text-market-down'}`}>{t.type}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] font-mono text-muted-foreground">{t.date} · {t.setup} · {t.rr}</p>
                  </div>
                </div>
                <span className={`font-mono-num text-sm font-black ${pipsColor(t.pips)}`}>{t.pips > 0 ? '+' : ''}{t.pips} pips</span>
              </div>
            ))}
          </div>
        </motion.section>

        <button className="fixed bottom-6 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-premium sm:hidden active:scale-95">
          <Plus size={24} />
        </button>

        <AnimatePresence>
          {detail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/85 backdrop-blur-md" />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} onClick={e => e.stopPropagation()} className="terminal-panel relative z-10 w-full max-w-lg rounded-[2rem] p-6 shadow-premium">
                <button onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-xl p-2 text-muted-foreground transition hover:bg-white/[0.05] hover:text-foreground"><X size={18} /></button>
                <div className="mb-5 flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${resultColors[detail.result]}`}>{detail.type === 'buy' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}</div>
                  <div>
                    <h2 className="font-mono-num text-xl font-black text-foreground">{detail.pair}</h2>
                    <p className="text-[11px] font-mono text-muted-foreground">{detail.date}</p>
                  </div>
                  <span className={`ml-auto font-mono-num text-xl font-black ${pipsColor(detail.pips)}`}>{detail.pips > 0 ? '+' : ''}{detail.pips} pips</span>
                </div>
                <div className="mb-5 grid grid-cols-2 gap-3">
                  {[
                    ['Tipo', detail.type], ['Resultado', detail.result], ['Lot Size', detail.lotSize], ['R:R', detail.rr],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                      <p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="text-sm font-semibold capitalize text-foreground font-mono-num">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="mb-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">Setup</p>
                    <p className="text-sm text-foreground">{detail.setup}</p>
                  </div>
                  {detail.notes && <div><p className="mb-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">Notas</p><p className="text-sm leading-relaxed text-muted-foreground">{detail.notes}</p></div>}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
