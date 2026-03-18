import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Bell, Globe, Palette, Shield, Save, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AppProfile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('pt');

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-3xl mx-auto">

      <motion.div variants={anim}>
        <h1 className="text-2xl font-bold text-foreground">Perfil</h1>
        <p className="text-sm text-muted-foreground mt-1">Gere a tua conta e preferências</p>
      </motion.div>

      {/* Avatar */}
      <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xl font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
            <Camera size={12} />
          </button>
        </div>
        <div>
          <p className="font-semibold text-foreground">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          <p className="text-xs text-primary mt-0.5 capitalize">{user?.role === 'admin' ? 'Administrador' : 'Aluno'}</p>
        </div>
      </motion.div>

      {/* Info */}
      <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><User size={16} className="text-primary" /> Informações Pessoais</h3>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nome</label>
          <input value={name} onChange={e => setName(e.target.value)}
            className="w-full h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
          <input value={email} readOnly
            className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm text-muted-foreground cursor-not-allowed" />
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><Palette size={16} className="text-primary" /> Preferências</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">Notificações</p>
            <p className="text-xs text-muted-foreground">Receber notificações de broadcasts e sinais</p>
          </div>
          <button onClick={() => setNotifications(!notifications)}
            className={`w-11 h-6 rounded-full transition-all relative ${notifications ? 'bg-primary' : 'bg-muted'}`}>
            <div className={`w-5 h-5 rounded-full bg-foreground absolute top-0.5 transition-all ${notifications ? 'left-5.5 right-0.5' : 'left-0.5'}`}
              style={{ left: notifications ? '22px' : '2px' }} />
          </button>
        </div>
        <div>
          <p className="text-sm text-foreground mb-1.5">Idioma</p>
          <select value={language} onChange={e => setLanguage(e.target.value)}
            className="h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
            <option value="pt">Português</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </motion.div>

      {/* Subscription placeholder */}
      <motion.div variants={anim} className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3"><Shield size={16} className="text-primary" /> Subscrição</h3>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <p className="text-sm font-semibold text-primary">Plano Premium</p>
          <p className="text-xs text-muted-foreground mt-0.5">Acesso completo a todos os cursos, sinais e funcionalidades</p>
        </div>
      </motion.div>

      <motion.div variants={anim}>
        <button className="w-full sm:w-auto bg-primary text-primary-foreground font-semibold text-sm px-8 py-3 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all flex items-center justify-center gap-2">
          <Save size={16} /> Guardar Alterações
        </button>
      </motion.div>
    </motion.div>
  );
}
