import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Payload { payment_id: string; kind: 'approved' | 'rejected' | 'pending'; reason?: string }

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  try {
    const admin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    const { payment_id, kind, reason } = (await req.json()) as Payload;
    if (!payment_id || !kind) throw new Error('payment_id and kind required');

    const { data: payment } = await admin.from('payments').select('*').eq('id', payment_id).single();
    if (!payment) throw new Error('Payment not found');

    const { data: profile } = await admin.from('profiles').select('email, full_name').eq('id', payment.user_id).single();
    const recipient = profile?.email;
    if (!recipient) throw new Error('No recipient email');

    const name = profile?.full_name ?? 'Aluno';
    const subjects = {
      approved: `✅ Pagamento aprovado — ${payment.plan_type ?? ''}`,
      rejected: `⚠️ Pagamento rejeitado`,
      pending: `🔔 Pagamento recebido`,
    };
    const bodies = {
      approved: `<p>Olá ${name},</p><p>O teu pagamento de <strong>${payment.amount} ${payment.currency}</strong> foi aprovado. A tua subscrição (${payment.plan_type}) está ativa.</p>`,
      rejected: `<p>Olá ${name},</p><p>O teu pagamento foi rejeitado.</p>${reason ? `<p><em>Motivo: ${reason}</em></p>` : ''}<p>Podes submeter novamente.</p>`,
      pending: `<p>Olá ${name},</p><p>Recebemos o teu pagamento e está em revisão.</p>`,
    };

    // Try Resend (if connected)
    const RESEND_KEY = Deno.env.get('RESEND_API_KEY');
    const LOVABLE_KEY = Deno.env.get('LOVABLE_API_KEY');
    let sent = false;
    let failure: string | null = null;

    if (RESEND_KEY && LOVABLE_KEY) {
      try {
        const r = await fetch('https://connector-gateway.lovable.dev/resend/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LOVABLE_KEY}`,
            'X-Connection-Api-Key': RESEND_KEY,
          },
          body: JSON.stringify({
            from: 'Money Makers <onboarding@resend.dev>',
            to: [recipient],
            subject: subjects[kind],
            html: bodies[kind],
          }),
        });
        sent = r.ok;
        if (!r.ok) failure = await r.text();
      } catch (e) { failure = String(e); }
    } else {
      failure = 'RESEND_API_KEY not configured';
    }

    // Log to admin_notifications queue
    await admin.from('admin_notifications').insert({
      notification_type: kind === 'approved' ? 'payment_approved' : kind === 'rejected' ? 'payment_rejected' : 'payment_pending',
      recipient_email: recipient,
      subject: subjects[kind],
      body_html: bodies[kind],
      body_text: bodies[kind].replace(/<[^>]+>/g, ''),
      status: sent ? 'sent' : 'failed',
      sent_at: sent ? new Date().toISOString() : null,
      failed_at: sent ? null : new Date().toISOString(),
      failure_reason: failure,
      related_payment_id: payment_id,
      related_user_id: payment.user_id,
      payload: { kind, reason },
    });

    return new Response(JSON.stringify({ ok: true, sent, failure }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
});
