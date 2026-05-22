import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Broadcast = Database['public']['Tables']['broadcasts']['Row'];

export const broadcastService = {
  list: async () => {
    const { data, error } = await supabase
      .from('broadcasts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Broadcast[];
  },

  markRead: async (userId: string, broadcastId: string) => {
    const { error } = await supabase
      .from('broadcast_reads')
      .upsert({ user_id: userId, broadcast_id: broadcastId }, { onConflict: 'user_id,broadcast_id' });
    
    if (error) throw error;
  },

  create: async (broadcast: Database['public']['Tables']['broadcasts']['Insert']) => {
    const { data, error } = await supabase
      .from('broadcasts')
      .insert(broadcast)
      .select()
      .single();
    
    if (error) throw error;
    return data as Broadcast;
  }
};
