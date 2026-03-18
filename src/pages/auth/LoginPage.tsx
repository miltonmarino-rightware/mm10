import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('tarik')) {
        navigate('/admin');
      } else {
        navigate('/app');
      }
    } catch {
      setError('Credenciais inválidas. Tenta novamente.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-foreground">Bem-vindo de volta</h1>
        <p className="text-sm text-muted-foreground mt-1">Entra na tua conta Tarik Forex AI</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full h-11 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm"
            placeholder="nome@email.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)} required
            className="w-full h-11 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm"
            placeholder="••••••••"
          />
        </div>

        <div className="flex justify-end">
          <Link to="/auth/reset-password" className="text-xs text-primary hover:underline">
            Esqueceste a password?
          </Link>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 glow-primary transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <><span>Entrar</span><ArrowRight size={16} /></>}
        </button>

        <p className="text-center text-sm text-muted-foreground pt-2">
          Não tens conta?{' '}
          <Link to="/auth/register" className="text-primary font-medium hover:underline">
            Criar conta
          </Link>
        </p>
      </form>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-[11px] text-muted-foreground text-center">
          Demo: usa <span className="text-foreground font-medium">admin@tarik.com</span> para admin ou qualquer email para cliente
        </p>
      </div>
    </motion.div>
  );
}
