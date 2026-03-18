import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, Target, Plus, X } from 'lucide-react';

const trades = [
  { id: '1', pair: 'EUR/USD', type: 'buy' as const, result: 'win' as const, pips: 45, date: '2026-03-17', lotSize: 0.5, notes: 'Suporte diário respeitado', setup: 'Support Bounce', rr: '1:2.5' },
  { id: '2', pair: 'GBP/JPY', type: 'sell' as const, result: 'loss' as const, pips: -22, date: '2026-03-16', lotSize: 0.3, notes: 'Stop muito apertado', setup: 'Trend Following', rr: '1:1.5' },
  { id: '3', pair: 'USD/CHF', type: 'buy' as const, result: 'win' as const, pips: 67, date: '2026-03-15', lotSize: 0.5, notes: 'Breakout com volume', setup: 'Breakout', rr: '1:3' },
  { id: '4', pair: 'AUD/USD', type: 'sell' as const, result: 'win' as const, pips: 31, date: '2026-03-14', lotSize: 0.2, notes: 'Rejeição na resistência', setup: 'Resistance', rr: '1:2' },
  { id: '5', pair: 'EUR/GBP', type: 'buy' as const, result: 'win' as const, pips: 53, date: '2026-03-12', lotSize: 0.5, notes: 'Pin bar H4', setup: 'Pin Bar', rr: '1:2.2' },
];

const resultColors = { win: 'text-primary bg-primary/10', loss: 'text-destructive bg-destructive/10', breakeven: 'text-muted-foreground bg-muted' };
const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AdminTrades() {
  const [selected, setSelected] = useState<string | null>(null);
  const totalPips = trades.reduce((s, t) => s + t.pips, 0);
  const detail = trades.find(t => t.id === selected);

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <motion.div variants={anim} className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold text-foreground text-glow-primary">Trading Journal (Admin)</h1>
          <p className="text-sm text-muted-foreground mt-1">Os teus trades e análise de performance</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all active:scale-[0.98]"><Plus size={16} />Novo Trade</button>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-4"><BarChart3 size={18} className="text-primary mb-2" /><p className="text-2xl font-bold text-foreground">{trades.length}</p><p className="text-xs text-muted-foreground">Total Trades</p></motion.div>
        <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-4"><Target size={18} className="text-primary mb-2" /><p className="text-2xl font-bold text-foreground">{Math.round((trades.filter(t => t.result === 'win').length / trades.length) * 100)}%</p><p className="text-xs text-muted-foreground">Win Rate</p></motion.div>
        <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-4"><TrendingUp size={18} className="text-primary mb-2" /><p className="text-2xl font-bold text-foreground">+{totalPips}</p><p className="text-xs text-muted-foreground">Total Pips</p></motion.div>
      </div>

      <motion.div variants={anim} className="space-y-2">
        {trades.map(t => (
          <div key={t.id} onClick={() => setSelected(t.id)}
            className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/10 transition-colors cursor-pointer active:scale-[0.99]">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${resultColors[t.result]}`}>{t.type === 'buy' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}</div>
              <div><p className="text-sm font-semibold text-foreground">{t.pair}</p><p className="text-xs text-muted-foreground">{t.date} · {t.lotSize} lots</p></div>
            </div>
            <span className={`text-sm font-bold ${t.pips > 0 ? 'text-primary' : 'text-destructive'}`}>{t.pips > 0 ? '+' : ''}{t.pips} pips</span>
          </div>
        ))}
      </motion.div>

      {/* Trade detail modal */}
      <AnimatePresence>
        {detail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()} className="relative bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-premium z-10">
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"><X size={18} /></button>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${resultColors[detail.result]}`}>{detail.type === 'buy' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}</div>
                <div><h2 className="text-lg font-bold text-foreground">{detail.pair}</h2><p className="text-xs text-muted-foreground">{detail.date}</p></div>
                <span className={`ml-auto text-lg font-bold ${detail.pips > 0 ? 'text-primary' : 'text-destructive'}`}>{detail.pips > 0 ? '+' : ''}{detail.pips} pips</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-secondary rounded-xl p-3"><p className="text-[10px] text-muted-foreground uppercase mb-0.5">Setup</p><p className="text-sm font-medium text-foreground">{detail.setup}</p></div>
                <div className="bg-secondary rounded-xl p-3"><p className="text-[10px] text-muted-foreground uppercase mb-0.5">R:R</p><p className="text-sm font-medium text-foreground">{detail.rr}</p></div>
                <div className="bg-secondary rounded-xl p-3"><p className="text-[10px] text-muted-foreground uppercase mb-0.5">Lot Size</p><p className="text-sm font-medium text-foreground">{detail.lotSize}</p></div>
                <div className="bg-secondary rounded-xl p-3"><p className="text-[10px] text-muted-foreground uppercase mb-0.5">Resultado</p><p className="text-sm font-medium text-foreground capitalize">{detail.result}</p></div>
              </div>
              {detail.notes && <div><p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">Notas</p><p className="text-sm text-muted-foreground">{detail.notes}</p></div>}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
