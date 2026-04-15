import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/common/PageTransition';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';
import { resolveIcon } from '@/lib/icons';

interface EmptyStateProps {
  onPromptClick: (prompt: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onPromptClick }) => {
  const { content } = useBusinessConfig();
  const c = content.chat;
  const MessageSquare = resolveIcon('MessageSquare');

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        <FadeIn>
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6 glow-teal-sm">
            <MessageSquare className="text-primary" size={32} />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            {c.emptyTitle}
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-md mx-auto">
            {c.emptySubtitle}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {c.prompts.map((prompt) => {
              const Icon = resolveIcon(prompt.iconKey);
              return (
                <motion.button
                  key={prompt.text}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onPromptClick(prompt.text)}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-surface-raised transition-all group flex items-start gap-3"
                >
                  <Icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors mt-0.5 shrink-0" />
                  <span className="text-sm font-medium text-secondary-foreground group-hover:text-foreground transition-colors">
                    {prompt.text}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
