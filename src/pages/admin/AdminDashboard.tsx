import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';
import { resolveIcon } from '@/lib/icons';

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AdminDashboard() {
  const { content } = useBusinessConfig();
  const c = content.dashboard;

  const stats = [
    { label: 'Alunos Activos', value: '142', iconKey: 'Users', change: '+12' },
    { label: 'Cursos Publicados', value: '6', iconKey: 'GraduationCap', change: '+1' },
    { label: 'Broadcasts Enviados', value: '89', iconKey: 'Radio', change: '+5' },
    { label: 'Reuniões Esta Semana', value: '8', iconKey: 'Calendar', change: '+3' },
  ];

  const recentActivity = [
    { text: 'João Silva completou Forex Fundamentos', time: 'Há 2h', iconKey: 'GraduationCap' },
    { text: 'Novo pedido de reunião de Ana Costa', time: 'Há 3h', iconKey: 'Calendar' },
    { text: 'Miguel registou 3 novos trades', time: 'Há 5h', iconKey: 'BarChart3' },
    { text: '12 novos participantes no desafio', time: 'Há 8h', iconKey: 'Trophy' },
  ];

  const quickLinks = [
    { label: 'Enviar Broadcast', path: '/admin/broadcasts', iconKey: 'Radio' },
    { label: 'Gerir Alunos', path: '/admin/students', iconKey: 'Users' },
    { label: 'Ver Reservas', path: '/admin/bookings', iconKey: 'Calendar' },
    { label: 'Museu', path: '/admin/museum', iconKey: 'Image' },
  ];

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <motion.div variants={anim}>
        <h1 className="text-2xl font-bold text-foreground">{c.adminTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">{c.adminSubtitle}</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => {
          const Icon = resolveIcon(s.iconKey);
          return (
            <motion.div key={s.label} variants={anim} transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-2xl p-4 hover:border-primary/20 transition-colors">
              <Icon size={18} className="text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <span className="text-[10px] text-primary font-medium">{s.change}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Actividade Recente</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => {
              const Icon = resolveIcon(a.iconKey);
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{a.text}</p>
                    <p className="text-[11px] text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Acções Rápidas</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map(q => {
              const Icon = resolveIcon(q.iconKey);
              return (
                <Link key={q.path} to={q.path}
                  className="bg-secondary border border-border rounded-xl p-3 hover:border-primary/20 transition-all group">
                  <Icon size={18} className="text-primary mb-2" />
                  <p className="text-xs font-semibold text-foreground">{q.label}</p>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
