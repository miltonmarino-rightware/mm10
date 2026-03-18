import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { resetPassword, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPassword(email);
    setSent(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
      {sent ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Email enviado</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Se o email existir na nossa base de dados, receberás instruções para redefinir a password.
          </p>
          <Link to="/auth/login" className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1">
            <ArrowLeft size={14} /> Voltar ao login
          </Link>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-foreground">Recuperar password</h1>
            <p className="text-sm text-muted-foreground mt-1">Indica o teu email para receber instruções</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full h-11 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm"
                placeholder="nome@email.com" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 glow-primary transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'Enviar instruções'}
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
