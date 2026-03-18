import React from 'react';import { motion } from 'framer-motion';import { TrendingUp,TrendingDown,BarChart3,Target,Plus } from 'lucide-react';
const trades = [
  { id:'1',pair:'EUR/USD',type:'buy' as const,result:'win' as const,pips:45,date:'2026-03-17',lotSize:0.5 },
  { id:'2',pair:'GBP/JPY',type:'sell' as const,result:'loss' as const,pips:-22,date:'2026-03-16',lotSize:0.3 },
  { id:'3',pair:'USD/CHF',type:'buy' as const,result:'win' as const,pips:67,date:'2026-03-15',lotSize:0.5 },
  { id:'4',pair:'AUD/USD',type:'sell' as const,result:'win' as const,pips:31,date:'2026-03-14',lotSize:0.2 },
  { id:'5',pair:'EUR/GBP',type:'buy' as const,result:'win' as const,pips:53,date:'2026-03-12',lotSize:0.5 },
];
const resultColors = { win:'text-primary bg-primary/10',loss:'text-destructive bg-destructive/10',breakeven:'text-muted-foreground bg-muted' };
const anim = { hidden:{opacity:0,y:16},show:{opacity:1,y:0} };
export default function AdminTrades(){
  const totalPips = trades.reduce((s,t)=>s+t.pips,0);
  return(
    <motion.div initial="hidden" animate="show" transition={{staggerChildren:0.06}} className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <motion.div variants={anim} className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Trading Journal (Admin)</h1><p className="text-sm text-muted-foreground mt-1">Os teus trades e análise de performance</p></div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all"><Plus size={16}/>Novo Trade</button>
      </motion.div>
      <div className="grid grid-cols-3 gap-3">
        <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-4"><BarChart3 size={18} className="text-primary mb-2"/><p className="text-2xl font-bold text-foreground">{trades.length}</p><p className="text-xs text-muted-foreground">Total Trades</p></motion.div>
        <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-4"><Target size={18} className="text-primary mb-2"/><p className="text-2xl font-bold text-foreground">{Math.round((trades.filter(t=>t.result==='win').length/trades.length)*100)}%</p><p className="text-xs text-muted-foreground">Win Rate</p></motion.div>
        <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-4"><TrendingUp size={18} className="text-primary mb-2"/><p className="text-2xl font-bold text-foreground">+{totalPips}</p><p className="text-xs text-muted-foreground">Total Pips</p></motion.div>
      </div>
      <motion.div variants={anim} className="space-y-2">
        {trades.map(t=>(
          <div key={t.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${resultColors[t.result]}`}>{t.type==='buy'?<TrendingUp size={14}/>:<TrendingDown size={14}/>}</div>
              <div><p className="text-sm font-semibold text-foreground">{t.pair}</p><p className="text-xs text-muted-foreground">{t.date} · {t.lotSize} lots</p></div>
            </div>
            <span className={`text-sm font-bold ${t.pips>0?'text-primary':'text-destructive'}`}>{t.pips>0?'+':''}{t.pips} pips</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
