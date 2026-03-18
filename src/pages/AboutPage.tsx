import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import tarikLogo from '@/assets/tarik-logo.jpeg';

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AboutPage() {
  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-8 max-w-4xl mx-auto">
      <motion.div variants={anim} className="text-center">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-primary/20 glow-primary-sm mx-auto mb-4">
          <img src={tarikLogo} alt="Tarik" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Sobre o Tarik Forex AI</h1>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Plataforma premium de trading que combina inteligência artificial, mentoria directa e educação de excelência.
        </p>
      </motion.div>
      <motion.div variants={anim} className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Target, title: 'Missão', desc: 'Democratizar o acesso a educação de trading de qualidade com ferramentas de IA avançadas.' },
          { icon: Zap, title: 'Tecnologia', desc: 'IA especializada em Forex, análise de mercado e coaching personalizado de performance.' },
          { icon: Award, title: 'Compromisso', desc: 'Transparência total, uso responsável e foco no desenvolvimento sustentável do trader.' },
        ].map(s => (
          <div key={s.title} className="bg-card border border-border rounded-2xl p-5 text-center">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <s.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1 text-sm">{s.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </motion.div>
      <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-semibold text-foreground mb-3">⚠️ Uso Responsável</h2>
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <p>O Tarik Forex AI é uma ferramenta educacional e de apoio. Não constitui aconselhamento financeiro.</p>
          <p>Trading envolve risco significativo de perda de capital. Opera apenas com capital que podes perder.</p>
        </div>
      </motion.div>
      <motion.div variants={anim} className="text-center">
        <Link to="/auth/register" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all text-sm">
          Começar Agora <ArrowRight size={16} />
        </Link>
      </motion.div>
    </motion.div>
  );
}
