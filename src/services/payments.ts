import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Payment = Database['public']['Tables']['payments']['Row'];

export const paymentService = {
  listMine: async (userId: string) => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Payment[];
  },

  create: async (payment: Database['public']['Tables']['payments']['Insert']) => {
    const { data, error } = await supabase
      .from('payments')
      .insert(payment)
      .select()
      .single();
    
    if (error) throw error;
    return data as Payment;
  }
};
