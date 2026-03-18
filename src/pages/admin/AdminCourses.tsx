import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Plus, BookOpen, Clock, Users, MoreHorizontal } from 'lucide-react';

const courses = [
  { id: '1', title: 'Forex Fundamentos', modules: 8, duration: '4h 30m', students: 45, status: 'published' },
  { id: '2', title: 'Price Action Avançado', modules: 12, duration: '7h 15m', students: 28, status: 'published' },
  { id: '3', title: 'Gestão de Risco', modules: 6, duration: '3h', students: 38, status: 'published' },
  { id: '4', title: 'Psicologia de Trading', modules: 10, duration: '5h 45m', students: 19, status: 'draft' },
];
const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AdminCourses() {
  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <motion.div variants={anim} className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Cursos</h1><p className="text-sm text-muted-foreground mt-1">Gere os cursos premium da plataforma</p></div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all"><Plus size={16}/> Novo Curso</button>
      </motion.div>
      <motion.div variants={anim} className="space-y-3">
        {courses.map(c => (
          <div key={c.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/10 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><GraduationCap size={18} className="text-primary"/></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.title}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1"><BookOpen size={11}/>{c.modules} módulos</span>
                    <span className="flex items-center gap-1"><Clock size={11}/>{c.duration}</span>
                    <span className="flex items-center gap-1"><Users size={11}/>{c.students} alunos</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${c.status === 'published' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {c.status === 'published' ? 'Publicado' : 'Rascunho'}
                </span>
                <button className="p-1 text-muted-foreground hover:text-foreground"><MoreHorizontal size={16}/></button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
