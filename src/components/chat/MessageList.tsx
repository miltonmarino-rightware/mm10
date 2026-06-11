import React, { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Activity, Brain, ShieldCheck } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import type { ChatMessage } from '@/types/chat';

interface MessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6 md:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
            <div className="mb-2 flex items-center gap-2 text-primary"><Activity size={14} /><span className="text-[9px] font-mono uppercase tracking-[0.18em]">Market</span></div>
            <p className="text-xs text-muted-foreground">London Open · Context active</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
            <div className="mb-2 flex items-center gap-2 text-primary"><Brain size={14} /><span className="text-[9px] font-mono uppercase tracking-[0.18em]">Memory</span></div>
            <p className="text-xs text-muted-foreground">Journal + PO3 framework</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
            <div className="mb-2 flex items-center gap-2 text-primary"><ShieldCheck size={14} /><span className="text-[9px] font-mono uppercase tracking-[0.18em]">Risk</span></div>
            <p className="text-xs text-muted-foreground">Execution discipline mode</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-black/10 px-1 py-2 md:px-3">
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} index={i} />
          ))}
          <AnimatePresence>
            {isTyping && <TypingIndicator />}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};
