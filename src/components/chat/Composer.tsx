import React, { useState, useRef, useCallback } from 'react';
import { Send } from 'lucide-react';
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
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
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
    <div className="sticky bottom-0 p-3 md:p-6 bg-gradient-to-t from-background via-background to-transparent">
      <div className="max-w-3xl mx-auto relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
          placeholder="Pergunte qualquer coisa sobre Forex..."
          className="w-full bg-card border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/30 rounded-2xl py-3.5 pl-4 md:pl-5 pr-14 text-foreground placeholder:text-muted-foreground resize-none transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed text-[15px]"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="absolute right-2.5 bottom-2.5 p-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed glow-teal-sm"
        >
          <Send size={18} />
        </motion.button>
      </div>
      <p className="text-[10px] text-center mt-2.5 text-muted-foreground/50 uppercase tracking-widest font-medium">
        Tarik Forex AI pode cometer erros. Verifique informações importantes.
      </p>
    </div>
  );
};
