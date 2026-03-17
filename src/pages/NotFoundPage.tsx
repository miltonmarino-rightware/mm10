import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';

const NotFoundPage: React.FC = () => (
  <div className="min-h-[100dvh] flex items-center justify-center bg-background px-4">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center max-w-md"
    >
      <div className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6 glow-teal-sm">
        <Compass className="text-primary" size={36} />
      </div>
      <h1 className="text-5xl font-bold text-foreground mb-3">404</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Esta página não foi encontrada. Parece que te perdeste no mercado.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors glow-teal-sm"
      >
        <ArrowLeft size={18} />
        Voltar ao Chat
      </Link>
    </motion.div>
  </div>
);

export default NotFoundPage;
