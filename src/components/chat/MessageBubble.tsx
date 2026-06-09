import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import type { ChatMessage } from '@/types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
  index: number;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, index }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className={`mb-6 flex w-full gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary glow-primary-sm">
          <Bot size={17} />
        </div>
      )}
      <div className="max-w-[88%] md:max-w-[76%] lg:max-w-[68%]">
        <div className={`mb-2 flex items-center gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {isUser ? 'Trader Input' : 'MM Intelligence'}
          </span>
        </div>
        <div
          className={`whitespace-pre-wrap rounded-3xl px-4 py-3.5 text-[15px] leading-relaxed shadow-card md:px-5 ${
            isUser
              ? 'rounded-tr-md bg-primary text-primary-foreground glow-primary-sm'
              : 'terminal-panel rounded-tl-md text-card-foreground'
          }`}
        >
          {message.content}
        </div>
      </div>
      {isUser && (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-foreground">
          <User size={16} />
        </div>
      )}
    </motion.div>
  );
};
