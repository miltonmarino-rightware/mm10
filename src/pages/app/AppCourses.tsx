import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Play, Clock, BookOpen, Search, Star } from 'lucide-react';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

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

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">

      <motion.div variants={anim}>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-2">Academia · Premium</p>
        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">
          Cursos de <span className="font-serif-italic text-primary/90">trading</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-lg leading-relaxed">
          Conteúdo exclusivo criado pelo {brand.mentorName} para te transformar num trader consistente e rentável.
        </p>
      </motion.div>

      {inProgress.length > 0 && (
        <motion.div variants={anim}>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3 flex items-center gap-2">
            <Play size={12} className="text-primary" /> Continuar a Aprender
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {inProgress.map(c => (
              <div key={c.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-all group cursor-pointer">
                <div className="h-32 bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center">
                  <GraduationCap size={32} className="text-primary/40" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-foreground text-sm mb-1">{c.title}</p>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${c.progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">{c.progress}% completo</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div variants={anim}>
        <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">Em Destaque</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin -mx-4 px-4 lg:mx-0 lg:px-0">
          {featured.map(c => (
            <div key={c.id} className="min-w-[260px] lg:min-w-[300px] bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-all cursor-pointer shrink-0 group">
              <div className="h-36 bg-gradient-to-br from-primary/10 to-accent/30 flex items-center justify-center relative">
                <GraduationCap size={36} className="text-primary/30" />
                <div className="absolute top-3 right-3 bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  {c.category}
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{c.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{c.description}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><BookOpen size={12} />{c.modules} módulos</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{c.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={anim}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Todos os Cursos</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                className="w-full sm:w-48 h-9 pl-8 pr-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="Pesquisar..." />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {categoryList.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${cat === c.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(c => (
            <div key={c.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-all cursor-pointer">
              <div className="h-28 bg-gradient-to-br from-primary/8 to-accent/20 flex items-center justify-center">
                <GraduationCap size={28} className="text-primary/30" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-foreground text-sm">{c.title}</p>
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{c.category}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-3">{c.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><BookOpen size={12} />{c.modules}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{c.duration}</span>
                </div>
                {(c.progress ?? 0) > 0 && (
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${c.progress}%` }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
