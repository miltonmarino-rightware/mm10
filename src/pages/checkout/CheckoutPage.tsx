import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { productService, type Product } from '@/services/products';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorBanner } from "@/components/common/ErrorBanner";

export default function CheckoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productService.listActive()
      .then(setProducts)
      .catch(e => setError(e.message ?? 'Erro ao carregar planos'));
  }, []);

  const fmt = (n: number | null, c: string) =>
    n == null ? '—' : new Intl.NumberFormat('pt-PT', { style: 'currency', currency: c, maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-[100dvh] bg-background py-10 lg:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3">Planos disponíveis</p>
          <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">
            Escolhe o teu <span className="font-serif-italic text-primary">acesso</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
            Subscrições com ativação manual após confirmação do pagamento.
          </p>
        </motion.div>

        {error && <div className="mb-6"><ErrorBanner message={error} /></div>}

        {!products ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0,1,2].map(i => <Skeleton key={i} className="h-80 rounded-2xl" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">Nenhum plano disponível no momento.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p, i) => {
              const features = Array.isArray(p.features) ? (p.features as unknown[]).map(String) : [];
              return (
                <motion.div key={p.id}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`relative bg-card border rounded-2xl p-6 flex flex-col ${p.is_featured ? 'border-primary/50 glow-primary-sm' : 'border-border'}`}>
                  {p.badge_text && (
                    <span className="absolute -top-2 right-4 text-[10px] font-mono uppercase tracking-wider bg-primary text-primary-foreground px-2 py-1 rounded-md">
                      <Sparkles size={10} className="inline mr-1" />{p.badge_text}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                  {p.description && <p className="text-sm text-muted-foreground mt-1">{p.description}</p>}

                  <div className="mt-5 mb-5">
                    <p className="text-3xl font-mono-num font-semibold text-foreground">
                      {fmt(p.price_mzn, 'MZN')}
                    </p>
                    {p.price_usd && (
                      <p className="text-xs text-muted-foreground mt-1">≈ {fmt(p.price_usd, 'USD')}</p>
                    )}
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-1">
                      {p.duration_days} dias
                    </p>
                  </div>

                  <ul className="space-y-2 text-sm mb-6 flex-1">
                    {features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-foreground/90">
                        <Check size={16} className="text-primary mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => user ? navigate(`/checkout/${p.id}`) : navigate('/auth/login')}
                    className="h-11 px-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all">
                    Escolher plano <ArrowRight size={16} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/app" className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary">
            ← Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
