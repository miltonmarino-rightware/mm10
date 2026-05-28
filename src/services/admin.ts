import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

export const adminService = {
  listStudents: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        subscriptions(*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  promoteUser: async (userId: string, role: Database['public']['Enums']['user_role']) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  getDashboardStats: async () => {
    // This would ideally be an RPC for efficiency
    const { count: studentCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    const { count: activeSubs } = await supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active');
    const { data: recentPayments } = await supabase.from('payments').select('*').order('created_at', { ascending: false }).limit(5);

    return {
      studentCount,
      activeSubs,
      recentPayments
    };
  },

  confirmPayment: async (paymentId: string) => {
    const { data: payment, error: pError } = await supabase
      .from('payments')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('id', paymentId)
      .select()
      .single();

    if (pError || !payment) throw pError ?? new Error('Payment not found');

    // If payment is linked to a subscription, activate it
    if (payment.subscription_id) {
      const startsAt = new Date();
      const expiresAt = new Date();
      expiresAt.setDate(startsAt.getDate() + 30);

      await supabase
        .from('subscriptions')
        .update({ 
          status: 'active', 
          starts_at: startsAt.toISOString(), 
          expires_at: expiresAt.toISOString() 
        })
        .eq('id', payment.subscription_id);
    }

    return payment;
  }
};
