import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Check, X, Loader2, Plus, User } from 'lucide-react';

const slots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

const bookings = [
  { id: '1', date: '2026-03-20', time: '10:00', status: 'approved' as const, topic: 'Revisão de trades', notes: '' },
  { id: '2', date: '2026-03-25', time: '14:30', status: 'pending' as const, topic: 'Análise de setup', notes: '' },
  { id: '3', date: '2026-03-10', time: '11:00', status: 'completed' as const, topic: 'Mentoria inicial', notes: '' },
  { id: '4', date: '2026-03-05', time: '09:30', status: 'rejected' as const, topic: 'Dúvidas sobre risco', notes: 'Slot já ocupado' },
];

const statusStyles = {
  pending: { bg: 'bg-warning/10 text-warning', label: 'Pendente' },
  approved: { bg: 'bg-primary/10 text-primary', label: 'Aprovado' },
  rejected: { bg: 'bg-destructive/10 text-destructive', label: 'Recusado' },
  completed: { bg: 'bg-muted text-muted-foreground', label: 'Concluído' },
  'no-show': { bg: 'bg-destructive/10 text-destructive', label: 'No-show' },
  cancelled: { bg: 'bg-muted text-muted-foreground', label: 'Cancelado' },
};

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AppBookings() {
  const [showNew, setShowNew] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [topic, setTopic] = useState('');

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">

      <motion.div variants={anim} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reservas</h1>
          <p className="text-sm text-muted-foreground mt-1">Agenda reuniões com o Tarik</p>
        </div>
        <button onClick={() => setShowNew(!showNew)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all">
          <Plus size={16} /> Nova Reserva
        </button>
      </motion.div>

      {/* New booking form */}
      {showNew && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
          className="bg-card border border-primary/20 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Nova Reserva</h3>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tópico</label>
            <input value={topic} onChange={e => setTopic(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder="Ex: Revisão de trades" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Horário</label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {slots.map(s => (
                <button key={s} onClick={() => setSelectedSlot(s)}
                  className={`py-2 rounded-lg text-xs font-medium transition-all ${selectedSlot === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-primary text-primary-foreground font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all">
              Pedir Reserva
            </button>
            <button onClick={() => setShowNew(false)} className="text-sm text-muted-foreground hover:text-foreground px-4 py-2.5 rounded-xl hover:bg-secondary transition-all">
              Cancelar
            </button>
          </div>
        </motion.div>
      )}

      {/* Bookings list */}
      <motion.div variants={anim} className="space-y-2">
        {bookings.map(b => {
          const st = statusStyles[b.status];
          return (
            <div key={b.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/10 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{b.date}</span>
                  <Clock size={14} className="text-muted-foreground ml-1" />
                  <span className="text-sm text-foreground">{b.time}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase ${st.bg}`}>
                  {st.label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{b.topic}</p>
              {b.notes && <p className="text-xs text-muted-foreground/70 mt-1 italic">{b.notes}</p>}
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
