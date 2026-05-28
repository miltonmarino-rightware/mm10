import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const { updatePassword, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password deve ter pelo menos 6 caracteres'); return; }
    if (password !== confirm) { setError('As passwords não coincidem'); return; }
    try {
      await updatePassword(password);
      setDone(true);
      setTimeout(() => navigate('/app'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar password');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
      {done ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={24} className="text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Password atualizada</h2>
          <p className="text-sm text-muted-foreground">A redirecionar...</p>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-foreground">Nova password</h1>
            <p className="text-sm text-muted-foreground mt-1">Define a tua nova password de acesso</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 text-sm text-destructive">{error}</div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Nova password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full h-11 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm"
                placeholder="Min. 6 caracteres" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Confirmar password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
                className="w-full h-11 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm"
                placeholder="Repete a password" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 glow-primary transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'Atualizar password'}
            </button>
            <p className="text-center text-sm text-muted-foreground">
              <Link to="/auth/login" className="text-primary hover:underline inline-flex items-center gap-1">
                <ArrowLeft size={14} /> Voltar ao login
              </Link>
            </p>
          </form>
        </>
      )}
    </motion.div>
  );
}
