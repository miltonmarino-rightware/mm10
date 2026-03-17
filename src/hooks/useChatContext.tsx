import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { chatApi } from '@/services/api';
import type { ChatMessage } from '@/types/chat';

interface ChatState {
  sessions: string[];
  currentSessionId: string | null;
  messages: ChatMessage[];
  loading: boolean;
  sendingMessage: boolean;
  error: string | null;
  sessionsLoading: boolean;
}

interface ChatContextValue extends ChatState {
  loadSessions: () => Promise<void>;
  selectSession: (id: string) => Promise<void>;
  createSession: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  clearError: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
  return ctx;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<string[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const initialized = useRef(false);

  const clearError = useCallback(() => setError(null), []);

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
    const userMsg: ChatMessage = { role: 'user', content: message.trim() };
    setMessages(prev => [...prev, userMsg]);
    setSendingMessage(true);
    setError(null);
    try {
      const data = await chatApi.sendMessage(currentSessionId, message.trim());
      const assistantMsg: ChatMessage = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e: any) {
      setError('Erro ao enviar a mensagem. Tenta novamente.');
    } finally {
      setSendingMessage(false);
    }
  }, [currentSessionId]);

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
        loadSessions, selectSession, createSession, sendMessage, clearError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
