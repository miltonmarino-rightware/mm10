import React from 'react';import { motion } from 'framer-motion';import { Image,Plus,TrendingUp,MoreHorizontal } from 'lucide-react';
const items = [
  { id:'1',title:'EUR/USD Breakout +120 pips',result:'+120 pips',date:'2026-03-15',category:'Breakout' },
  { id:'2',title:'GBP/JPY Reversão +85 pips',result:'+85 pips',date:'2026-03-12',category:'Reversão' },
  { id:'3',title:'USD/CHF Tendência +200 pips',result:'+200 pips',date:'2026-03-08',category:'Tendência' },
  { id:'4',title:'AUD/USD Scalp +45 pips',result:'+45 pips',date:'2026-03-05',category:'Scalp' },
];
const anim = { hidden:{opacity:0,y:16},show:{opacity:1,y:0} };
export default function AdminMuseum(){
  return(
    <motion.div initial="hidden" animate="show" transition={{staggerChildren:0.06}} className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <motion.div variants={anim} className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Museu de Trades</h1><p className="text-sm text-muted-foreground mt-1">Gere a galeria de provas sociais</p></div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all"><Plus size={16}/>Novo Item</button>
      </motion.div>
      <motion.div variants={anim} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(item=>(
          <div key={item.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-all">
            <div className="h-32 bg-gradient-to-br from-primary/8 to-accent/20 flex items-center justify-center relative">
              <TrendingUp size={28} className="text-primary/20"/>
              <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">{item.result}</div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div><p className="text-sm font-semibold text-foreground">{item.title}</p><p className="text-xs text-muted-foreground">{item.date} · {item.category}</p></div>
              <button className="p-1 text-muted-foreground hover:text-foreground"><MoreHorizontal size={16}/></button>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
