import React from 'react';
import { motion } from 'framer-motion';
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
      className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[88%] md:max-w-[75%] lg:max-w-[65%]`}>
        <div
          className={`px-4 md:px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-tr-sm'
              : 'bg-card border border-border text-card-foreground rounded-tl-sm'
          }`}
        >
          {message.content}
        </div>
      </div>
    </motion.div>
  );
};
