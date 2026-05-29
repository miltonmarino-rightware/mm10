import React, { useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { adminSubscriptionsService, type Subscription } from '@/services/adminPayments';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function AdminSubscriptions() {
  const [items, setItems] = useState<Subscription[] | null>(null);
  const [profiles, setProfiles] = useState<Map<string, { full_name: string | null; email: string }>>(new Map());
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    const subs = await adminSubscriptionsService.list();
    setItems(subs);
    const ids = Array.from(new Set(subs.map(s => s.user_id)));
    if (ids.length) {
      const { data } = await supabase.from('profiles').select('id, full_name, email').in('id', ids);
      setProfiles(new Map((data ?? []).map(p => [p.id, { full_name: p.full_name, email: p.email }])));
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const ch = supabase.channel('admin-subs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'subscriptions' }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const handle = async (fn: () => Promise<void>, id: string) => {
    setBusy(id);
    try { await fn(); await load(); } finally { setBusy(null); }
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Operações</p>
          <h1 className="text-2xl font-semibold tracking-tight">Subscrições</h1>
        </div>
        <button onClick={load} className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary inline-flex items-center gap-1">
          <RefreshCw size={12} /> Atualizar
        </button>
      </header>

      {!items ? (
        <div className="space-y-2">{[0,1,2].map(i => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>
      ) : items.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">Sem subscrições.</p>
      ) : (
        <div className="space-y-2">
          {items.map(s => {
            const profile = profiles.get(s.user_id);
            const isActive = s.status === 'active';
            const expired = s.expires_at && new Date(s.expires_at) < new Date();
            return (
              <div key={s.id} className="bg-card border border-border rounded-xl p-4 flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{profile?.full_name ?? profile?.email ?? s.user_id.slice(0,8)}</span>
                    <Badge className={isActive && !expired ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}>{s.status}</Badge>
                    <span className="text-[10px] font-mono uppercase text-muted-foreground">{s.plan_type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {profile?.email} · expira em {s.expires_at ? new Date(s.expires_at).toLocaleDateString('pt-PT') : '∞'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button disabled={busy === s.id} onClick={() => handle(() => adminSubscriptionsService.extend(s.id, 30), s.id)}
                    className="h-9 px-3 text-xs font-semibold rounded-lg border border-border hover:border-primary/40">
                    {busy === s.id ? <Loader2 size={12} className="animate-spin" /> : '+30 dias'}
                  </button>
                  {isActive ? (
                    <button disabled={busy === s.id} onClick={() => handle(() => adminSubscriptionsService.setStatus(s.id, 'cancelled'), s.id)}
                      className="h-9 px-3 text-xs font-semibold rounded-lg border border-destructive/40 text-destructive hover:bg-destructive/10">
                      Cancelar
                    </button>
                  ) : (
                    <button disabled={busy === s.id} onClick={() => handle(() => adminSubscriptionsService.setStatus(s.id, 'active'), s.id)}
                      className="h-9 px-3 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                      Ativar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
