import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChatContext } from '@/hooks/useChatContext';

interface SidebarSessionItemProps {
  sessionId: string;
  index: number;
}

export const SidebarSessionItem: React.FC<SidebarSessionItemProps> = ({ sessionId, index }) => {
  const { currentSessionId, selectSession } = useChatContext();
  const isActive = currentSessionId === sessionId;
  const label = `Sessão ${sessionId.slice(0, 6)}`;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => selectSession(sessionId)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
        isActive
          ? 'bg-primary/10 border border-primary/20 text-foreground'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent'
      }`}
    >
      <MessageSquare
        size={16}
        className={`shrink-0 transition-colors ${isActive ? 'text-primary' : 'opacity-50 group-hover:opacity-100'}`}
      />
      <span className="truncate text-left">{label}</span>
    </motion.button>
  );
};
