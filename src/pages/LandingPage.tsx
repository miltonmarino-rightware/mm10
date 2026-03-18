import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, GraduationCap, Shield, MessageSquare, TrendingUp, Users } from 'lucide-react';
import tarikLogo from '@/assets/tarik-logo.jpeg';

const features = [
  { icon: MessageSquare, title: 'Chat IA Forex', desc: 'Assistente de IA especializado em Forex e trading' },
  { icon: GraduationCap, title: 'Cursos Premium', desc: 'Conteúdo exclusivo para dominar os mercados' },
  { icon: BarChart3, title: 'Trading Journal', desc: 'Analisa as tuas operações com insights de IA' },
  { icon: TrendingUp, title: 'Sinais & Broadcasts', desc: 'Recebe sinais e alertas do mentor em tempo real' },
  { icon: Users, title: 'Comunidade', desc: 'Grupos, turmas e desafios de trading' },
  { icon: Shield, title: 'Mentoria Directa', desc: 'Agenda reuniões com o Tarik para mentoria personalizada' },
];

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-primary/20">
              <img src={tarikLogo} alt="Tarik" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm">Tarik Forex AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
              Entrar
            </Link>
            <Link to="/auth/register"
              className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all">
              Começar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
              Plataforma Premium de Trading
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Domina o Forex com{' '}
              <span className="text-gradient-primary">Inteligência Artificial</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              A plataforma premium de trading que combina IA avançada, mentoria directa, cursos exclusivos e análise de performance. Tudo o que precisas num só lugar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/auth/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:bg-primary/90 glow-primary transition-all text-sm">
                Começar Agora <ArrowRight size={16} />
              </Link>
              <Link to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-medium px-8 py-3.5 rounded-xl hover:bg-secondary/80 border border-border transition-all text-sm">
                Saber Mais
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold mb-3">Tudo numa plataforma</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Ferramentas profissionais de trading, educação premium e comunidade — tudo num ambiente premium.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <f.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Tarik Forex AI</span>
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Sobre</Link>
            <Link to="/auth/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Entrar</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
