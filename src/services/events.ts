import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Event = Database['public']['Tables']['events']['Row'];

export const eventService = {
  list: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_time', { ascending: true });
    
    if (error) throw error;
    return data as Event[];
  },

  join: async (userId: string, eventId: string) => {
    const { error } = await supabase
      .from('event_participants')
      .insert({ user_id: userId, event_id: eventId });
    
    if (error) throw error;
  },

  create: async (event: Database['public']['Tables']['events']['Insert']) => {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();
    
    if (error) throw error;
    return data as Event;
  }
};
