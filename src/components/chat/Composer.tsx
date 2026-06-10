import React, { useState, useRef, useCallback } from 'react';
import { Send, Command } from 'lucide-react';
import { motion } from 'framer-motion';

interface ComposerProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const Composer: React.FC<ComposerProps> = ({ onSend, disabled = false }) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }, [value, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  return (
    <div className="sticky bottom-0 border-t border-white/10 bg-gradient-to-t from-background via-background/95 to-transparent p-3 backdrop-blur-xl md:p-5">
      <div className="mx-auto max-w-4xl">
        <div className="terminal-panel relative rounded-3xl p-2">
          <div className="absolute left-4 top-4 hidden items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground sm:flex">
            <Command size={13} className="text-primary" /> Command
          </div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={disabled}
            placeholder="Pergunta ao Mentor AI sobre mercado, execução, journal ou Power Of Three..."
            className="min-h-[56px] w-full resize-none rounded-2xl border border-white/10 bg-black/20 py-4 pl-4 pr-14 text-[15px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/45 focus:ring-1 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 sm:pl-32"
          />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={disabled || !value.trim()}
            className="absolute bottom-4 right-4 rounded-2xl bg-primary p-3 text-primary-foreground glow-primary-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Send size={18} />
          </motion.button>
        </div>
        <p className="mt-2.5 text-center text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
          Money Makers AI pode cometer erros. Confirma sempre contexto, risco e execução.
        </p>
      </div>
    </div>
  );
};
