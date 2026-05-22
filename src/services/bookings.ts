import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Slot = Database['public']['Tables']['booking_slots']['Row'];
type Booking = Database['public']['Tables']['bookings']['Row'];

export const bookingService = {
  listSlots: async () => {
    const { data, error } = await supabase
      .from('booking_slots')
      .select('*')
      .gte('start_time', new Date().toISOString())
      .eq('state', 'available')
      .order('start_time', { ascending: true });
    
    if (error) throw error;
    return data as Slot[];
  },

  listMine: async (userId: string) => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        slot:booking_slots(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  create: async (userId: string, slotId: string, notes?: string) => {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        user_id: userId,
        slot_id: slotId,
        notes,
        status: 'reserved'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Booking;
  },

  cancel: async (bookingId: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId);
    
    if (error) throw error;
  }
};
