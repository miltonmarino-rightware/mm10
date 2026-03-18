import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Search, Filter, TrendingUp, Eye, X } from 'lucide-react';

const items = [
  { id: '1', title: 'EUR/USD Breakout — +120 pips', desc: 'Breakout forte da consolidação no H4', imageUrl: '', result: '+120 pips', date: '2026-03-15', category: 'Breakout', pair: 'EUR/USD' },
  { id: '2', title: 'GBP/JPY Reversão — +85 pips', desc: 'Pin bar no suporte semanal', imageUrl: '', result: '+85 pips', date: '2026-03-12', category: 'Reversão', pair: 'GBP/JPY' },
  { id: '3', title: 'USD/CHF Tendência — +200 pips', desc: 'Seguiu tendência descendente no D1', imageUrl: '', result: '+200 pips', date: '2026-03-08', category: 'Tendência', pair: 'USD/CHF' },
  { id: '4', title: 'AUD/USD Scalp — +45 pips', desc: 'Scalp rápido no suporte M15', imageUrl: '', result: '+45 pips', date: '2026-03-05', category: 'Scalp', pair: 'AUD/USD' },
  { id: '5', title: 'EUR/GBP Range — +60 pips', desc: 'Operação dentro do range diário', imageUrl: '', result: '+60 pips', date: '2026-02-28', category: 'Range', pair: 'EUR/GBP' },
  { id: '6', title: 'USD/JPY News Trade — +95 pips', desc: 'Aproveitamento de NFP', imageUrl: '', result: '+95 pips', date: '2026-02-20', category: 'Notícias', pair: 'USD/JPY' },
];

const categories = ['Todos', 'Breakout', 'Reversão', 'Tendência', 'Scalp', 'Range', 'Notícias'];

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AppMuseum() {
  const [cat, setCat] = useState('Todos');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = items.filter(i =>
    (cat === 'Todos' || i.category === cat) &&
    i.title.toLowerCase().includes(search.toLowerCase())
  );
  const detail = items.find(i => i.id === selected);

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">

      <motion.div variants={anim}>
        <h1 className="text-2xl font-bold text-foreground">Museu de Trades</h1>
        <p className="text-sm text-muted-foreground mt-1">Galeria de resultados e provas sociais do Tarik</p>
      </motion.div>

      <motion.div variants={anim} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-9 pl-8 pr-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            placeholder="Pesquisar..." />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${cat === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
              {c}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div variants={anim} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(item => (
          <div key={item.id} onClick={() => setSelected(item.id)}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-all cursor-pointer group">
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

      {/* Detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            onClick={e => e.stopPropagation()}
            className="relative bg-card border border-border rounded-2xl p-6 max-w-lg w-full shadow-premium z-10">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
            <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/20 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp size={40} className="text-primary/30" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">{detail.result}</span>
              <span className="text-xs text-muted-foreground">{detail.pair} · {detail.category}</span>
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">{detail.title}</h2>
            <p className="text-sm text-muted-foreground">{detail.desc}</p>
            <p className="text-xs text-muted-foreground mt-3">{detail.date}</p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
