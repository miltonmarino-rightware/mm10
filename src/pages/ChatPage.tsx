import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useChatContext } from '@/hooks/useChatContext';
import { EmptyState } from '@/components/chat/EmptyState';
import { MessageList } from '@/components/chat/MessageList';
import { Composer } from '@/components/chat/Composer';
import { ErrorBanner } from '@/components/common/ErrorBanner';
import { ArrowRight, Bot, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

const ChatPage: React.FC = () => {
  const {
    messages, currentSessionId, loading, sendingMessage, error,
    sendMessage, createSession, clearError,
    aiPolicy, messagesUsedToday, messagesRemainingToday, aiLimitReached,
  } = useChatContext();
  const { content } = useBusinessConfig();

  const handlePromptClick = async (prompt: string) => {
    if (aiLimitReached) return;
    if (!currentSessionId) {
      await createSession();
    }
    setTimeout(() => sendMessage(prompt), 100);
  };

  const hasMessages = messages.length > 0;
  const showEmptyState = !loading && !hasMessages && currentSessionId;
  const showWelcome = !currentSessionId && !loading;
  const isUnlimited = aiPolicy.dailyLimit === null;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Bot size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Mentor AI</p>
              <p className="text-xs text-muted-foreground">
                {isUnlimited ? 'Acesso ilimitado ativo' : `${messagesRemainingToday ?? 0} mensagens restantes hoje`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-primary">
              {isUnlimited ? 'Unlimited' : `${messagesUsedToday}/${aiPolicy.dailyLimit} usadas`}
            </span>
            {!isUnlimited && (
              <Link to="/checkout" className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                AI ilimitada <ArrowRight size={12} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <ErrorBanner message={error} onRetry={clearError} onDismiss={clearError} />
        )}
      </AnimatePresence>

      {aiLimitReached ? (
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-3xl rounded-3xl border border-primary/25 bg-card/85 p-6 lg:p-8 shadow-2xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
              <Sparkles size={24} />
            </div>
            <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.28em] text-primary">Mentor AI Unlimited</p>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">Desbloqueia AI ilimitada com Power Of Three</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Chegaste ao limite diário. O próximo passo é transformar a AI num mentor diário, junto com o curso, journal, museu e turma oficial.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {['AI ilimitada', 'Curso Power Of Three', 'Trading Journal', 'Museu completo', 'Turma oficial', 'Plano de evolução'].map(item => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-border bg-background/30 p-3">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/checkout" className="mt-7 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.01]">
              Desbloquear agora <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ) : loading ? (
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
        disabled={sendingMessage || aiLimitReached || (!currentSessionId && !showWelcome)}
      />
    </div>
  );
};

export default ChatPage;
