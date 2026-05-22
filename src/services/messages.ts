import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Message = Database['public']['Tables']['messages']['Row'];
type MessageInsert = Database['public']['Tables']['messages']['Insert'];

export const messageService = {
  listConversation: async (userId: string, otherUserId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data as Message[];
  },

  listGroupMessages: async (groupId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:profiles(full_name, avatar_url)')
      .eq('group_id', groupId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  send: async (message: MessageInsert) => {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select()
      .single();
    
    if (error) throw error;
    return data as Message;
  },

  markRead: async (messageId: string) => {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('id', messageId);
    
    if (error) throw error;
  },

  subscribe: (callback: (payload: any) => void, filters?: { groupId?: string, recipientId?: string }) => {
    let filterStr = '';
    if (filters?.groupId) filterStr = `group_id=eq.${filters.groupId}`;
    else if (filters?.recipientId) filterStr = `recipient_id=eq.${filters.recipientId}`;

    return supabase
      .channel('messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: filterStr
      }, callback)
      .subscribe();
  }
};
