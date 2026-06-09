import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Brain, Clock, GraduationCap, Play, Search, ShieldCheck, Target, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

const anim = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

const academyStats = [
  { label: 'Course Progress', value: '72%', icon: Target },
  { label: 'Study Streak', value: '21d', icon: Trophy },
  { label: 'Modules', value: '12', icon: GraduationCap },
  { label: 'AI Support', value: '24/7', icon: Bot },
];

const learningPath = [
  { title: 'Foundation', desc: 'Estrutura, disciplina e leitura base.', status: 'Completed' },
  { title: 'Liquidity', desc: 'Zonas, manipulação e confirmação.', status: 'Current' },
  { title: 'Execution', desc: 'Entrada, gestão e revisão.', status: 'Locked' },
];

export default function AppCourses() {
  const { brand, menu } = useBusinessConfig();
  const courses = menu.products;
  const categoryList = menu.categories;

  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = courses.filter(c =>
    (cat === 'all' || c.category === categoryList.find(ct => ct.id === cat)?.label) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );
  const featured = courses.filter(c => c.featured);
  const inProgress = courses.filter(c => (c.progress ?? 0) > 0 && (c.progress ?? 0) < 100);
  const mainCourse = inProgress[0] ?? featured[0] ?? courses[0];

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="min-h-full terminal-grid p-4 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section variants={anim} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-background shadow-premium">
          <div className="absolute inset-0 mm-brand-field opacity-85" />
          <div className="absolute inset-0 market-wave animate-market-drift opacity-60" />
          <div className="relative grid gap-8 p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
            <div className="space-y-7">
              <div>
                <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-primary">Power Of Three · Academy OS</p>
                <h1 className="font-display text-5xl uppercase leading-[0.88] text-foreground text-glow-primary sm:text-7xl">Power<br />Of Three</h1>
                <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">O método principal da Money Makers por {brand.mentorName}: curso, journal, museu, AI Mentor e Inner Circle num único fluxo de evolução.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-primary-foreground glow-primary transition hover:scale-[1.01]">Continuar aula <Play size={15} /></button>
                <Link to="/app/chat" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-bold text-foreground transition hover:bg-white/[0.07]">Perguntar ao Mentor AI <ArrowRight size={15} /></Link>
              </div>
            </div>

            <div className="terminal-panel rounded-3xl p-5">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Continue Learning</p>
                  <h2 className="mt-2 text-2xl font-bold text-foreground">{mainCourse?.title ?? 'Power Of Three'}</h2>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase text-primary">Current</span>
              </div>
              <div className="relative mb-5 h-44 overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-5">
                <div className="absolute inset-0 market-wave opacity-60" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground"><span>Module 07</span><span>Liquidity Concepts</span></div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary glow-primary-sm"><GraduationCap size={28} /></div>
                  <div><div className="h-2 rounded-full bg-white/10"><div className="h-full w-[72%] rounded-full bg-primary" /></div><p className="mt-2 text-xs text-muted-foreground">72% completo · próxima aula em 18 min</p></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {academyStats.map(s => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                    <s.icon size={15} className="mb-2 text-primary" />
                    <p className="font-mono-num text-xl font-bold text-foreground">{s.value}</p>
                    <p className="mt-1 text-[9px] text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={anim} className="grid gap-4 lg:grid-cols-[1fr_340px]">
          <div className="terminal-panel rounded-3xl p-5 lg:p-6">
            <div className="mb-5 flex items-center justify-between"><div><p className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary">Learning Path</p><h2 className="mt-2 text-2xl font-bold text-foreground">Roadmap de evolução</h2></div><ShieldCheck size={20} className="text-primary" /></div>
            <div className="grid gap-3 md:grid-cols-3">
              {learningPath.map((item, index) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                  <div className="mb-5 flex items-center justify-between"><span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span><span className={`rounded-full px-2 py-1 text-[9px] font-mono uppercase ${item.status === 'Current' ? 'bg-primary/10 text-primary' : item.status === 'Completed' ? 'bg-market-up/10 text-market-up' : 'bg-white/[0.04] text-muted-foreground'}`}>{item.status}</span></div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="space-y-4">
            <div className="mm-glass rounded-3xl p-5"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Brain size={22} /></div><p className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary">AI Mentor</p><h3 className="mt-2 text-xl font-bold text-foreground">Estuda com contexto</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Usa o Mentor AI para explicar aulas, criar plano de estudo e rever dúvidas do método.</p><Link to="/app/chat" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">Abrir AI <ArrowRight size={15} /></Link></div>
            <div className="terminal-panel rounded-3xl p-5"><div className="mb-4 flex items-center gap-2 text-primary"><Users size={17} /><span className="text-[10px] font-mono uppercase tracking-[0.22em]">Inner Circle</span></div><p className="text-sm leading-6 text-muted-foreground">A turma oficial acompanha a tua execução e evolução dentro do PO3.</p></div>
          </aside>
        </motion.section>

        {inProgress.length > 0 && (
          <motion.section variants={anim}>
            <h2 className="mb-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground"><Play size={12} className="text-primary" /> Continuar a Aprender</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {inProgress.map(c => (
                <div key={c.id} className="terminal-panel group cursor-pointer overflow-hidden rounded-3xl transition-all hover:-translate-y-1 hover:border-primary/25">
                  <div className="relative h-36 border-b border-white/10 bg-black/20 p-5"><div className="absolute inset-0 market-wave opacity-50" /><div className="relative flex h-full flex-col justify-between"><GraduationCap size={32} className="text-primary/70" /><div><p className="text-sm font-bold text-foreground">{c.title}</p><div className="mt-3 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-primary" style={{ width: `${c.progress}%` }} /></div></div></div></div>
                  <div className="p-4"><p className="text-xs text-muted-foreground">{c.progress}% completo</p></div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section variants={anim}>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Academy Library</p><h2 className="mt-1 text-2xl font-bold text-foreground">Aulas e módulos</h2></div><div className="relative w-full sm:w-64"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={e => setSearch(e.target.value)} className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.035] pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Pesquisar aulas..." /></div></div>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">{categoryList.map(c => (<button key={c.id} onClick={() => setCat(c.id)} className={`shrink-0 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${cat === c.id ? 'bg-primary text-primary-foreground glow-primary-sm' : 'border border-white/10 bg-white/[0.035] text-muted-foreground hover:text-foreground'}`}>{c.label}</button>))}</div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(c => (
              <div key={c.id} className="terminal-panel group cursor-pointer overflow-hidden rounded-3xl transition-all hover:-translate-y-1 hover:border-primary/25">
                <div className="relative h-32 border-b border-white/10 bg-black/25 p-5"><div className="absolute inset-0 market-wave opacity-40" /><div className="relative flex h-full items-start justify-between"><GraduationCap size={30} className="text-primary/65" /><span className="rounded-full bg-primary/10 px-2 py-1 text-[9px] font-mono uppercase text-primary">{c.category}</span></div></div>
                <div className="p-5"><h3 className="text-sm font-bold text-foreground">{c.title}</h3><p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{c.description}</p><div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><GraduationCap size={12} />{c.modules} módulos</span><span className="flex items-center gap-1"><Clock size={12} />{c.duration}</span></div>{(c.progress ?? 0) > 0 && <div className="mt-4 h-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-primary" style={{ width: `${c.progress}%` }} /></div>}</div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
