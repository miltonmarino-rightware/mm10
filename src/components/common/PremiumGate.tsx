import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';
import { productService, type Product } from '@/services/products';
import { getPrimaryPlanForFeature } from '@/lib/access';
import type { Feature } from '@/types/platform';

interface PremiumGateProps {
  feature: Feature;
  eyebrow?: string;
  title: string;
  description: string;
  bullets?: string[];
  ctaLabel?: string;
}

export default function PremiumGate({
  feature,
  eyebrow = 'Acesso restrito',
  title,
  description,
  bullets = [],
  ctaLabel = 'Desbloquear acesso',
}: PremiumGateProps) {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const plan = getPrimaryPlanForFeature(feature);

    if (!plan) {
      setLoading(false);
      return;
    }

    productService.listActive()
      .then(products => {
        if (!alive) return;
        setProduct(products.find(p => p.plan_type === plan) ?? null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => { alive = false; };
  }, [feature]);

  const formatPrice = (p: Product) => {
    if (p.price_mzn != null) {
      return new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN', maximumFractionDigits: 0 }).format(p.price_mzn);
    }
    if (p.price_usd != null) {
      return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p.price_usd);
    }
    return 'Preço sob consulta';
  };

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] flex items-center justify-center p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-primary/25 bg-card p-7 lg:p-9 shadow-premium"
      >
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-market-warn/10 blur-3xl" />

        <div className="relative">
          <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl border border-primary/25 bg-primary/12 text-primary">
            <Lock size={22} />
          </div>

          <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          {bullets.length > 0 && (
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {bullets.map(item => (
                <div key={item} className="flex items-start gap-2 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground">
                  <Sparkles size={14} className="mt-0.5 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-7 rounded-2xl border border-border bg-background/60 p-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Plano necessário</p>
            {loading ? (
              <div className="mt-3 h-12 animate-pulse rounded-xl bg-muted" />
            ) : product ? (
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{formatPrice(product)} · {product.duration_days} dias</p>
                </div>
                <button
                  onClick={() => navigate(`/checkout/${product.id}`)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
                >
                  {ctaLabel} <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">Nenhum plano ativo encontrado para este acesso.</p>
                <button
                  onClick={() => navigate('/checkout')}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition-all hover:bg-secondary"
                >
                  Ver planos
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
