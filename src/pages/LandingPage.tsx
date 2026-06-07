import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Calendar, GraduationCap, Radio, ShieldCheck, Target, Trophy, Users, Zap } from 'lucide-react';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

const pillars = [
  { title: 'Market Desk', desc: 'Broadcasts, sinais e leitura operacional para saber onde focar.', icon: Radio },
  { title: 'Power Of Three', desc: 'O método principal com curso, journal, museu e turma privada.', icon: GraduationCap },
  { title: 'Mentor AI', desc: 'Um centro de inteligência para estudar, rever trades e manter disciplina.', icon: Bot },
  { title: 'Inner Circle', desc: 'Comunidade privada para traders que querem execução séria.', icon: Users },
];

const stats = [
  { label: 'Método principal', value: 'PO3' },
  { label: 'AI Mentor', value: '24/7' },
  { label: 'Sessões 1:1', value: '$10+' },
  { label: 'Sistema', value: 'OS' },
];

export default function LandingPage() {
  const { brand, content } = useBusinessConfig();

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-background text-foreground">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-background/72 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <img src={brand.logo} alt={brand.logoAlt} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-black lowercase tracking-tight">{brand.name}</p>
              <p className="text-[9px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Terminal</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/auth/login" className="hidden rounded-xl px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground sm:inline-flex">
              {content.nav.login}
            </Link>
            <Link to="/auth/register" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground glow-primary-sm transition hover:scale-[1.01]">
              Entrar no Terminal <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[100dvh] overflow-hidden px-4 pt-28 terminal-grid">
        <div className="absolute inset-0 mm-brand-field opacity-80" />
        <div className="absolute inset-0 market-wave animate-market-drift opacity-70" />
        <div className="absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/10 bg-primary/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 pb-20 lg:min-h-[calc(100dvh-7rem)] lg:grid-cols-[1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.24em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-market-up animate-pulse-soft" />
              Where traders come to win
            </div>
            <h1 className="font-display text-5xl uppercase leading-[0.88] text-foreground text-glow-primary sm:text-7xl lg:text-8xl">
              Money<br />Makers<br /><span className="text-gradient-primary">Terminal</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Um operating system privado para traders: mercado, Power Of Three, Mentor AI, broadcasts, journal, comunidade e mentoria 1:1.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/auth/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-primary-foreground glow-primary transition hover:scale-[1.01]">
                Start Terminal <ArrowRight size={16} />
              </Link>
              <Link to="/checkout" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-bold text-foreground transition hover:bg-white/[0.07]">
                Ver planos
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }} className="terminal-panel relative rounded-[2rem] p-4 shadow-premium lg:p-5">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Daily Briefing</p>
                <p className="mt-1 text-sm font-semibold text-foreground">London Session · Market Open</p>
              </div>
              <span className="rounded-full bg-market-up/10 px-3 py-1 text-[10px] font-mono uppercase text-market-up">Live</span>
            </div>

            <div className="relative mb-4 h-64 overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-5">
              <div className="absolute inset-0 market-wave opacity-70" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  <span>Liquidity Flow</span><span>MM Intelligence</span>
                </div>
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary glow-primary-sm">
                  <Zap size={36} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['EUR/USD +0.31%', 'XAU/USD +0.41%', 'NAS100 -0.21%'].map((item, i) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-[10px] font-mono text-muted-foreground">
                      <span className={i === 2 ? 'text-market-down' : 'text-market-up'}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map(s => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-xl font-mono-num font-bold text-foreground">{s.value}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-background px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.28em] text-primary">The ecosystem</p>
            <h2 className="font-display text-4xl uppercase leading-none text-foreground sm:text-6xl">Não é uma academia. É um sistema operativo para traders.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ title, desc, icon: Icon }) => (
              <div key={title} className="terminal-panel rounded-3xl p-6 transition hover:-translate-y-1 hover:border-primary/30">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-primary/10 text-primary"><Icon size={22} /></div>
                <h3 className="text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="mm-glass rounded-[2rem] p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Target size={26} /></div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-primary">Power Of Three</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-none text-foreground">Discipline. Execution. Wealth.</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">O produto principal da Money Makers: curso, AI, journal, museu e Inner Circle num único fluxo de crescimento.</p>
            <Link to="/checkout" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground glow-primary-sm">Desbloquear PO3 <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Course Roadmap', 'Aulas organizadas por evolução real.'],
              ['Trading Journal', 'Disciplina, métricas e decisões.'],
              ['Trade Museum', 'Arquivos e estudos de execução.'],
              ['Inner Circle', 'Turma privada e comunidade oficial.'],
            ].map(([title, desc], i) => (
              <div key={title} className="terminal-panel rounded-3xl p-6">
                <span className="text-[10px] font-mono text-primary">0{i + 1}</span>
                <h3 className="mt-5 text-xl font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-xs text-muted-foreground">{content.footerCopyright.replace('{year}', new Date().getFullYear().toString())}</span>
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground">{content.nav.about}</Link>
            <Link to="/auth/login" className="text-xs text-muted-foreground hover:text-foreground">{content.nav.login}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
