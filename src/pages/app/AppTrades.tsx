import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, Target, AlertTriangle, Filter, Plus, X } from 'lucide-react';

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
  { label: 'Total Trades', value: trades.length.toString(), icon: BarChart3 },
  { label: 'Win Rate', value: `${winRate}%`, icon: Target },
  { label: 'Total Pips', value: totalPips > 0 ? `+${totalPips}` : totalPips.toString(), icon: TrendingUp },
  { label: 'Perdas', value: losses.toString(), icon: AlertTriangle },
];

const resultColors = {
  win: 'text-primary bg-primary/10',
  loss: 'text-destructive bg-destructive/10',
  breakeven: 'text-muted-foreground bg-muted',
};

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AppTrades() {
  const [filter, setFilter] = useState<'all' | 'win' | 'loss'>('all');
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = filter === 'all' ? trades : trades.filter(t => t.result === filter);
  const detail = trades.find(t => t.id === selected);

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">

      <motion.div variants={anim} className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold text-foreground text-glow-primary">Trading Journal</h1>
          <p className="text-sm text-muted-foreground mt-1">Analisa as tuas operações e melhora a performance</p>
        </div>
        <button className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all">
          <Plus size={16} /> Novo Trade
        </button>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} variants={anim} transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-2xl p-4">
            <s.icon size={18} className="text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Performance</h3>
        <div className="h-40 flex items-end gap-1 sm:gap-1.5">
          {trades.map(t => (
            <div key={t.id} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-md transition-all ${t.result === 'win' ? 'bg-primary' : t.result === 'loss' ? 'bg-destructive' : 'bg-muted'}`}
                style={{ height: `${Math.abs(t.pips) * 1.5 + 10}px` }}
              />
              <span className="text-[8px] sm:text-[9px] text-muted-foreground">{t.pair.split('/')[0]}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={anim}>
        <div className="flex items-center gap-2 mb-4">
          <Filter size={14} className="text-muted-foreground" />
          {(['all', 'win', 'loss'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
              {f === 'all' ? 'Todos' : f === 'win' ? 'Ganhos' : 'Perdas'}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map(t => (
            <div key={t.id} onClick={() => setSelected(t.id)}
              className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/10 transition-colors cursor-pointer active:scale-[0.99]">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${resultColors[t.result]}`}>
                  {t.type === 'buy' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{t.pair}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium uppercase ${resultColors[t.result]}`}>
                      {t.result === 'win' ? 'Ganho' : t.result === 'loss' ? 'Perda' : 'BE'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.date} · {t.lotSize} lots</p>
                </div>
              </div>
              <span className={`text-sm font-bold ${t.pips > 0 ? 'text-primary' : t.pips < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {t.pips > 0 ? '+' : ''}{t.pips} pips
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <button className="sm:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-premium glow-primary flex items-center justify-center z-20 active:scale-95">
        <Plus size={24} />
      </button>

      {/* Trade detail modal */}
      <AnimatePresence>
        {detail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-premium z-10">
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                <X size={18} />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${resultColors[detail.result]}`}>
                  {detail.type === 'buy' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">{detail.pair}</h2>
                  <p className="text-xs text-muted-foreground">{detail.date}</p>
                </div>
                <span className={`ml-auto text-lg font-bold ${detail.pips > 0 ? 'text-primary' : detail.pips < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {detail.pips > 0 ? '+' : ''}{detail.pips} pips
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-secondary rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Tipo</p>
                  <p className="text-sm font-medium text-foreground capitalize">{detail.type}</p>
                </div>
                <div className="bg-secondary rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Resultado</p>
                  <p className={`text-sm font-medium capitalize ${resultColors[detail.result].split(' ')[0]}`}>{detail.result}</p>
                </div>
                <div className="bg-secondary rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Lot Size</p>
                  <p className="text-sm font-medium text-foreground">{detail.lotSize}</p>
                </div>
                <div className="bg-secondary rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">R:R</p>
                  <p className="text-sm font-medium text-foreground">{detail.rr}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Setup</p>
                  <p className="text-sm text-foreground">{detail.setup}</p>
                </div>
                {detail.notes && (
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Notas</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{detail.notes}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
