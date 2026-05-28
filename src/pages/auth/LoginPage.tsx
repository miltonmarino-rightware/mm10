import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const { content } = useBusinessConfig();
  const c = content.auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      // Redirect handled by AuthRoute once user state hydrates
      navigate('/app');
    } catch (err) {
      setError(err instanceof Error ? err.message : c.invalidCredentials);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
      <div className="text-center mb-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Money Makers · Members
        </p>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">
          {c.loginTitle.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="font-serif-italic">{c.loginTitle.split(' ').slice(-1)}</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-2">{c.loginSubtitle}</p>
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
            {c.forgotPassword}
          </Link>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 glow-primary transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <><span>{c.loginButton}</span><ArrowRight size={16} /></>}
        </button>

        <p className="text-center text-sm text-muted-foreground pt-2">
          {c.noAccount}{' '}
          <Link to="/auth/register" className="text-primary font-medium hover:underline">
            {c.createAccountLink}
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
