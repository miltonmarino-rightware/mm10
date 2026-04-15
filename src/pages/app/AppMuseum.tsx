import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, X } from 'lucide-react';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

const items = [
  { id: '1', title: 'EUR/USD Breakout — +120 pips', desc: 'Breakout forte da consolidação no H4. Entrada no pullback após quebra com volume. Stop abaixo do range.', imageUrl: '', result: '+120 pips', date: '2026-03-15', category: 'Breakout', pair: 'EUR/USD', setup: 'Consolidation Breakout', context: 'Mercado em tendência bullish após NFP positivo.' },
  { id: '2', title: 'GBP/JPY Reversão — +85 pips', desc: 'Pin bar no suporte semanal com divergência RSI. Entrada na confirmação do candle seguinte.', imageUrl: '', result: '+85 pips', date: '2026-03-12', category: 'Reversão', pair: 'GBP/JPY', setup: 'Pin Bar Reversal', context: 'Suporte semanal testado 3 vezes.' },
  { id: '3', title: 'USD/CHF Tendência — +200 pips', desc: 'Seguiu tendência descendente no D1 com pullback ao nível 61.8% Fibonacci.', imageUrl: '', result: '+200 pips', date: '2026-03-08', category: 'Tendência', pair: 'USD/CHF', setup: 'Fibonacci Pullback', context: 'Forte tendência de baixa no daily.' },
  { id: '4', title: 'AUD/USD Scalp — +45 pips', desc: 'Scalp rápido no suporte M15 com confluência de EMA 50.', imageUrl: '', result: '+45 pips', date: '2026-03-05', category: 'Scalp', pair: 'AUD/USD', setup: 'EMA Bounce', context: 'Sessão de Londres, alta volatilidade.' },
  { id: '5', title: 'EUR/GBP Range — +60 pips', desc: 'Operação dentro do range diário, compra no suporte e venda na resistência.', imageUrl: '', result: '+60 pips', date: '2026-02-28', category: 'Range', pair: 'EUR/GBP', setup: 'Range Trading', context: 'Mercado lateral há 5 dias.' },
  { id: '6', title: 'USD/JPY News Trade — +95 pips', desc: 'Aproveitamento de NFP com entrada após reteste do breakout level.', imageUrl: '', result: '+95 pips', date: '2026-02-20', category: 'Notícias', pair: 'USD/JPY', setup: 'News Breakout', context: 'NFP muito acima das expectativas.' },
];

const categories = ['Todos', 'Breakout', 'Reversão', 'Tendência', 'Scalp', 'Range', 'Notícias'];

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AppMuseum() {
  const { brand } = useBusinessConfig();
  const [cat, setCat] = useState('Todos');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [comboOpen, setComboOpen] = useState(false);

  const filtered = items.filter(i =>
    (cat === 'Todos' || i.category === cat) &&
    i.title.toLowerCase().includes(search.toLowerCase())
  );
  const detail = items.find(i => i.id === selected);

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">

      <motion.div variants={anim} className="text-center">
        <h1 className="text-2xl font-bold text-foreground text-glow-primary">Museu de Trades</h1>
        <p className="text-sm text-muted-foreground mt-1">Galeria de resultados e provas sociais do {brand.mentorName}</p>
      </motion.div>

      <motion.div variants={anim} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-9 pl-8 pr-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            placeholder="Pesquisar..." />
        </div>
        <div className="hidden sm:flex gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${cat === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="sm:hidden relative">
          <button onClick={() => setComboOpen(!comboOpen)}
            className="w-full h-9 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground flex items-center justify-between">
            <span>{cat}</span>
            <svg className={`w-4 h-4 text-muted-foreground transition-transform ${comboOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <AnimatePresence>
            {comboOpen && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                className="absolute z-20 mt-1 w-full bg-card border border-border rounded-xl shadow-premium overflow-hidden">
                {categories.map(c => (
                  <button key={c} onClick={() => { setCat(c); setComboOpen(false); }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${cat === c ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-secondary'}`}>
                    {c}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div variants={anim} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(item => (
          <div key={item.id} onClick={() => setSelected(item.id)}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-all cursor-pointer group active:scale-[0.98]">
            <div className="h-40 bg-gradient-to-br from-primary/8 to-accent/20 flex items-center justify-center relative">
              <TrendingUp size={32} className="text-primary/20" />
              <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-lg">
                {item.result}
              </div>
            </div>
            <div className="p-4">
              <p className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">{item.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.desc}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{item.pair}</span>
                <span>{item.date}</span>
                <span className="bg-muted px-1.5 py-0.5 rounded text-[10px]">{item.category}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {detail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative bg-card border border-border rounded-2xl p-6 max-w-lg w-full shadow-premium z-10 max-h-[85vh] overflow-y-auto scrollbar-thin">
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                <X size={18} />
              </button>
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/20 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp size={40} className="text-primary/30" />
              </div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-lg">{detail.result}</span>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">{detail.pair}</span>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">{detail.category}</span>
              </div>
              <h2 className="text-lg font-bold text-foreground mb-2">{detail.title}</h2>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Setup</p>
                  <p className="text-sm text-foreground">{detail.setup}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Descrição</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{detail.desc}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Contexto</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{detail.context}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{detail.date}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
