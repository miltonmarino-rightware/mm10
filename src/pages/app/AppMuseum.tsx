import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, X, Lock, Archive, BookOpen, Target, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
const anim = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

const archiveStats = [
  { label: 'Case Studies', value: '48', icon: Archive },
  { label: 'Best Result', value: '+200', icon: TrendingUp },
  { label: 'Setups', value: '12', icon: Target },
  { label: 'Verified', value: '100%', icon: ShieldCheck },
];

export default function AppMuseum() {
  const { brand } = useBusinessConfig();
  const [cat, setCat] = useState('Todos');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [comboOpen, setComboOpen] = useState(false);

  const filtered = items.filter(i => (cat === 'Todos' || i.category === cat) && i.title.toLowerCase().includes(search.toLowerCase()));
  const detail = items.find(i => i.id === selected);
  const isLocked = detail?.premium;

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="min-h-full terminal-grid p-4 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section variants={anim} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-background shadow-premium">
          <div className="absolute inset-0 mm-brand-field opacity-85" />
          <div className="absolute inset-0 market-wave animate-market-drift opacity-60" />
          <div className="relative grid gap-8 p-6 lg:grid-cols-[1fr_0.9fr] lg:p-10">
            <div>
              <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-primary">Execution Archive · Verified Case Studies</p>
              <h1 className="font-display text-5xl uppercase leading-[0.88] text-foreground text-glow-primary sm:text-7xl">Trade<br />Museum</h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">Arquivo premium de execuções, setups e provas sociais do {brand.mentorName}. Aprende com operações reais e padrões validados.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link to="/app/trades" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground glow-primary-sm">Abrir Journal <ArrowRight size={15} /></Link>
                <Link to="/app/chat" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground">Rever com AI</Link>
              </div>
            </div>

            <div className="terminal-panel rounded-3xl p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Archive Overview</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">Setup Library · Market Archives</p>
                </div>
                <BookOpen size={18} className="text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {archiveStats.map(s => (
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

        <motion.section variants={anim} className="terminal-panel rounded-3xl p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.035] pl-9 pr-3 font-mono-num text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Pesquisar setups, pares ou contexto..." />
            </div>
            <div className="hidden gap-2 overflow-x-auto pb-1 sm:flex">
              {categories.map(c => (
                <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-xl px-3 py-2 text-[11px] font-mono uppercase tracking-wider transition-all ${cat === c ? 'bg-primary text-primary-foreground glow-primary-sm' : 'border border-white/10 bg-white/[0.035] text-muted-foreground hover:text-foreground'}`}>{c}</button>
              ))}
            </div>
            <div className="relative sm:hidden">
              <button onClick={() => setComboOpen(!comboOpen)} className="flex h-10 w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] px-3 text-[11px] font-mono uppercase tracking-wider text-foreground"><span>{cat}</span><span>{comboOpen ? '⌃' : '⌄'}</span></button>
              <AnimatePresence>
                {comboOpen && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-white/10 bg-card shadow-premium">{categories.map(c => <button key={c} onClick={() => { setCat(c); setComboOpen(false); }} className={`w-full px-4 py-2.5 text-left text-[11px] font-mono uppercase tracking-wider transition-colors ${cat === c ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-white/[0.04]'}`}>{c}</button>)}</motion.div>}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        <motion.section variants={anim} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(item => (
            <div key={item.id} onClick={() => setSelected(item.id)} className="terminal-panel group cursor-pointer overflow-hidden rounded-3xl transition-all hover:-translate-y-1 hover:border-primary/25 active:scale-[0.98]">
              <div className="relative h-44 border-b border-white/10 bg-black/25 p-5">
                <div className="absolute inset-0 market-wave opacity-45" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <TrendingUp size={34} className="text-market-up/70" />
                    <div className="rounded-2xl border border-market-up/30 bg-market-up/10 px-3 py-1 text-xs font-mono-num font-bold text-market-up">{item.result} pips</div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    {item.premium && <span className="inline-flex items-center gap-1 rounded-full border border-market-warn/30 bg-market-warn/10 px-2 py-1 text-[10px] font-mono uppercase text-market-warn"><Lock size={10} /> Premium</span>}
                    <span className="ml-auto rounded-full border border-white/10 bg-white/[0.035] px-2 py-1 text-[10px] font-mono uppercase text-muted-foreground">{item.category}</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">{item.title}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{item.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground"><span>{item.pair}</span><span>·</span><span>{item.date}</span></div>
              </div>
            </div>
          ))}
        </motion.section>

        <AnimatePresence>
          {detail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/85 backdrop-blur-md" />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} onClick={e => e.stopPropagation()} className="terminal-panel relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] p-6 shadow-premium scrollbar-thin">
                <button onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-xl p-2 text-muted-foreground transition hover:bg-white/[0.05] hover:text-foreground"><X size={18} /></button>
                <div className="relative mb-5 h-52 overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-5">
                  <div className="absolute inset-0 market-wave opacity-55" />
                  <div className="relative flex h-full flex-col justify-between">
                    <TrendingUp size={42} className="text-market-up/70" />
                    <div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-market-up/30 bg-market-up/10 px-3 py-1 text-xs font-mono-num font-bold text-market-up">{detail.result} pips</span><span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-[10px] font-mono uppercase text-muted-foreground">{detail.pair}</span><span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-[10px] font-mono uppercase text-muted-foreground">{detail.category}</span></div>
                  </div>
                  {isLocked && <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/65 backdrop-blur-md"><Lock size={28} className="text-market-warn" /><p className="text-[10px] font-mono uppercase tracking-[0.2em] text-market-warn">Premium content</p></div>}
                </div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">{detail.title}</h2>
                {isLocked ? (
                  <div className="rounded-3xl border border-market-warn/30 bg-market-warn/5 p-5 text-center"><p className="mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-market-warn">Conteúdo restrito</p><p className="mb-5 text-sm text-foreground">Este caso de estudo é reservado a membros do Power Of Three.</p><Link to="/checkout" className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground glow-primary-sm">Desbloquear acesso</Link></div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Setup</p><p className="text-sm text-foreground">{detail.setup}</p></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Contexto</p><p className="text-sm leading-6 text-muted-foreground">{detail.context}</p></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:col-span-2"><p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Descrição</p><p className="text-sm leading-6 text-muted-foreground">{detail.desc}</p></div>
                  </div>
                )}
                <p className="mt-5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{detail.date}</p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
