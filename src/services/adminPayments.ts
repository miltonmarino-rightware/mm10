import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type Payment = Database['public']['Tables']['payments']['Row'];
export type Subscription = Database['public']['Tables']['subscriptions']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];

export interface PaymentWithUser extends Payment {
  profile?: Pick<Profile, 'id' | 'full_name' | 'email' | 'avatar_url'> | null;
}

const PLAN_DURATION_DAYS: Record<string, number> = {
  POWER_OF_THREE: 30,
  SIGNALS_ROOM: 30,
  SIGNALS_BASIC: 30,
  SIGNALS_PLATINUM: 30,
  SIGNALS_PREMIUM: 30,
  PREMIUM_ALL_ACCESS: 30,
  MENTORSHIP: 30,
};

export const adminPaymentsService = {
  list: async (status?: Database['public']['Enums']['payment_status']): Promise<Payment[]> => {
    let q = supabase.from('payments').select('*').order('created_at', { ascending: false });
    if (status) q = q.eq('status', status);
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
  },

  listWithUsers: async (status?: Database['public']['Enums']['payment_status']): Promise<PaymentWithUser[]> => {
    const payments = await adminPaymentsService.list(status);
    if (payments.length === 0) return [];
    const userIds = Array.from(new Set(payments.map(p => p.user_id)));
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name, email, avatar_url')
      .in('id', userIds);
    const map = new Map((profiles ?? []).map(p => [p.id, p]));
    return payments.map(p => ({ ...p, profile: map.get(p.user_id) ?? null }));
  },

  approve: async (paymentId: string, adminId: string, durationDaysOverride?: number): Promise<void> => {
    // 1. Load payment
    const { data: payment, error: e1 } = await supabase
      .from('payments').select('*').eq('id', paymentId).single();
    if (e1 || !payment) throw e1 ?? new Error('Payment not found');
    if (payment.status === 'paid') return;

    const planType = payment.plan_type as Database['public']['Enums']['subscription_plan'] | null;
    if (!planType) throw new Error('Payment has no plan_type');

    // 2. Mark payment paid
    const nowIso = new Date().toISOString();
    const { error: e2 } = await supabase
      .from('payments')
      .update({
        status: 'paid',
        paid_at: nowIso,
        approved_at: nowIso,
        approved_by: adminId,
        rejection_reason: null,
      })
      .eq('id', paymentId);
    if (e2) throw e2;

    // 3. Upsert subscription -> trigger activates role + group
    const days = durationDaysOverride ?? PLAN_DURATION_DAYS[planType] ?? 30;
    const startsAt = new Date();
    const expiresAt = new Date(startsAt.getTime() + days * 86400_000);

    const { data: sub, error: e3 } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: payment.user_id,
        plan_type: planType,
        status: 'active',
        starts_at: startsAt.toISOString(),
        expires_at: expiresAt.toISOString(),
        updated_at: nowIso,
      }, { onConflict: 'user_id,plan_type' })
      .select()
      .single();
    if (e3) throw e3;

    // 4. Link payment -> subscription
    if (sub) {
      await supabase.from('payments').update({ subscription_id: sub.id }).eq('id', paymentId);
    }

    // 5. Queue notification email
    await supabase.from('admin_notifications').insert({
      notification_type: 'payment_approved' as Database['public']['Enums']['notification_type'],
      recipient_email: '',
      subject: '',
      payload: { payment_id: paymentId, user_id: payment.user_id, plan_type: planType },
      related_payment_id: paymentId,
      related_user_id: payment.user_id,
    }).then(() => {}, () => {});

    // 6. Trigger notifier
    supabase.functions.invoke('send-payment-notification', {
      body: { payment_id: paymentId, kind: 'approved' },
    }).catch(() => {});
  },

  reject: async (paymentId: string, adminId: string, reason: string): Promise<void> => {
    const { data: payment, error: e1 } = await supabase
      .from('payments').select('*').eq('id', paymentId).single();
    if (e1 || !payment) throw e1 ?? new Error('Payment not found');

    const { error: e2 } = await supabase
      .from('payments')
      .update({
        status: 'failed',
        rejection_reason: reason,
        approved_by: adminId,
        approved_at: new Date().toISOString(),
      })
      .eq('id', paymentId);
    if (e2) throw e2;

    await supabase.from('admin_notifications').insert({
      notification_type: 'payment_rejected' as Database['public']['Enums']['notification_type'],
      recipient_email: '',
      subject: '',
      payload: { payment_id: paymentId, user_id: payment.user_id, reason },
      related_payment_id: paymentId,
      related_user_id: payment.user_id,
    }).then(() => {}, () => {});

    supabase.functions.invoke('send-payment-notification', {
      body: { payment_id: paymentId, kind: 'rejected', reason },
    }).catch(() => {});
  },
};

export const adminSubscriptionsService = {
  list: async (): Promise<Subscription[]> => {
    const { data, error } = await supabase
      .from('subscriptions').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
  setStatus: async (id: string, status: Database['public']['Enums']['subscription_status']) => {
    const { error } = await supabase.from('subscriptions').update({ status }).eq('id', id);
    if (error) throw error;
  },
  extend: async (id: string, days: number) => {
    const { data: sub, error: e1 } = await supabase
      .from('subscriptions').select('expires_at').eq('id', id).single();
    if (e1 || !sub) throw e1 ?? new Error('Subscription not found');
    const base = sub.expires_at ? new Date(sub.expires_at) : new Date();
    const next = new Date(Math.max(base.getTime(), Date.now()) + days * 86400_000);
    const { error } = await supabase.from('subscriptions').update({
      expires_at: next.toISOString(),
      status: 'active',
    }).eq('id', id);
    if (error) throw error;
  },
};
