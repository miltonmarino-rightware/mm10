import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/common/PageTransition';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';
import { resolveIcon } from '@/lib/icons';
import { Bot, Radar } from 'lucide-react';

interface EmptyStateProps {
  onPromptClick: (prompt: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onPromptClick }) => {
  const { content } = useBusinessConfig();
  const c = content.chat;
  const MessageSquare = resolveIcon('MessageSquare');

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl text-center">
        <FadeIn>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-primary/25 bg-primary/10 text-primary glow-primary-sm">
            <Bot size={34} />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.32em] text-primary">Money Makers Intelligence Desk</p>
          <h1 className="font-display text-3xl uppercase leading-none text-foreground text-glow-primary md:text-5xl">
            {c.emptyTitle}
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mx-auto mt-4 mb-8 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
            {c.emptySubtitle}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
            {c.prompts.map((prompt) => {
              const Icon = resolveIcon(prompt.iconKey);
              return (
                <motion.button
                  key={prompt.text}
                  whileHover={{ scale: 1.015, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onPromptClick(prompt.text)}
                  className="terminal-panel group flex items-start gap-3 rounded-3xl p-4 transition-all hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-primary">
                    <Icon size={18} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground transition-colors">
                      {prompt.text}
                    </span>
                    <p className="mt-1 text-[11px] text-muted-foreground">Executar comando com contexto MM</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <Radar size={13} className="text-primary" /> Market context active
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
