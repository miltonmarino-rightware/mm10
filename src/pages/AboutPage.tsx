import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';
import { resolveIcon } from '@/lib/icons';

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AboutPage() {
  const { brand, content } = useBusinessConfig();
  const c = content.about;

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-8 max-w-4xl mx-auto">
      <motion.div variants={anim} className="text-center">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-primary/20 glow-primary-sm mx-auto mb-4">
          <img src={brand.logo} alt={brand.logoAlt} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{c.title}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {c.description}
        </p>
      </motion.div>
      <motion.div variants={anim} className="grid sm:grid-cols-3 gap-4">
        {c.pillars.map(s => {
          const Icon = resolveIcon(s.iconKey);
          return (
            <div key={s.title} className="bg-card border border-border rounded-2xl p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1 text-sm">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </motion.div>
      <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-semibold text-foreground mb-3">{c.disclaimer.title}</h2>
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          {c.disclaimer.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </motion.div>
      <motion.div variants={anim} className="text-center">
        <Link to="/auth/register" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all text-sm">
          {c.ctaLabel} <ArrowRight size={16} />
        </Link>
      </motion.div>
    </motion.div>
  );
}
