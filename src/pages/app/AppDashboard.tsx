import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';
import { resolveIcon } from '@/lib/icons';

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AppDashboard() {
  const { brand, content } = useBusinessConfig();
  const c = content.dashboard;

  const stats = [
    { label: 'Cursos Activos', value: '4', iconKey: 'GraduationCap', color: 'text-primary' },
    { label: 'Trades Registados', value: '127', iconKey: 'BarChart3', color: 'text-primary' },
    { label: 'Win Rate', value: '68%', iconKey: 'TrendingUp', color: 'text-primary' },
    { label: 'Próxima Reunião', value: '2d', iconKey: 'Calendar', color: 'text-primary' },
  ];

  const quickActions = [
    { label: 'Chat IA', path: '/app/chat', iconKey: 'Radio', desc: 'Fala com o assistente de IA' },
    { label: 'Cursos', path: '/app/courses', iconKey: 'GraduationCap', desc: 'Continua a aprender' },
    { label: 'Trading Journal', path: '/app/trades', iconKey: 'BarChart3', desc: 'Regista as tuas operações' },
    { label: 'Reservar Reunião', path: '/app/bookings', iconKey: 'Calendar', desc: `Agenda com o ${brand.mentorName}` },
  ];

  const recentBroadcasts = [
    { id: '1', title: 'Análise semanal EUR/USD', priority: 'high' as const, date: 'Hoje, 14:30' },
    { id: '2', title: 'Sinal de entrada GBP/JPY', priority: 'urgent' as const, date: 'Hoje, 10:15' },
    { id: '3', title: 'Dica: Gestão de risco', priority: 'normal' as const, date: 'Ontem' },
  ];

  const priorityColors = { normal: 'bg-muted text-muted-foreground', high: 'bg-primary/15 text-primary', urgent: 'bg-destructive/15 text-destructive' };

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <motion.div variants={anim}>
        <h1 className="text-2xl font-bold text-foreground">{c.clientTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">{c.clientSubtitle}</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => {
          const Icon = resolveIcon(s.iconKey);
          return (
            <motion.div key={s.label} variants={anim} transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-2xl p-4 hover:border-primary/20 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <Icon size={18} className={s.color} />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div variants={anim}>
        <h2 className="text-sm font-semibold text-foreground mb-3">Acções Rápidas</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map(a => {
            const Icon = resolveIcon(a.iconKey);
            return (
              <Link key={a.path} to={a.path}
                className="bg-card border border-border rounded-2xl p-4 hover:border-primary/20 hover:bg-card/80 transition-all group">
                <Icon size={20} className="text-primary mb-3" />
                <p className="text-sm font-semibold text-foreground">{a.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
              </Link>
            );
          })}
        </div>
      </motion.div>

      <motion.div variants={anim}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Broadcasts Recentes</h2>
          <Link to="/app/broadcasts" className="text-xs text-primary hover:underline flex items-center gap-1">
            Ver todos <ArrowRight size={12} />
          </Link>
        </div>
        <div className="space-y-2">
          {recentBroadcasts.map(b => (
            <div key={b.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/10 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase ${priorityColors[b.priority]}`}>
                  {b.priority === 'urgent' ? 'Urgente' : b.priority === 'high' ? 'Alta' : 'Normal'}
                </div>
                <span className="text-sm text-foreground truncate">{b.title}</span>
              </div>
              <span className="text-xs text-muted-foreground shrink-0 ml-3">{b.date}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
