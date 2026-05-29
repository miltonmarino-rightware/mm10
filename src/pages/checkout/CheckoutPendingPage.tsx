import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { checkoutService, type Payment } from '@/services/checkout';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function CheckoutPendingPage() {
  const { paymentId } = useParams<{ paymentId: string }>();
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!paymentId) return;
    let mounted = true;

    const load = async () => {
      const p = await checkoutService.getPayment(paymentId);
      if (!mounted) return;
      setPayment(p);
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel(`payment:${paymentId}`)
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'payments', filter: `id=eq.${paymentId}` },
        (msg) => {
          const next = msg.new as Payment;
          setPayment(next);
          if (next.status === 'paid') refresh();
        }
      )
      .subscribe();
    channelRef.current = channel;

    return () => {
      mounted = false;
      if (channelRef.current) supabase.removeChannel(channelRef.current);
    };
  }, [paymentId, refresh]);

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center p-4">
        <Skeleton className="h-64 w-full max-w-md rounded-2xl" />
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-muted-foreground">Pagamento não encontrado.</p>
          <Link to="/checkout" className="text-primary text-sm mt-4 inline-block">Voltar</Link>
        </div>
      </div>
    );
  }

  const isPaid = payment.status === 'paid';
  const isFailed = payment.status === 'failed' || payment.status === 'cancelled';
  const isPending = payment.status === 'pending';

  return (
    <div className="min-h-[100dvh] bg-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border rounded-2xl p-8 text-center">

        {isPending && (
          <>
            <div className="relative w-20 h-20 mx-auto mb-5">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary" />
              <Clock size={32} className="text-primary absolute inset-0 m-auto" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">A aguardar aprovação</h1>
            <p className="text-sm text-muted-foreground mt-3">
              O teu pagamento foi registado e está em revisão. Esta página atualiza-se automaticamente.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-primary">
              <Loader2 size={12} className="animate-spin" /> A monitorizar em tempo real
            </div>
          </>
        )}

        {isPaid && (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
              className="w-20 h-20 mx-auto mb-5 rounded-full bg-primary/15 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-primary" />
            </motion.div>
            <h1 className="text-2xl font-semibold text-foreground">Pagamento aprovado</h1>
            <p className="text-sm text-muted-foreground mt-3">
              A tua subscrição está ativa. Bem-vindo à plataforma.
            </p>
            <button onClick={() => navigate('/app')}
              className="mt-6 h-11 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
              Entrar na plataforma
            </button>
          </>
        )}

        {isFailed && (
          <>
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-destructive/15 flex items-center justify-center">
              <XCircle size={40} className="text-destructive" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Pagamento rejeitado</h1>
            {payment.rejection_reason && (
              <p className="text-sm text-muted-foreground mt-3 italic">"{payment.rejection_reason}"</p>
            )}
            <p className="text-sm text-muted-foreground mt-3">Podes tentar de novo ou contactar o suporte.</p>
            <button onClick={() => navigate('/checkout')}
              className="mt-6 h-11 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
              Tentar novamente
            </button>
          </>
        )}

        <div className="mt-6 pt-6 border-t border-border text-left space-y-2 text-xs">
          <Row label="Valor" value={`${payment.amount} ${payment.currency}`} mono />
          {payment.plan_type && <Row label="Plano" value={payment.plan_type} mono />}
          {payment.transaction_ref && <Row label="Referência" value={payment.transaction_ref} mono />}
          <Row label="Estado" value={payment.status} mono />
        </div>
      </motion.div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-muted-foreground uppercase tracking-wider font-mono text-[10px]">{label}</span>
      <span className={`text-foreground ${mono ? 'font-mono-num' : ''}`}>{value}</span>
    </div>
  );
}
