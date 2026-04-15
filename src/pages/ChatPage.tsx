import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useChatContext } from '@/hooks/useChatContext';
import { EmptyState } from '@/components/chat/EmptyState';
import { MessageList } from '@/components/chat/MessageList';
import { Composer } from '@/components/chat/Composer';
import { ErrorBanner } from '@/components/common/ErrorBanner';
import { Loader2 } from 'lucide-react';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

const ChatPage: React.FC = () => {
  const {
    messages, currentSessionId, loading, sendingMessage, error,
    sendMessage, createSession, clearError,
  } = useChatContext();
  const { content } = useBusinessConfig();

  const handlePromptClick = async (prompt: string) => {
    if (!currentSessionId) {
      await createSession();
    }
    setTimeout(() => sendMessage(prompt), 100);
  };

  const hasMessages = messages.length > 0;
  const showEmptyState = !loading && !hasMessages && currentSessionId;
  const showWelcome = !currentSessionId && !loading;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AnimatePresence>
        {error && (
          <ErrorBanner message={error} onRetry={clearError} onDismiss={clearError} />
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={24} className="text-primary animate-spin" />
            <span className="text-sm text-muted-foreground">{content.chat.loadingMessage}</span>
          </div>
        </div>
      ) : showWelcome || showEmptyState ? (
        <EmptyState onPromptClick={handlePromptClick} />
      ) : (
        <MessageList messages={messages} isTyping={sendingMessage} />
      )}

      <Composer
        onSend={sendMessage}
        disabled={sendingMessage || (!currentSessionId && !showWelcome)}
      />
    </div>
  );
};

export default ChatPage;
