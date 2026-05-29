import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { paymentMethodService, type PaymentMethod } from '@/services/paymentMethods';
import { Skeleton } from '@/components/ui/skeleton';

const blank = (): Partial<PaymentMethod> => ({
  method_key: '',
  display_name: '',
  account_number: '',
  account_holder: '',
  currency: 'MZN',
  network: '',
  instructions: '',
  icon_name: '',
  is_active: true,
  display_order: 0,
});

export default function AdminPaymentConfig() {
  const [items, setItems] = useState<PaymentMethod[] | null>(null);
  const [editing, setEditing] = useState<Partial<PaymentMethod> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => setItems(await paymentMethodService.listAll());
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.method_key || !editing.display_name || !editing.account_number || !editing.account_holder) return;
    setSaving(true);
    try {
      await paymentMethodService.upsert({
        ...editing,
        method_key: editing.method_key,
        display_name: editing.display_name,
        account_number: editing.account_number,
        account_holder: editing.account_holder,
        currency: editing.currency || 'MZN',
        display_order: Number(editing.display_order ?? 0),
      } as PaymentMethod);
      setEditing(null);
      await load();
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Eliminar este método?')) return;
    await paymentMethodService.delete(id);
    await load();
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Operações</p>
          <h1 className="text-2xl font-semibold tracking-tight">Métodos de pagamento</h1>
        </div>
        <button onClick={() => setEditing(blank())}
          className="h-10 px-4 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
          <Plus size={14} /> Novo
        </button>
      </header>

      {!items ? (
        <div className="space-y-2">{[0,1].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {items.map(m => (
            <div key={m.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{m.display_name}</h3>
                  <p className="text-[10px] font-mono uppercase text-muted-foreground">{m.method_key} · {m.currency}</p>
                </div>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${m.is_active ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {m.is_active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <p className="text-sm font-mono-num mt-2">{m.account_number}</p>
              <p className="text-xs text-muted-foreground">{m.account_holder}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => setEditing(m)} className="flex-1 h-9 text-xs font-semibold rounded-lg border border-border hover:border-primary/40">Editar</button>
                <button onClick={() => remove(m.id)} className="h-9 w-9 rounded-lg border border-destructive/40 text-destructive hover:bg-destructive/10 inline-flex items-center justify-center">
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
            <h3 className="text-lg font-semibold mb-4">{editing.id ? 'Editar método' : 'Novo método'}</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <F label="Key (único)"><input value={editing.method_key ?? ''} onChange={e => setEditing({ ...editing, method_key: e.target.value })} className={ipt} /></F>
                <F label="Nome"><input value={editing.display_name ?? ''} onChange={e => setEditing({ ...editing, display_name: e.target.value })} className={ipt} /></F>
                <F label="Número"><input value={editing.account_number ?? ''} onChange={e => setEditing({ ...editing, account_number: e.target.value })} className={ipt} /></F>
                <F label="Titular"><input value={editing.account_holder ?? ''} onChange={e => setEditing({ ...editing, account_holder: e.target.value })} className={ipt} /></F>
                <F label="Moeda"><input value={editing.currency ?? 'MZN'} onChange={e => setEditing({ ...editing, currency: e.target.value })} className={ipt} /></F>
                <F label="Rede / Banco"><input value={editing.network ?? ''} onChange={e => setEditing({ ...editing, network: e.target.value })} className={ipt} /></F>
                <F label="Ordem"><input type="number" value={editing.display_order ?? 0} onChange={e => setEditing({ ...editing, display_order: Number(e.target.value) })} className={ipt} /></F>
                <F label="Ícone"><input value={editing.icon_name ?? ''} onChange={e => setEditing({ ...editing, icon_name: e.target.value })} className={ipt} /></F>
              </div>
              <F label="Instruções">
                <textarea value={editing.instructions ?? ''} onChange={e => setEditing({ ...editing, instructions: e.target.value })} rows={3} className={ipt} />
              </F>
              <label className="text-sm flex items-center gap-2">
                <input type="checkbox" checked={!!editing.is_active}
                  onChange={e => setEditing({ ...editing, is_active: e.target.checked })} /> Ativo
              </label>
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
function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
