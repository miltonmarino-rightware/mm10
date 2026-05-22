import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type AISession = Database['public']['Tables']['ai_sessions']['Row'];
type AIMessage = Database['public']['Tables']['ai_messages']['Row'];

export const aiService = {
  listSessions: async (userId: string) => {
    const { data, error } = await supabase
      .from('ai_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data as AISession[];
  },

  getSessionMessages: async (sessionId: string) => {
    const { data, error } = await supabase
      .from('ai_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data as AIMessage[];
  },

  sendMessage: async (message: string, sessionId?: string) => {
    const { data, error } = await supabase.functions.invoke('chat-ai', {
      body: { message, sessionId }
    });

    if (error) throw error;
    return data as { reply: string, sessionId: string };
  },

  getUsage: async (userId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('ai_usage')
      .select('*')
      .eq('user_id', userId)
      .eq('usage_date', today)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
};
