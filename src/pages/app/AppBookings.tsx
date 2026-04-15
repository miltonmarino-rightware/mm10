import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Plus, X } from 'lucide-react';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

const weekDays = (() => {
  const days: { label: string; value: string; short: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const iso = d.toISOString().split('T')[0];
    const short = d.toLocaleDateString('pt-PT', { weekday: 'short' }).replace('.', '');
    const label = d.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'short' });
    days.push({ label, value: iso, short: `${short} ${d.getDate()}` });
  }
  return days;
})();

const allSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

const bookedSlots: Record<string, string[]> = {
  [weekDays[1]?.value]: ['10:00', '14:30'],
  [weekDays[3]?.value]: ['09:00', '11:00', '15:00'],
};

const bookings = [
  { id: '1', date: '2026-03-20', time: '10:00', status: 'approved' as const, topic: 'Revisão de trades' },
  { id: '2', date: '2026-03-25', time: '14:30', status: 'pending' as const, topic: 'Análise de setup' },
  { id: '3', date: '2026-03-10', time: '11:00', status: 'completed' as const, topic: 'Mentoria inicial' },
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
  const { brand } = useBusinessConfig();
  const [showNew, setShowNew] = useState(false);
  const [selectedDay, setSelectedDay] = useState(weekDays[0].value);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [topic, setTopic] = useState('');
  const [dayComboOpen, setDayComboOpen] = useState(false);

  const busySlots = bookedSlots[selectedDay] || [];

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }}
      className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">

      <motion.div variants={anim} className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold text-foreground text-glow-primary">Reservas</h1>
          <p className="text-sm text-muted-foreground mt-1">Agenda reuniões com o {brand.mentorName}</p>
        </div>
        <button onClick={() => setShowNew(!showNew)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all active:scale-[0.98]">
          <Plus size={16} /> Nova Reserva
        </button>
      </motion.div>

      <AnimatePresence>
        {showNew && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="bg-card border border-primary/20 rounded-2xl p-5 space-y-4 overflow-hidden">
            <h3 className="text-sm font-semibold text-foreground">Nova Reserva</h3>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tópico</label>
              <input value={topic} onChange={e => setTopic(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="Ex: Revisão de trades" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Dia</label>
              <div className="hidden sm:flex gap-2 flex-wrap">
                {weekDays.map(d => (
                  <button key={d.value} onClick={() => { setSelectedDay(d.value); setSelectedSlot(''); }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${selectedDay === d.value ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                    {d.short}
                  </button>
                ))}
              </div>
              <div className="sm:hidden relative">
                <button onClick={() => setDayComboOpen(!dayComboOpen)}
                  className="w-full h-10 px-3 rounded-xl bg-secondary border border-border text-sm text-foreground flex items-center justify-between">
                  <span>{weekDays.find(d => d.value === selectedDay)?.label}</span>
                  <svg className={`w-4 h-4 text-muted-foreground transition-transform ${dayComboOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <AnimatePresence>
                  {dayComboOpen && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                      className="absolute z-20 mt-1 w-full bg-card border border-border rounded-xl shadow-premium overflow-hidden max-h-60 overflow-y-auto">
                      {weekDays.map(d => (
                        <button key={d.value} onClick={() => { setSelectedDay(d.value); setSelectedSlot(''); setDayComboOpen(false); }}
                          className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${selectedDay === d.value ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-secondary'}`}>
                          {d.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Horário</label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {allSlots.map(s => {
                  const busy = busySlots.includes(s);
                  return (
                    <button key={s} onClick={() => !busy && setSelectedSlot(s)} disabled={busy}
                      className={`py-2 rounded-lg text-xs font-medium transition-all ${busy ? 'bg-muted/50 text-muted-foreground/40 cursor-not-allowed line-through' : selectedSlot === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'}`}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-2">
              <button disabled={!selectedSlot || !topic}
                className="bg-primary text-primary-foreground font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]">
                Pedir Reserva
              </button>
              <button onClick={() => setShowNew(false)} className="text-sm text-muted-foreground hover:text-foreground px-4 py-2.5 rounded-xl hover:bg-secondary transition-all">
                Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              {b.status === 'pending' && (
                <button className="mt-2 text-xs text-destructive hover:underline">Cancelar pedido</button>
              )}
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
