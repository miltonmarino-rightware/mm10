import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { Feature } from '@/types/platform';

interface Props {
  feature: Feature;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function RequireFeature({ feature, children, fallback }: Props) {
  const { hasAccess } = useAuth();
  if (hasAccess(feature)) return <>{children}</>;
  if (fallback) return <>{fallback}</>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
        <Lock size={28} className="text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">Acesso restrito</h2>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        Esta funcionalidade requer uma subscrição ativa. Ativa o teu plano para desbloquear.
      </p>
      <Link to="/app/checkout"
        className="h-11 px-6 inline-flex items-center rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 glow-primary transition-all">
        Ver planos
      </Link>
    </div>
  );
}
