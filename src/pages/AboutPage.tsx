import React from 'react';
import { PageTransition, FadeIn } from '@/components/common/PageTransition';
import { Shield, Brain, TrendingUp, AlertTriangle, Sparkles, BookOpen } from 'lucide-react';
import tarikLogo from '@/assets/tarik-logo.jpeg';

const features = [
  { icon: Brain, title: 'IA Especializada', desc: 'Treinada para responder a questões de Forex, análise técnica e gestão de risco.' },
  { icon: TrendingUp, title: 'Análise de Mercado', desc: 'Conceitos fundamentais de trading explicados de forma clara e acessível.' },
  { icon: Shield, title: 'Gestão de Risco', desc: 'Orientação sobre protecção de capital e disciplina de trading.' },
  { icon: BookOpen, title: 'Educação Contínua', desc: 'Aprende conceitos novos a cada interacção com a IA.' },
];

const AboutPage: React.FC = () => (
  <PageTransition className="flex-1 overflow-y-auto scrollbar-thin">
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
      {/* Hero */}
      <FadeIn>
        <div className="text-center mb-10">
          <div className="inline-flex mb-6">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-primary/20 glow-teal">
              <img src={tarikLogo} alt="Tarik Forex AI" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Tarik Forex AI</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            O teu assistente inteligente para trading Forex. Educação, análise e gestão de risco — tudo num único lugar.
          </p>
        </div>
      </FadeIn>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {features.map((f, i) => (
          <FadeIn key={f.title} delay={0.1 + i * 0.05}>
            <div className="bg-card border border-border rounded-2xl p-5 h-full">
              <div className="p-2 rounded-xl bg-primary/10 text-primary w-fit mb-3">
                <f.icon size={20} />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Disclaimer */}
      <FadeIn delay={0.35}>
        <div className="bg-warning/5 border border-warning/15 rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-warning shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Uso Responsável</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                O Tarik Forex AI é uma ferramenta educativa e informativa. Não constitui aconselhamento financeiro.
                Todas as decisões de trading são da responsabilidade do utilizador. O trading de Forex envolve risco
                significativo de perda de capital. Nunca invista mais do que pode perder.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Limitations */}
      <FadeIn delay={0.4}>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Sparkles size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Limitações</h3>
              <ul className="text-xs text-muted-foreground leading-relaxed space-y-1.5 mt-2">
                <li>• A IA pode gerar informações incorrectas ou desactualizadas</li>
                <li>• Não tem acesso a dados de mercado em tempo real</li>
                <li>• Não executa operações de trading</li>
                <li>• Não substitui formação profissional certificada</li>
              </ul>
            </div>
          </div>
        </div>
      </FadeIn>

      <p className="text-center text-xs text-muted-foreground/50 mt-8">
        Tarik Forex AI v1.0 — Feito com precisão.
      </p>
    </div>
  </PageTransition>
);

export default AboutPage;
