export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatSession {
  id: string;
  label?: string;
}

export interface SessionsResponse {
  sessions: string[];
}

export interface CreateSessionResponse {
  session_id: string;
}

export interface SendMessageResponse {
  response: string;
}

export interface HistoryResponse {
  session_id: string;
  messages: ChatMessage[];
}
