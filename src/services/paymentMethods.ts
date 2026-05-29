import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type PaymentMethod = Database['public']['Tables']['payment_methods_config']['Row'];
export type PaymentMethodInsert = Database['public']['Tables']['payment_methods_config']['Insert'];
export type PaymentMethodUpdate = Database['public']['Tables']['payment_methods_config']['Update'];

export const paymentMethodService = {
  listActive: async (): Promise<PaymentMethod[]> => {
    const { data, error } = await supabase
      .from('payment_methods_config')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data ?? [];
  },
  listAll: async (): Promise<PaymentMethod[]> => {
    const { data, error } = await supabase
      .from('payment_methods_config')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data ?? [];
  },
  upsert: async (m: PaymentMethodInsert): Promise<PaymentMethod> => {
    const { data, error } = await supabase.from('payment_methods_config').upsert(m).select().single();
    if (error) throw error;
    return data;
  },
  update: async (id: string, m: PaymentMethodUpdate): Promise<PaymentMethod> => {
    const { data, error } = await supabase.from('payment_methods_config').update(m).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from('payment_methods_config').delete().eq('id', id);
    if (error) throw error;
  },
};
