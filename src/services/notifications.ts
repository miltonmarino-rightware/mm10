import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Notification = Database['public']['Tables']['notifications']['Row'];

export const notificationService = {
  list: async (userId: string) => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Notification[];
  },

  markRead: async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);
    
    if (error) throw error;
  },

  markAllRead: async (userId: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    
    if (error) throw error;
  },

  subscribe: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`notifications:${userId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      }, callback)
      .subscribe();
  }
};
