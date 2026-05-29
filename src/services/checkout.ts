import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type Payment = Database['public']['Tables']['payments']['Row'];
type PaymentInsert = Database['public']['Tables']['payments']['Insert'];

export interface CreatePaymentArgs {
  userId: string;
  productId: string;
  planType: Database['public']['Enums']['subscription_plan'];
  amount: number;
  currency: string;
  paymentMethodId: string;
  paymentMethodKey: string;
  transactionRef?: string;
  userNotes?: string;
  proofFile?: File | null;
}

export const checkoutService = {
  uploadProof: async (userId: string, file: File): Promise<string> => {
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from('payment_proofs').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || undefined,
    });
    if (error) throw error;
    return path;
  },

  createPayment: async (args: CreatePaymentArgs): Promise<Payment> => {
    let proofPath: string | null = null;
    if (args.proofFile) {
      proofPath = await checkoutService.uploadProof(args.userId, args.proofFile);
    }
    const insert: PaymentInsert = {
      user_id: args.userId,
      amount: args.amount,
      currency: args.currency,
      status: 'pending',
      payment_method: args.paymentMethodKey,
      payment_method_id: args.paymentMethodId,
      plan_type: args.planType,
      transaction_ref: args.transactionRef ?? null,
      user_notes: args.userNotes ?? null,
      proof_file_path: proofPath,
      proof_uploaded_at: proofPath ? new Date().toISOString() : null,
    };
    const { data, error } = await supabase.from('payments').insert(insert).select().single();
    if (error) throw error;
    return data;
  },

  getPayment: async (id: string): Promise<Payment | null> => {
    const { data, error } = await supabase.from('payments').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
  },

  getProofUrl: async (path: string): Promise<string | null> => {
    const { data, error } = await supabase.storage.from('payment_proofs').createSignedUrl(path, 3600);
    if (error) return null;
    return data.signedUrl;
  },

  listMine: async (userId: string): Promise<Payment[]> => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
};
