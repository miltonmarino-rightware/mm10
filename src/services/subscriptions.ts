import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

export const subscriptionService = {
  getCurrent: async (userId: string) => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .maybeSingle();
    
    if (error) throw error;
    return data as Subscription;
  },

  getHistory: async (userId: string) => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Subscription[];
  },

  createManual: async (userId: string, plan: Database['public']['Enums']['subscription_plan']) => {
    const startsAt = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(startsAt.getDate() + 30);

    const { data, error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        plan_type: plan,
        status: 'active',
        starts_at: startsAt.toISOString(),
        expires_at: expiresAt.toISOString()
      }, { onConflict: 'user_id,plan_type' })
      .select()
      .single();
    
    if (error) throw error;
    return data as Subscription;
  }
};
