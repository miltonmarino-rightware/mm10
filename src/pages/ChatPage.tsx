import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useChatContext } from '@/hooks/useChatContext';
import { EmptyState } from '@/components/chat/EmptyState';
import { MessageList } from '@/components/chat/MessageList';
import { Composer } from '@/components/chat/Composer';
import { ErrorBanner } from '@/components/common/ErrorBanner';
import { ArrowRight, Bot, CheckCircle2, Loader2, Radar, Sparkles, Target, Zap } from 'lucide-react';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';

const quickCommands = ['Analisar EUR/USD', 'Rever meu journal', 'Criar plano de estudo', 'Oportunidades de hoje'];
const marketContext = [
  { label: 'London Session', value: 'Open' },
  { label: 'Market Bias', value: 'Bullish' },
  { label: 'Risk Mode', value: 'Controlled' },
];

const ChatPage: React.FC = () => {
  const {
    messages, currentSessionId, loading, sendingMessage, error,
    sendMessage, createSession, clearError,
    aiPolicy, messagesUsedToday, messagesRemainingToday, aiLimitReached,
  } = useChatContext();
  const { content } = useBusinessConfig();

  const handlePromptClick = async (prompt: string) => {
    if (aiLimitReached) return;
    if (!currentSessionId) await createSession();
    setTimeout(() => sendMessage(prompt), 100);
  };

  const hasMessages = messages.length > 0;
  const showEmptyState = !loading && !hasMessages && currentSessionId;
  const showWelcome = !currentSessionId && !loading;
  const isUnlimited = aiPolicy.dailyLimit === null;

  return (
    <div className="flex-1 flex min-h-0 flex-col terminal-grid">
      <div className="border-b border-white/10 bg-background/80 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-primary/10 text-primary glow-primary-sm">
              <Bot size={22} />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-primary">Money Makers Intelligence</p>
              <h1 className="font-display text-2xl uppercase tracking-tight text-foreground">AI Command Center</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              {isUnlimited ? 'Unlimited access' : `${messagesRemainingToday ?? 0} restantes hoje`}
            </span>
            <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-primary">
              {isUnlimited ? 'Power Mode' : `${messagesUsedToday}/${aiPolicy.dailyLimit} usadas`}
            </span>
            {!isUnlimited && (
              <Link to="/checkout" className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground">
                AI ilimitada <ArrowRight size={12} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {error && <ErrorBanner message={error} onRetry={clearError} onDismiss={clearError} />}
      </AnimatePresence>

      {aiLimitReached ? (
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="mm-glass w-full max-w-4xl rounded-[2rem] p-6 lg:p-8 shadow-premium">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10 text-primary">
              <Sparkles size={28} />
            </div>
            <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.3em] text-primary">Mentor AI Unlimited</p>
            <h1 className="font-display text-3xl uppercase leading-tight text-foreground lg:text-5xl">Desbloqueia o terminal completo</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              Chegaste ao limite diário. O próximo passo é transformar a AI num mentor diário, junto com Power Of Three, journal, museu e Inner Circle.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {['AI ilimitada', 'Curso Power Of Three', 'Trading Journal', 'Museu completo', 'Inner Circle', 'Plano de evolução'].map(item => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/checkout" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground glow-primary transition hover:scale-[1.01] sm:w-auto">
              Desbloquear agora <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mx-auto grid min-h-0 w-full max-w-7xl flex-1 gap-4 p-4 lg:grid-cols-[260px_1fr_280px] lg:p-6">
          <aside className="hidden min-h-0 space-y-4 lg:block">
            <div className="terminal-panel rounded-3xl p-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Strategy Context</p>
              <div className="mt-4 space-y-3">
                {marketContext.map(item => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                    <p className="text-[10px] font-mono uppercase text-muted-foreground">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="terminal-panel rounded-3xl p-4">
              <div className="flex items-center gap-2 text-primary"><Target size={16} /><span className="text-[10px] font-mono uppercase tracking-[0.22em]">Mission</span></div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Pergunta melhor. Executa melhor. Mantém disciplina.</p>
            </div>
          </aside>

          <main className="terminal-panel flex min-h-0 flex-col overflow-hidden rounded-[2rem]">
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
            <Composer onSend={sendMessage} disabled={sendingMessage || aiLimitReached || (!currentSessionId && !showWelcome)} />
          </main>

          <aside className="hidden min-h-0 space-y-4 lg:block">
            <div className="terminal-panel rounded-3xl p-4">
              <div className="mb-4 flex items-center gap-2 text-primary"><Zap size={16} /><span className="text-[10px] font-mono uppercase tracking-[0.22em]">Comandos rápidos</span></div>
              <div className="space-y-2">
                {quickCommands.map(cmd => (
                  <button key={cmd} onClick={() => handlePromptClick(cmd)} className="w-full rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3 text-left text-xs text-foreground transition hover:border-primary/30 hover:bg-primary/10">
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
            <div className="terminal-panel rounded-3xl p-4">
              <div className="flex items-center gap-2 text-primary"><Radar size={16} /><span className="text-[10px] font-mono uppercase tracking-[0.22em]">AI Usage</span></div>
              <div className="mt-5 flex items-end justify-between">
                <span className="text-4xl font-mono-num font-bold text-foreground">{isUnlimited ? '∞' : messagesRemainingToday ?? 0}</span>
                <span className="text-xs text-muted-foreground">restantes</span>
              </div>
              {!isUnlimited && <Link to="/checkout" className="mt-4 inline-flex w-full justify-center rounded-xl bg-primary px-4 py-3 text-xs font-bold text-primary-foreground">Upgrade</Link>}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
