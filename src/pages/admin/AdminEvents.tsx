import React from 'react';import { motion } from 'framer-motion';import { Trophy,Plus,Calendar,Users,Flame,Clock } from 'lucide-react';
const events = [
  { id:'1',title:'Desafio 30 Dias',date:'2026-04-01',status:'upcoming' as const,type:'challenge',participants:45 },
  { id:'2',title:'Sessão ao Vivo',date:'2026-03-21',status:'upcoming' as const,type:'session',participants:120 },
  { id:'3',title:'Campanha Amigos',date:'2026-03-01',status:'active' as const,type:'campaign',participants:30 },
  { id:'4',title:'Desafio Demo',date:'2026-02-15',status:'ended' as const,type:'challenge',participants:67 },
];
const statusStyles:Record<string,{bg:string;label:string}> = { active:{bg:'bg-primary/10 text-primary',label:'Activo'},upcoming:{bg:'bg-warning/10 text-warning',label:'Em Breve'},ended:{bg:'bg-muted text-muted-foreground',label:'Terminado'} };
const anim = { hidden:{opacity:0,y:16},show:{opacity:1,y:0} };
export default function AdminEvents(){
  return(
    <motion.div initial="hidden" animate="show" transition={{staggerChildren:0.06}} className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <motion.div variants={anim} className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Eventos & Desafios</h1><p className="text-sm text-muted-foreground mt-1">Cria e gere eventos da comunidade</p></div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all"><Plus size={16}/>Novo Evento</button>
      </motion.div>
      <motion.div variants={anim} className="space-y-3">
        {events.map(e=>{const st=statusStyles[e.status];return(
          <div key={e.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/10 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2"><Trophy size={16} className="text-primary"/><h3 className="font-semibold text-foreground text-sm">{e.title}</h3></div>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase ${st.bg}`}>{st.label}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar size={12}/>{e.date}</span>
              <span className="flex items-center gap-1"><Users size={12}/>{e.participants}</span>
            </div>
          </div>
        );})}
      </motion.div>
    </motion.div>
  );
}
