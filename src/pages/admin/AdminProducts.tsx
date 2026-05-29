import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { productService, type Product } from '@/services/products';
import { Skeleton } from '@/components/ui/skeleton';
import type { Database } from '@/integrations/supabase/types';

type Plan = Database['public']['Enums']['subscription_plan'];

const PLAN_OPTIONS: Plan[] = [
  'POWER_OF_THREE',
  'SIGNALS_ROOM',
  'SIGNALS_BASIC',
  'SIGNALS_PLATINUM',
  'SIGNALS_PREMIUM',
  'PREMIUM_ALL_ACCESS',
  'MENTORSHIP',
];

const blankDraft = (): Partial<Product> => ({
  name: '',
  description: '',
  plan_type: 'POWER_OF_THREE',
  price_mzn: 0,
  price_usd: 0,
  duration_days: 30,
  features: [],
  is_active: true,
  is_featured: false,
  badge_text: '',
  display_order: 0,
});

export default function AdminProducts() {
  const [items, setItems] = useState<Product[] | null>(null);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => setItems(await productService.listAll());
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing || !editing.name || !editing.plan_type) return;
    setSaving(true);
    try {
      const features = Array.isArray(editing.features) ? editing.features : [];
      await productService.upsert({
        ...editing,
        name: editing.name,
        plan_type: editing.plan_type,
        duration_days: Number(editing.duration_days ?? 30),
        price_mzn: editing.price_mzn != null ? Number(editing.price_mzn) : null,
        price_usd: editing.price_usd != null ? Number(editing.price_usd) : null,
        features,
      } as Product);
      setEditing(null);
      await load();
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Eliminar este produto?')) return;
    await productService.delete(id);
    await load();
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Operações</p>
          <h1 className="text-2xl font-semibold tracking-tight">Produtos & Planos</h1>
        </div>
        <button onClick={() => setEditing(blankDraft())}
          className="h-10 px-4 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
          <Plus size={14} /> Novo
        </button>
      </header>

      {!items ? (
        <div className="space-y-2">{[0,1].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {items.map(p => (
            <div key={p.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">{p.name}</h3>
                  <p className="text-[10px] font-mono uppercase text-muted-foreground mt-0.5">{p.plan_type}</p>
                </div>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${p.is_active ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {p.is_active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <p className="text-sm font-mono-num mt-2">{p.price_mzn ?? '—'} MZN · {p.duration_days}d</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => setEditing(p)} className="flex-1 h-9 text-xs font-semibold rounded-lg border border-border hover:border-primary/40">Editar</button>
                <button onClick={() => remove(p.id)} className="h-9 w-9 rounded-lg border border-destructive/40 text-destructive hover:bg-destructive/10 inline-flex items-center justify-center">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">{editing.id ? 'Editar produto' : 'Novo produto'}</h3>
            <div className="space-y-3">
              <Field label="Nome">
                <input value={editing.name ?? ''} onChange={e => setEditing({ ...editing, name: e.target.value })} className={ipt} />
              </Field>
              <Field label="Descrição">
                <textarea value={editing.description ?? ''} onChange={e => setEditing({ ...editing, description: e.target.value })} className={ipt} rows={2} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Plano">
                  <select value={editing.plan_type ?? 'POWER_OF_THREE'}
                    onChange={e => setEditing({ ...editing, plan_type: e.target.value as Plan })} className={ipt}>
                    {PLAN_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label="Dias">
                  <input type="number" value={editing.duration_days ?? 30}
                    onChange={e => setEditing({ ...editing, duration_days: Number(e.target.value) })} className={ipt} />
                </Field>
                <Field label="Preço MZN">
                  <input type="number" value={editing.price_mzn ?? 0}
                    onChange={e => setEditing({ ...editing, price_mzn: Number(e.target.value) })} className={ipt} />
                </Field>
                <Field label="Preço USD">
                  <input type="number" value={editing.price_usd ?? 0}
                    onChange={e => setEditing({ ...editing, price_usd: Number(e.target.value) })} className={ipt} />
                </Field>
                <Field label="Ordem">
                  <input type="number" value={editing.display_order ?? 0}
                    onChange={e => setEditing({ ...editing, display_order: Number(e.target.value) })} className={ipt} />
                </Field>
                <Field label="Badge">
                  <input value={editing.badge_text ?? ''} onChange={e => setEditing({ ...editing, badge_text: e.target.value })} className={ipt} />
                </Field>
              </div>
              <Field label="Funcionalidades (uma por linha)">
                <textarea
                  value={Array.isArray(editing.features) ? (editing.features as string[]).join('\n') : ''}
                  onChange={e => setEditing({ ...editing, features: e.target.value.split('\n').filter(Boolean) })}
                  rows={4} className={ipt} />
              </Field>
              <div className="flex items-center gap-4">
                <label className="text-sm flex items-center gap-2">
                  <input type="checkbox" checked={!!editing.is_active}
                    onChange={e => setEditing({ ...editing, is_active: e.target.checked })} /> Ativo
                </label>
                <label className="text-sm flex items-center gap-2">
                  <input type="checkbox" checked={!!editing.is_featured}
                    onChange={e => setEditing({ ...editing, is_featured: e.target.checked })} /> Destaque
                </label>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={save} disabled={saving}
                className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 inline-flex items-center justify-center gap-2">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Guardar
              </button>
              <button onClick={() => setEditing(null)} className="h-11 px-4 rounded-xl border border-border text-sm">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ipt = "w-full h-10 px-3 rounded-xl bg-input border border-border text-foreground text-sm focus:outline-none focus:border-primary";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
