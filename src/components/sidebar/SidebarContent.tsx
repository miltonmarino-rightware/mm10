import React from 'react';
import { Plus, Settings, Info, Loader2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useChatContext } from '@/hooks/useChatContext';
import { SidebarSessionItem } from './SidebarSessionItem';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

interface SidebarContentProps {
  onNavigate?: () => void;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({ onNavigate }) => {
  const { sessions, sessionsLoading, createSession } = useChatContext();
  const location = useLocation();
  const { brand, content } = useBusinessConfig();

  const handleNewConversation = async () => {
    await createSession();
    if (location.pathname !== '/') onNavigate?.();
  };

  return (
    <div className="flex flex-col h-full p-4">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 mb-6">
        <div className="w-9 h-9 rounded-xl overflow-hidden border border-primary/20 glow-teal-sm shrink-0">
          <img src={brand.logo} alt={brand.logoAlt} className="w-full h-full object-cover" />
        </div>
        <span className="font-semibold tracking-tight text-foreground">{brand.name}</span>
      </div>

      {/* New conversation */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleNewConversation}
        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-secondary hover:bg-secondary/80 border border-border rounded-xl transition-all mb-5"
      >
        <Plus size={18} className="text-primary" />
        <span className="text-sm font-medium text-secondary-foreground">{content.nav.newConversation}</span>
      </motion.button>

      {/* Sessions */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-1">
        {sessionsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="text-muted-foreground animate-spin" />
          </div>
        ) : sessions.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-8">{content.nav.noSessions}</p>
        ) : (
          sessions.map((id, i) => (
            <SidebarSessionItem key={id} sessionId={id} index={i} />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-border space-y-1">
        <Link
          to="/settings"
          onClick={onNavigate}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
            location.pathname === '/settings'
              ? 'bg-secondary text-foreground'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          }`}
        >
          <Settings size={18} /> <span>{content.nav.settings}</span>
        </Link>
        <Link
          to="/about"
          onClick={onNavigate}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
            location.pathname === '/about'
              ? 'bg-secondary text-foreground'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          }`}
        >
          <Info size={18} /> <span>{content.nav.about}</span>
        </Link>
      </div>
    </div>
  );
};
