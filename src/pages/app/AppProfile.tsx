import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Palette, Shield, Save, Camera, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AppProfile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('pt');

  const initials = user?.name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?';

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-3xl mx-auto">

      <motion.div variants={anim}>
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">Conta · Definições</p>
        <h1 className="text-3xl font-bold text-foreground">
          O teu <span className="font-serif-italic font-normal">perfil</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Gere a tua conta e preferências</p>
      </motion.div>

      {/* Avatar / identity card */}
      <motion.div variants={anim} className="relative overflow-hidden bg-card border border-border rounded-2xl p-6">
        <div className="absolute top-0 right-0 w-40 h-40 bg-market-warn/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-card border border-border flex items-center justify-center text-foreground text-2xl font-bold font-serif-italic">
              {initials}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity">
              <Camera size={12} />
            </button>
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold text-foreground">{user?.name}</p>
            <p className="text-sm text-muted-foreground font-mono-num">{user?.email}</p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded bg-market-warn/10 border border-market-warn/30 text-[10px] font-mono uppercase tracking-wider text-market-warn">
              <Crown size={10} />
              {user?.role === 'admin' ? 'Administrador' : 'Membro'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info */}
      <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <User size={14} className="text-muted-foreground" />
          <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Informações pessoais</h3>
        </div>
        <div>
          <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5 block">Nome</label>
          <input value={name} onChange={e => setName(e.target.value)}
            className="w-full h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all" />
        </div>
        <div>
          <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5 block">Email</label>
          <input value={email} readOnly
            className="w-full h-10 px-3 rounded-xl bg-muted/30 border border-border text-sm text-muted-foreground cursor-not-allowed font-mono-num" />
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Palette size={14} className="text-muted-foreground" />
          <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Preferências</h3>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-foreground flex items-center gap-2"><Bell size={14} className="text-muted-foreground" /> Notificações</p>
            <p className="text-xs text-muted-foreground mt-0.5">Receber notificações de broadcasts e sinais</p>
          </div>
          <button onClick={() => setNotifications(!notifications)}
            className={`w-11 h-6 rounded-full transition-all relative shrink-0 ${notifications ? 'bg-market-up' : 'bg-secondary border border-border'}`}>
            <div className="w-5 h-5 rounded-full bg-background absolute top-0.5 transition-all shadow-sm"
              style={{ left: notifications ? '22px' : '2px' }} />
          </button>
        </div>
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Idioma</p>
          <select value={language} onChange={e => setLanguage(e.target.value)}
            className="h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all">
            <option value="pt">Português</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </motion.div>

      {/* Subscription */}
      <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-muted-foreground" />
          <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Subscrição</h3>
        </div>
        <div className="bg-gradient-to-br from-market-warn/10 via-card to-card border border-market-warn/30 rounded-xl p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-market-warn mb-1">Plano activo</p>
              <p className="text-lg font-bold text-foreground">
                Members <span className="font-serif-italic font-normal text-market-warn">Premium</span>
              </p>
            </div>
            <span className="text-xs font-mono-num text-foreground bg-secondary border border-border px-2 py-0.5 rounded">€97 / mês</span>
          </div>
          <p className="text-xs text-muted-foreground">Acesso completo a todos os cursos, sinais e funcionalidades. Próxima renovação: 17 Abr 2026.</p>
        </div>
      </motion.div>

      <motion.div variants={anim}>
        <button className="w-full sm:w-auto bg-foreground text-background font-semibold text-sm px-8 py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
          <Save size={16} /> Guardar Alterações
        </button>
      </motion.div>
    </motion.div>
  );
}
