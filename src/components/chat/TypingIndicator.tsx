import React from 'react';

export const TypingIndicator: React.FC = () => (
  <div className="flex items-start mb-8">
    <div className="px-5 py-4 rounded-2xl rounded-tl-none bg-card border border-border">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground mr-1">Tarik está a analisar</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-typing-dot-1" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-typing-dot-2" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-typing-dot-3" />
      </div>
    </div>
  </div>
);
