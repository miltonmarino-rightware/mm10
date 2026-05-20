import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

export default function AuthLayout() {
  const { brand, content } = useBusinessConfig();

  return (
    <div className="theme-paper min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-primary/20 glow-primary-sm">
            <img src={brand.logo} alt={brand.logoAlt} className="w-full h-full object-cover" />
          </div>
        </Link>
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-premium">
          <Outlet />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          {content.copyright.replace('{year}', new Date().getFullYear().toString())}
        </p>
      </motion.div>
    </div>
  );
}
