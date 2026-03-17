import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onRetry, onDismiss }) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    className="mx-4 mb-4 px-4 py-3 rounded-xl bg-warning/10 border border-warning/20 flex items-center gap-3"
  >
    <AlertTriangle size={18} className="text-warning shrink-0" />
    <p className="text-sm text-warning flex-1">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="p-1.5 rounded-lg hover:bg-warning/10 text-warning transition-colors"
      >
        <RefreshCw size={16} />
      </button>
    )}
    {onDismiss && (
      <button
        onClick={onDismiss}
        className="text-xs text-warning/70 hover:text-warning transition-colors"
      >
        Fechar
      </button>
    )}
  </motion.div>
);
