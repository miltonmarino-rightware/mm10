import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Eye, Loader2, RefreshCw } from 'lucide-react';
import { adminPaymentsService, type PaymentWithUser } from '@/services/adminPayments';
import { checkoutService } from '@/services/checkout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const STATUS_TABS = [
  { key: 'pending', label: 'Pendentes' },
  { key: 'paid', label: 'Aprovados' },
  { key: 'failed', label: 'Rejeitados' },
  { key: 'all', label: 'Todos' },
] as const;
type StatusKey = typeof STATUS_TABS[number]['key'];

export default function AdminPayments() {
  const { user } = useAuth();
  const [tab, setTab] = useState<StatusKey>('pending');
  const [items, setItems] = useState<PaymentWithUser[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState<PaymentWithUser | null>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await adminPaymentsService.listWithUsers(
        tab === 'all' ? undefined : (tab as 'pending' | 'paid' | 'failed')
      );
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro');
    }
  }, [tab]);

  useEffect(() => { setItems(null); load(); }, [load]);

  useEffect(() => {
    if (channelRef.current) supabase.removeChannel(channelRef.current);
    const ch = supabase.channel('admin-payments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'payments' }, () => load())
      .subscribe();
    channelRef.current = ch;
    return () => { if (channelRef.current) supabase.removeChannel(channelRef.current); };
  }, [load]);

  const approve = async (p: PaymentWithUser) => {
    if (!user) return;
    setBusyId(p.id);
    try { await adminPaymentsService.approve(p.id, user.id); }
    catch (e) { setError(e instanceof Error ? e.message : 'Erro a aprovar'); }
    finally { setBusyId(null); }
  };

  const reject = async (p: PaymentWithUser, reason: string) => {
    if (!user) return;
    setBusyId(p.id);
    try { await adminPaymentsService.reject(p.id, user.id, reason); setReviewing(null); }
    catch (e) { setError(e instanceof Error ? e.message : 'Erro a rejeitar'); }
    finally { setBusyId(null); }
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <header className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Operações</p>
          <h1 className="text-2xl font-semibold tracking-tight">Pagamentos</h1>
        </div>
        <button onClick={load} className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary inline-flex items-center gap-1">
          <RefreshCw size={12} /> Atualizar
        </button>
      </header>

      <div className="flex gap-1 mb-5 border-b border-border">
        {STATUS_TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 -mb-px ${
              tab === t.key ? 'text-primary border-primary' : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}>{t.label}</button>
        ))}
      </div>

      {error && <div className="mb-4 text-sm text-destructive">{error}</div>}

      {!items ? (
        <div className="space-y-2">{[0,1,2].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}</div>
      ) : items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-2">
          {items.map(p => (
            <PaymentRow key={p.id} p={p}
              onApprove={() => approve(p)}
              onReject={() => setReviewing(p)}
              onView={() => setReviewing(p)}
              busy={busyId === p.id} />
          ))}
        </div>
      )}

      {reviewing && (
        <ReviewDrawer payment={reviewing} onClose={() => setReviewing(null)}
          onApprove={() => approve(reviewing)}
          onReject={(reason) => reject(reviewing, reason)}
          busy={busyId === reviewing.id} />
      )}
    </div>
  );
}

function PaymentRow({ p, onApprove, onReject, onView, busy }: {
  p: PaymentWithUser; onApprove: () => void; onReject: () => void; onView: () => void; busy: boolean;
}) {
  const statusColor: Record<string, string> = {
    pending: 'bg-warning/15 text-warning',
    paid: 'bg-primary/15 text-primary',
    failed: 'bg-destructive/15 text-destructive',
    cancelled: 'bg-muted text-muted-foreground',
  };
  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-4 flex flex-wrap items-center gap-4 hover:border-primary/30 transition-colors">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-foreground truncate">{p.profile?.full_name ?? p.profile?.email ?? p.user_id.slice(0, 8)}</span>
          <Badge className={statusColor[p.status] ?? 'bg-muted'}>{p.status}</Badge>
          {p.plan_type && <span className="text-[10px] font-mono uppercase text-muted-foreground">{p.plan_type}</span>}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {p.profile?.email} · {new Date(p.created_at).toLocaleString('pt-PT')}
        </p>
      </div>
      <div className="text-right">
        <p className="font-mono-num font-semibold text-foreground">{p.amount} {p.currency}</p>
        <p className="text-[10px] font-mono uppercase text-muted-foreground">{p.payment_method ?? '—'}</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onView} className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30">
          <Eye size={14} />
        </button>
        {p.status === 'pending' && (
          <>
            <button disabled={busy} onClick={onApprove}
              className="h-9 px-3 inline-flex items-center gap-1 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 disabled:opacity-50">
              {busy ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} Aprovar
            </button>
            <button disabled={busy} onClick={onReject}
              className="h-9 px-3 inline-flex items-center gap-1 rounded-lg border border-destructive/40 text-destructive text-xs font-semibold hover:bg-destructive/10 disabled:opacity-50">
              <X size={12} /> Rejeitar
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function ReviewDrawer({ payment, onClose, onApprove, onReject, busy }: {
  payment: PaymentWithUser; onClose: () => void;
  onApprove: () => void; onReject: (reason: string) => void; busy: boolean;
}) {
  const [reason, setReason] = useState('');
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  useEffect(() => {
    if (payment.proof_file_path) {
      checkoutService.getProofUrl(payment.proof_file_path).then(setProofUrl);
    }
  }, [payment.proof_file_path]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-1">Revisar pagamento</h3>
        <p className="text-xs text-muted-foreground mb-4">{payment.profile?.email}</p>
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <KV label="Valor" v={`${payment.amount} ${payment.currency}`} />
          <KV label="Método" v={payment.payment_method ?? '—'} />
          <KV label="Plano" v={payment.plan_type ?? '—'} />
          <KV label="Estado" v={payment.status} />
          <KV label="Referência" v={payment.transaction_ref ?? '—'} />
          <KV label="Data" v={new Date(payment.created_at).toLocaleString('pt-PT')} />
        </div>
        {payment.user_notes && (
          <div className="mb-4 text-sm">
            <p className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Notas do utilizador</p>
            <p className="text-foreground/90 italic">"{payment.user_notes}"</p>
          </div>
        )}
        {payment.proof_file_path && (
          <div className="mb-4">
            <p className="text-[10px] font-mono uppercase text-muted-foreground mb-2">Comprovativo</p>
            {proofUrl ? (
              <a href={proofUrl} target="_blank" rel="noreferrer" className="block">
                <img src={proofUrl} alt="proof" className="max-h-64 w-full object-contain rounded-lg border border-border bg-input" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <span className="text-xs text-primary hover:underline mt-2 inline-block">Abrir em nova aba ↗</span>
              </a>
            ) : <Skeleton className="h-32 rounded-lg" />}
          </div>
        )}

        {payment.status === 'pending' && (
          <>
            <label className="block mb-4">
              <span className="text-xs text-muted-foreground">Motivo (apenas em caso de rejeição)</span>
              <textarea value={reason} onChange={e => setReason(e.target.value)} rows={2}
                className="mt-1 w-full px-3 py-2 rounded-xl bg-input border border-border text-foreground text-sm" />
            </label>
            <div className="flex gap-2 flex-wrap">
              <button disabled={busy} onClick={onApprove}
                className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50">
                {busy ? 'A processar…' : 'Aprovar'}
              </button>
              <button disabled={busy || !reason.trim()} onClick={() => onReject(reason.trim())}
                className="flex-1 h-11 rounded-xl border border-destructive/40 text-destructive text-sm font-semibold hover:bg-destructive/10 disabled:opacity-50">
                Rejeitar
              </button>
            </div>
          </>
        )}
        {payment.rejection_reason && (
          <div className="mt-3 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            <strong>Rejeitado:</strong> {payment.rejection_reason}
          </div>
        )}
        <button onClick={onClose} className="mt-4 w-full text-xs text-muted-foreground hover:text-foreground">Fechar</button>
      </motion.div>
    </div>
  );
}

function KV({ label, v }: { label: string; v: string }) {
  return (
    <div>
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-foreground mt-0.5">{v}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 bg-card border border-dashed border-border rounded-2xl">
      <p className="text-sm text-muted-foreground">Sem pagamentos nesta vista.</p>
    </div>
  );
}
