import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Loader2, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { productService, type Product } from '@/services/products';
import { paymentMethodService, type PaymentMethod } from '@/services/paymentMethods';
import { checkoutService } from '@/services/checkout';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorBanner from '@/components/common/ErrorBanner';
import type { Database } from '@/integrations/supabase/types';

export default function CheckoutCreatePage() {
  const { productId } = useParams<{ productId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [methods, setMethods] = useState<PaymentMethod[] | null>(null);
  const [methodId, setMethodId] = useState<string>('');
  const [transactionRef, setTransactionRef] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;
    Promise.all([productService.get(productId), paymentMethodService.listActive()])
      .then(([p, m]) => { setProduct(p); setMethods(m); if (m[0]) setMethodId(m[0].id); })
      .catch(e => setError(e.message));
  }, [productId]);

  const selectedMethod = useMemo(
    () => methods?.find(m => m.id === methodId),
    [methods, methodId]
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !product || !selectedMethod) return;
    setSubmitting(true);
    setError(null);
    try {
      const payment = await checkoutService.createPayment({
        userId: user.id,
        productId: product.id,
        planType: product.plan_type as Database['public']['Enums']['subscription_plan'],
        amount: product.price_mzn ?? 0,
        currency: selectedMethod.currency || 'MZN',
        paymentMethodId: selectedMethod.id,
        paymentMethodKey: selectedMethod.method_key,
        transactionRef: transactionRef.trim() || undefined,
        userNotes: notes.trim() || undefined,
        proofFile: file,
      });
      navigate(`/checkout/pending/${payment.id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro a enviar pagamento';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!product || !methods) {
    return (
      <div className="min-h-[100dvh] bg-background p-6">
        <div className="max-w-3xl mx-auto space-y-4 mt-10">
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/checkout" className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary mb-6">
          <ChevronLeft size={14} className="mr-1" /> Voltar aos planos
        </Link>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">Pagamento</p>
          <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
          <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
          <div className="mt-3 inline-flex items-baseline gap-2">
            <span className="text-2xl font-mono-num font-semibold text-foreground">
              {(product.price_mzn ?? 0).toLocaleString('pt-PT')} {selectedMethod?.currency ?? 'MZN'}
            </span>
            <span className="text-xs text-muted-foreground">/ {product.duration_days} dias</span>
          </div>
        </motion.div>

        {error && <ErrorBanner message={error} className="mt-5" />}

        <form onSubmit={submit} className="mt-8 space-y-6">
          <section>
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              1. Método de pagamento
            </h2>
            {methods.length === 0 ? (
              <p className="text-sm text-muted-foreground p-4 bg-card border border-border rounded-xl">
                Nenhum método configurado. Contacta o admin.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {methods.map(m => {
                  const active = methodId === m.id;
                  return (
                    <button type="button" key={m.id} onClick={() => setMethodId(m.id)}
                      className={`text-left p-4 rounded-xl border transition-all ${active ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/40'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{m.display_name}</span>
                        {m.network && <span className="text-[10px] font-mono uppercase text-muted-foreground">{m.network}</span>}
                      </div>
                      <p className="text-sm font-mono-num text-foreground/90 mt-2">{m.account_number}</p>
                      <p className="text-xs text-muted-foreground mt-1">{m.account_holder}</p>
                      {m.instructions && <p className="text-xs text-muted-foreground/80 mt-2">{m.instructions}</p>}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              2. Confirma o pagamento
            </h2>
            <div className="space-y-3">
              <label className="block">
                <span className="text-xs text-muted-foreground">Referência / ID da transação</span>
                <input value={transactionRef} onChange={e => setTransactionRef(e.target.value)}
                  placeholder="ex: M-Pesa MPesa12345" required
                  className="mt-1 w-full h-11 px-3 rounded-xl bg-input border border-border text-foreground text-sm focus:outline-none focus:border-primary" />
              </label>

              <label className="block">
                <span className="text-xs text-muted-foreground">Comprovativo (imagem ou PDF)</span>
                <div className="mt-1 relative">
                  <input type="file" accept="image/*,application/pdf"
                    onChange={e => setFile(e.target.files?.[0] ?? null)} required
                    className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <div className="h-24 rounded-xl border-2 border-dashed border-border bg-input/50 flex flex-col items-center justify-center text-sm text-muted-foreground">
                    <Upload size={20} className="mb-1" />
                    {file ? <span className="text-foreground">{file.name}</span> : <span>Clica para anexar</span>}
                  </div>
                </div>
              </label>

              <label className="block">
                <span className="text-xs text-muted-foreground">Notas (opcional)</span>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-input border border-border text-foreground text-sm focus:outline-none focus:border-primary" />
              </label>
            </div>
          </section>

          <button type="submit" disabled={submitting || !file || !methodId || !transactionRef.trim()}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 inline-flex items-center justify-center gap-2 glow-primary transition-all">
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? 'A enviar…' : 'Confirmar pagamento'}
          </button>
        </form>
      </div>
    </div>
  );
}
