import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Signal = Database['public']['Tables']['signals']['Row'];
type SignalInsert = Database['public']['Tables']['signals']['Insert'];
type SignalUpdate = Database['public']['Tables']['signals']['Update'];

export const signalService = {
  list: async (filters?: { state?: Signal['state'] }) => {
    let query = supabase
      .from('signals')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (filters?.state) {
      query = query.eq('state', filters.state);
    } else {
      query = query.neq('state', 'draft');
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Signal[];
  },

  get: async (id: string) => {
    const { data, error } = await supabase
      .from('signals')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Signal;
  },

  create: async (signal: SignalInsert) => {
    const { data, error } = await supabase
      .from('signals')
      .insert(signal)
      .select()
      .single();
    
    if (error) throw error;
    return data as Signal;
  },

  update: async (id: string, updates: SignalUpdate) => {
    const { data, error } = await supabase
      .from('signals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Signal;
  },

  markRead: async (userId: string, signalId: string) => {
    const { error } = await supabase
      .from('signal_reads')
      .upsert({ user_id: userId, signal_id: signalId }, { onConflict: 'user_id,signal_id' });
    
    if (error) throw error;
  }
};
