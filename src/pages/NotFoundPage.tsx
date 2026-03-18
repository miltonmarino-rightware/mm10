import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[100dvh] bg-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        <div className="text-8xl font-extrabold text-primary/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Página não encontrada</h1>
        <p className="text-muted-foreground text-sm mb-8">A página que procuras não existe ou foi movida.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 glow-primary-sm transition-all text-sm">
            <Home size={16} /> Ir para o início
          </Link>
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-medium px-6 py-3 rounded-xl hover:bg-secondary/80 border border-border transition-all text-sm">
            <ArrowLeft size={16} /> Voltar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
