import React from 'react';
import { ChatProvider } from '@/hooks/useChatContext';
import ChatPage from '@/pages/ChatPage';

export default function AppChat() {
  return (
    <ChatProvider>
      <div className="flex-1 flex flex-col h-[calc(100dvh-3.5rem)]">
        <ChatPage />
      </div>
    </ChatProvider>
  );
}
