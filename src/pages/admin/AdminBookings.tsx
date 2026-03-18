import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Check, X, Ban, RotateCcw } from 'lucide-react';

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

const initialBookings: { id: string; studentName: string; date: string; time: string; status: string; topic: string }[] = [
  { id: '1', studentName: 'João Silva', date: weekDays[2]?.value || '2026-03-20', time: '10:00', status: 'pending' as const, topic: 'Revisão de trades' },
  { id: '2', studentName: 'Ana Costa', date: weekDays[3]?.value || '2026-03-21', time: '14:30', status: 'pending' as const, topic: 'Análise de setup' },
  { id: '3', studentName: 'Miguel Santos', date: weekDays[0]?.value || '2026-03-18', time: '11:00', status: 'approved' as const, topic: 'Mentoria avançada' },
  { id: '4', studentName: 'Sofia Pereira', date: weekDays[1]?.value || '2026-03-19', time: '09:30', status: 'completed' as const, topic: 'Introdução' },
];

const blockedSlots: Record<string, string[]> = {};

const statusStyles: Record<string, { bg: string; label: string }> = {
  pending: { bg: 'bg-warning/10 text-warning', label: 'Pendente' },
  approved: { bg: 'bg-primary/10 text-primary', label: 'Aprovado' },
  rejected: { bg: 'bg-destructive/10 text-destructive', label: 'Recusado' },
  completed: { bg: 'bg-muted text-muted-foreground', label: 'Concluído' },
  'no-show': { bg: 'bg-destructive/10 text-destructive', label: 'No-show' },
  cancelled: { bg: 'bg-muted text-muted-foreground', label: 'Cancelado' },
};

const anim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AdminBookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedDay, setSelectedDay] = useState(weekDays[0].value);
  const [blocked, setBlocked] = useState<Record<string, string[]>>(blockedSlots);
  const [dayComboOpen, setDayComboOpen] = useState(false);

  const dayBookings = bookings.filter(b => b.date === selectedDay);
  const dayBlocked = blocked[selectedDay] || [];

  const bookedTimes = dayBookings.filter(b => b.status !== 'rejected' && b.status !== 'cancelled').map(b => b.time);

  const updateStatus = (id: string, status: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: status as any } : b));
  };

  const toggleBlock = (slot: string) => {
    setBlocked(prev => {
      const current = prev[selectedDay] || [];
      return { ...prev, [selectedDay]: current.includes(slot) ? current.filter(s => s !== slot) : [...current, slot] };
    });
  };

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <motion.div variants={anim} className="text-center">
        <h1 className="text-2xl font-bold text-foreground text-glow-primary">Reservas</h1>
        <p className="text-sm text-muted-foreground mt-1">Gere pedidos de reunião dos alunos</p>
      </motion.div>

      {/* Day selector */}
      <motion.div variants={anim}>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">Próximos 7 dias</label>
        <div className="hidden sm:flex gap-2 flex-wrap">
          {weekDays.map(d => (
            <button key={d.value} onClick={() => setSelectedDay(d.value)}
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
                  <button key={d.value} onClick={() => { setSelectedDay(d.value); setDayComboOpen(false); }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${selectedDay === d.value ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-secondary'}`}>
                    {d.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Slots grid */}
      <motion.div variants={anim}>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">Horários do dia (clica para bloquear/desbloquear)</label>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {allSlots.map(s => {
            const isBooked = bookedTimes.includes(s);
            const isBlocked = dayBlocked.includes(s);
            return (
              <button key={s} onClick={() => !isBooked && toggleBlock(s)}
                className={`py-2 rounded-lg text-xs font-medium transition-all ${isBlocked ? 'bg-destructive/15 text-destructive line-through' : isBooked ? 'bg-primary/15 text-primary cursor-default' : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'}`}>
                {s}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Bookings for selected day */}
      <motion.div variants={anim} className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Pedidos para {weekDays.find(d => d.value === selectedDay)?.label}</h3>
        {dayBookings.length === 0 && <p className="text-xs text-muted-foreground py-4 text-center">Sem pedidos para este dia</p>}
        {dayBookings.map(b => {
          const st = statusStyles[b.status];
          return (
            <div key={b.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/10 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold">{b.studentName[0]}</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{b.studentName}</p>
                    <p className="text-xs text-muted-foreground">{b.topic}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase ${st.bg}`}>{st.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar size={12} />{b.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{b.time}</span>
                </div>
                {b.status === 'pending' && (
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateStatus(b.id, 'approved')} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors" title="Aprovar"><Check size={14} /></button>
                    <button onClick={() => updateStatus(b.id, 'rejected')} className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors" title="Recusar"><X size={14} /></button>
                  </div>
                )}
                {b.status === 'approved' && (
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateStatus(b.id, 'completed')} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-[10px] font-medium px-2" title="Concluir">Concluir</button>
                    <button onClick={() => updateStatus(b.id, 'no-show')} className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors" title="No-show"><Ban size={14} /></button>
                    <button onClick={() => updateStatus(b.id, 'cancelled')} className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors" title="Cancelar"><RotateCcw size={14} /></button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* All bookings */}
      <motion.div variants={anim} className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Todos os Pedidos</h3>
        {bookings.filter(b => b.date !== selectedDay).map(b => {
          const st = statusStyles[b.status];
          return (
            <div key={b.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/10 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold">{b.studentName[0]}</div>
                  <div><p className="text-sm font-semibold text-foreground">{b.studentName}</p><p className="text-xs text-muted-foreground">{b.topic} · {b.date} {b.time}</p></div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase ${st.bg}`}>{st.label}</span>
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
