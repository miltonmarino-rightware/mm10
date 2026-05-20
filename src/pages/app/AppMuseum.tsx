import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, X, Lock } from 'lucide-react';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

const items = [
  { id: '1', title: 'EUR/USD Breakout — +120 pips', desc: 'Breakout forte da consolidação no H4. Entrada no pullback após quebra com volume. Stop abaixo do range.', result: '+120', date: '2026-03-15', category: 'Breakout', pair: 'EUR/USD', setup: 'Consolidation Breakout', context: 'Mercado em tendência bullish após NFP positivo.', premium: false },
  { id: '2', title: 'GBP/JPY Reversão — +85 pips', desc: 'Pin bar no suporte semanal com divergência RSI. Entrada na confirmação do candle seguinte.', result: '+85', date: '2026-03-12', category: 'Reversão', pair: 'GBP/JPY', setup: 'Pin Bar Reversal', context: 'Suporte semanal testado 3 vezes.', premium: false },
  { id: '3', title: 'USD/CHF Tendência — +200 pips', desc: 'Seguiu tendência descendente no D1 com pullback ao nível 61.8% Fibonacci.', result: '+200', date: '2026-03-08', category: 'Tendência', pair: 'USD/CHF', setup: 'Fibonacci Pullback', context: 'Forte tendência de baixa no daily.', premium: true },
  { id: '4', title: 'AUD/USD Scalp — +45 pips', desc: 'Scalp rápido no suporte M15 com confluência de EMA 50.', result: '+45', date: '2026-03-05', category: 'Scalp', pair: 'AUD/USD', setup: 'EMA Bounce', context: 'Sessão de Londres, alta volatilidade.', premium: false },
  { id: '5', title: 'EUR/GBP Range — +60 pips', desc: 'Operação dentro do range diário, compra no suporte e venda na resistência.', result: '+60', date: '2026-02-28', category: 'Range', pair: 'EUR/GBP', setup: 'Range Trading', context: 'Mercado lateral há 5 dias.', premium: false },
  { id: '6', title: 'USD/JPY News Trade — +95 pips', desc: 'Aproveitamento de NFP com entrada após reteste do breakout level.', result: '+95', date: '2026-02-20', category: 'Notícias', pair: 'USD/JPY', setup: 'News Breakout', context: 'NFP muito acima das expectativas.', premium: true },
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
  const isLocked = detail?.premium;

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">

      <motion.div variants={anim}>
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">Arquivo · Provas executadas</p>
        <h1 className="text-3xl font-bold text-foreground">
          Museu de <span className="font-serif-italic font-normal">trades</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Galeria de resultados e provas sociais do {brand.mentorName}</p>
      </motion.div>

      <motion.div variants={anim} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-9 pl-8 pr-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all font-mono-num"
            placeholder="Pesquisar..." />
        </div>
        <div className="hidden sm:flex gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all shrink-0 ${cat === c ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground border border-border'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="sm:hidden relative">
          <button onClick={() => setComboOpen(!comboOpen)}
            className="w-full h-9 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground flex items-center justify-between font-mono uppercase tracking-wider text-[11px]">
            <span>{cat}</span>
            <svg className={`w-4 h-4 text-muted-foreground transition-transform ${comboOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <AnimatePresence>
            {comboOpen && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                className="absolute z-20 mt-1 w-full bg-card border border-border rounded-xl shadow-premium overflow-hidden">
                {categories.map(c => (
                  <button key={c} onClick={() => { setCat(c); setComboOpen(false); }}
                    className={`w-full px-4 py-2.5 text-left text-[11px] font-mono uppercase tracking-wider transition-colors ${cat === c ? 'bg-secondary text-foreground font-medium' : 'text-muted-foreground hover:bg-secondary'}`}>
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
            className="bg-card border border-border rounded-2xl overflow-hidden hover:border-foreground/20 transition-all cursor-pointer group active:scale-[0.98]">
            <div className="h-40 bg-gradient-to-br from-market-up/10 via-card to-secondary flex items-center justify-center relative border-b border-border">
              <TrendingUp size={32} className="text-market-up/30" />
              <div className="absolute top-3 right-3 bg-market-up/15 text-market-up border border-market-up/30 text-xs font-mono-num font-bold px-2.5 py-1 rounded-lg">
                {item.result} pips
              </div>
              {item.premium && (
                <div className="absolute top-3 left-3 bg-market-warn/15 text-market-warn border border-market-warn/30 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-lg inline-flex items-center gap-1">
                  <Lock size={10} /> Premium
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="font-semibold text-foreground text-sm mb-1 group-hover:text-market-warn transition-colors">{item.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.desc}</p>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                <span>{item.pair}</span>
                <span>·</span>
                <span>{item.date}</span>
                <span className="ml-auto bg-secondary border border-border px-1.5 py-0.5 rounded">{item.category}</span>
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
              <div className="h-48 bg-gradient-to-br from-market-up/10 via-card to-secondary rounded-xl flex items-center justify-center mb-4 border border-border relative overflow-hidden">
                <TrendingUp size={40} className="text-market-up/30" />
                {isLocked && (
                  <div className="absolute inset-0 backdrop-blur-md bg-background/60 flex flex-col items-center justify-center gap-2">
                    <Lock size={28} className="text-market-warn" />
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-market-warn">Premium content</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="bg-market-up/15 text-market-up border border-market-up/30 text-xs font-mono-num font-bold px-2.5 py-1 rounded-lg">{detail.result} pips</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-secondary border border-border px-2 py-0.5 rounded">{detail.pair}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-secondary border border-border px-2 py-0.5 rounded">{detail.category}</span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-3">{detail.title}</h2>
              {isLocked ? (
                <div className="bg-market-warn/5 border border-market-warn/30 rounded-xl p-5 text-center">
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-market-warn mb-2">Conteúdo restrito</p>
                  <p className="text-sm text-foreground mb-4">Este caso de estudo está reservado a membros do <span className="font-serif-italic">Power of 3</span>.</p>
                  <button className="bg-foreground text-background font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-all">
                    Aplicar para aceder
                  </button>
                </div>
              ) : (
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-1">Setup</p>
                    <p className="text-sm text-foreground">{detail.setup}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-1">Descrição</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{detail.desc}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-1">Contexto</p>
                    <p className="text-sm text-muted-foreground leading-relaxed font-serif-italic">{detail.context}</p>
                  </div>
                </div>
              )}
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-4">{detail.date}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
