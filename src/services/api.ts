import type {
  CreateSessionResponse,
  HistoryResponse,
  SendMessageResponse,
  SessionsResponse,
} from '@/types/chat';

const BASE_URL = 'http://localhost:8080/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API Error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export const chatApi = {
  createSession: async (): Promise<CreateSessionResponse> => {
    const res = await fetch(`${BASE_URL}/chat/sessions`, { method: 'POST' });
    return handleResponse<CreateSessionResponse>(res);
  },

  listSessions: async (): Promise<SessionsResponse> => {
    const res = await fetch(`${BASE_URL}/chat/sessions`);
    return handleResponse<SessionsResponse>(res);
  },

  sendMessage: async (sessionId: string, message: string): Promise<SendMessageResponse> => {
    const res = await fetch(`${BASE_URL}/chat/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, message }),
    });
    return handleResponse<SendMessageResponse>(res);
  },

  getHistory: async (sessionId: string): Promise<HistoryResponse> => {
    const res = await fetch(`${BASE_URL}/chat/history/${sessionId}`);
    return handleResponse<HistoryResponse>(res);
  },
};
