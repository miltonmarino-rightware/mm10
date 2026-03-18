import React from 'react';import { motion } from 'framer-motion';import { Calendar,Clock,Check,X,MoreHorizontal } from 'lucide-react';
const bookings = [
  { id:'1',studentName:'João Silva',date:'2026-03-20',time:'10:00',status:'pending' as const,topic:'Revisão de trades' },
  { id:'2',studentName:'Ana Costa',date:'2026-03-21',time:'14:30',status:'pending' as const,topic:'Análise de setup' },
  { id:'3',studentName:'Miguel Santos',date:'2026-03-18',time:'11:00',status:'approved' as const,topic:'Mentoria avançada' },
  { id:'4',studentName:'Sofia Pereira',date:'2026-03-15',time:'09:30',status:'completed' as const,topic:'Introdução' },
];
const statusStyles:Record<string,{bg:string;label:string}> = { pending:{bg:'bg-warning/10 text-warning',label:'Pendente'},approved:{bg:'bg-primary/10 text-primary',label:'Aprovado'},rejected:{bg:'bg-destructive/10 text-destructive',label:'Recusado'},completed:{bg:'bg-muted text-muted-foreground',label:'Concluído'},'no-show':{bg:'bg-destructive/10 text-destructive',label:'No-show'},cancelled:{bg:'bg-muted text-muted-foreground',label:'Cancelado'} };
const anim = { hidden:{opacity:0,y:16},show:{opacity:1,y:0} };
export default function AdminBookings(){
  return(
    <motion.div initial="hidden" animate="show" transition={{staggerChildren:0.06}} className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <motion.div variants={anim}><h1 className="text-2xl font-bold text-foreground">Reservas</h1><p className="text-sm text-muted-foreground mt-1">Gere pedidos de reunião dos alunos</p></motion.div>
      <motion.div variants={anim} className="space-y-2">
        {bookings.map(b=>{const st=statusStyles[b.status];return(
          <div key={b.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/10 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold">{b.studentName[0]}</div>
                <div><p className="text-sm font-semibold text-foreground">{b.studentName}</p><p className="text-xs text-muted-foreground">{b.topic}</p></div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase ${st.bg}`}>{st.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar size={12}/>{b.date}</span>
                <span className="flex items-center gap-1"><Clock size={12}/>{b.time}</span>
              </div>
              {b.status==='pending'&&(
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"><Check size={14}/></button>
                  <button className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"><X size={14}/></button>
                </div>
              )}
            </div>
          </div>
        );})}
      </motion.div>
    </motion.div>
  );
}
