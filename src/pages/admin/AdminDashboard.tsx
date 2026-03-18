import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, BarChart3, Radio, Calendar, Trophy, TrendingUp, Image, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Alunos Activos', value: '142', icon: Users, change: '+12' },
  { label: 'Cursos Publicados', value: '6', icon: GraduationCap, change: '+1' },
  { label: 'Broadcasts Enviados', value: '89', icon: Radio, change: '+5' },
  { label: 'Reuniões Esta Semana', value: '8', icon: Calendar, change: '+3' },
];

const recentActivity = [
  { text: 'João Silva completou Forex Fundamentos', time: 'Há 2h', icon: GraduationCap },
  { text: 'Novo pedido de reunião de Ana Costa', time: 'Há 3h', icon: Calendar },
  { text: 'Miguel registou 3 novos trades', time: 'Há 5h', icon: BarChart3 },
  { text: '12 novos participantes no desafio', time: 'Há 8h', icon: Trophy },
];

const quickLinks = [
  { label: 'Enviar Broadcast', path: '/admin/broadcasts', icon: Radio },
  { label: 'Gerir Alunos', path: '/admin/students', icon: Users },
  { label: 'Ver Reservas', path: '/admin/bookings', icon: Calendar },
  { label: 'Museu', path: '/admin/museum', icon: Image },
];

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AdminDashboard() {
  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <motion.div variants={anim}>
        <h1 className="text-2xl font-bold text-foreground">Painel Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral da plataforma</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} variants={anim} transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-2xl p-4 hover:border-primary/20 transition-colors">
            <s.icon size={18} className="text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <span className="text-[10px] text-primary font-medium">{s.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Actividade Recente</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <a.icon size={14} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{a.text}</p>
                  <p className="text-[11px] text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Acções Rápidas</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map(q => (
              <Link key={q.path} to={q.path}
                className="bg-secondary border border-border rounded-xl p-3 hover:border-primary/20 transition-all group">
                <q.icon size={18} className="text-primary mb-2" />
                <p className="text-xs font-semibold text-foreground">{q.label}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
