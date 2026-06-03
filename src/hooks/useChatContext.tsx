import React, { createContext, useContext, useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { chatApi } from '@/services/api';
import type { ChatMessage } from '@/types/chat';
import { useAuth } from '@/contexts/AuthContext';
import { getAiLimitPolicy } from '@/lib/access';
import type { AiLimitPolicy } from '@/types/platform';

interface ChatState {
  sessions: string[];
  currentSessionId: string | null;
  messages: ChatMessage[];
  loading: boolean;
  sendingMessage: boolean;
  error: string | null;
  sessionsLoading: boolean;
  aiPolicy: AiLimitPolicy;
  messagesUsedToday: number;
  messagesRemainingToday: number | null;
  aiLimitReached: boolean;
}

interface ChatContextValue extends ChatState {
  loadSessions: () => Promise<string[] | void>;
  selectSession: (id: string) => Promise<void>;
  createSession: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  clearError: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

const todayKey = () => new Date().toISOString().slice(0, 10);
const storageKey = (userId?: string | null) => `mm-ai-usage:${userId ?? 'visitor'}:${todayKey()}`;

function readUsage(userId?: string | null): number {
  if (typeof window === 'undefined') return 0;
  const value = Number(window.localStorage.getItem(storageKey(userId)) ?? '0');
  return Number.isFinite(value) ? value : 0;
}

function saveUsage(userId: string | null | undefined, value: number) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(storageKey(userId), String(value));
}

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
  return ctx;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<string[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [messagesUsedToday, setMessagesUsedToday] = useState(() => readUsage(user?.id));
  const initialized = useRef(false);

  const aiPolicy = useMemo(() => getAiLimitPolicy(user), [user]);
  const messagesRemainingToday = aiPolicy.dailyLimit === null ? null : Math.max(aiPolicy.dailyLimit - messagesUsedToday, 0);
  const aiLimitReached = aiPolicy.dailyLimit !== null && messagesUsedToday >= aiPolicy.dailyLimit;

  useEffect(() => {
    setMessagesUsedToday(readUsage(user?.id));
  }, [user?.id]);

  const clearError = useCallback(() => setError(null), []);

  const limitMessage = useCallback(() => {
    if (aiPolicy.dailyLimit === null) return null;
    if (aiPolicy.reason === 'signals_daily') {
      return `Limite diário atingido: ${aiPolicy.dailyLimit} mensagens. Para acesso ilimitado, adiciona Power of Three.`;
    }
    return `Limite diário atingido: ${aiPolicy.dailyLimit} mensagens. Desbloqueia acesso ilimitado com Power of Three.`;
  }, [aiPolicy]);

  const loadSessions = useCallback(async () => {
    setSessionsLoading(true);
    setError(null);
    try {
      const data = await chatApi.listSessions();
      setSessions(data.sessions || []);
      return data.sessions || [];
    } catch (e: any) {
      setError('Não foi possível carregar as sessões.');
      return [];
    } finally {
      setSessionsLoading(false);
    }
  }, []);

  const selectSession = useCallback(async (id: string) => {
    setCurrentSessionId(id);
    setMessages([]);
    setLoading(true);
    setError(null);
    try {
      const data = await chatApi.getHistory(id);
      setMessages(data.messages || []);
    } catch (e: any) {
      setError('Erro ao carregar o histórico da sessão.');
    } finally {
      setLoading(false);
    }
  }, []);

  const createSession = useCallback(async () => {
    setError(null);
    try {
      const data = await chatApi.createSession();
      const newId = data.session_id;
      setSessions(prev => [newId, ...prev]);
      setCurrentSessionId(newId);
      setMessages([]);
    } catch (e: any) {
      setError('Não foi possível criar uma nova sessão.');
    }
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!currentSessionId || !message.trim()) return;
    if (aiLimitReached) {
      setError(limitMessage() ?? 'Limite diário atingido.');
      return;
    }

    const cleanMessage = message.trim();
    const userMsg: ChatMessage = { role: 'user', content: cleanMessage };
    setMessages(prev => [...prev, userMsg]);
    setSendingMessage(true);
    setError(null);
    try {
      const data = await chatApi.sendMessage(currentSessionId, cleanMessage);
      const assistantMsg: ChatMessage = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, assistantMsg]);
      if (aiPolicy.dailyLimit !== null) {
        setMessagesUsedToday(prev => {
          const next = prev + 1;
          saveUsage(user?.id, next);
          return next;
        });
      }
    } catch (e: any) {
      setError('Erro ao enviar a mensagem. Tenta novamente.');
    } finally {
      setSendingMessage(false);
    }
  }, [currentSessionId, aiLimitReached, limitMessage, aiPolicy.dailyLimit, user?.id]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    (async () => {
      const loadedSessions = await loadSessions();
      if (loadedSessions && loadedSessions.length > 0) {
        await selectSession(loadedSessions[0]);
      }
    })();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        sessions, currentSessionId, messages, loading, sendingMessage, error, sessionsLoading,
        aiPolicy, messagesUsedToday, messagesRemainingToday, aiLimitReached,
        loadSessions, selectSession, createSession, sendMessage, clearError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
