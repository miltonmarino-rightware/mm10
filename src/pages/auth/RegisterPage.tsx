import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const { content } = useBusinessConfig();
  const c = content.auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError(c.passwordMinLength); return; }
    try {
      await register(name, email, password);
      navigate('/app');
    } catch {
      setError(c.registerError);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-foreground">{c.registerTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">{c.registerSubtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 text-sm text-destructive">{error}</div>
        )}

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Nome</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required
            className="w-full h-11 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm"
            placeholder="O teu nome" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full h-11 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm"
            placeholder="nome@email.com" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
            className="w-full h-11 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm"
            placeholder="Min. 6 caracteres" />
        </div>

        <button type="submit" disabled={loading}
          className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 glow-primary transition-all disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <Loader2 size={18} className="animate-spin" /> : <><span>{c.registerButton}</span><ArrowRight size={16} /></>}
        </button>

        <p className="text-center text-sm text-muted-foreground pt-2">
          {c.hasAccount}{' '}<Link to="/auth/login" className="text-primary font-medium hover:underline">{c.loginLink}</Link>
        </p>
      </form>
    </motion.div>
  );
}
