import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify Admin Auth (for MVP manual POST)
    const authHeader = req.headers.get('Authorization')!
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))
    
    if (authError || !user) throw new Error('Unauthorized')

    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
      throw new Error('Forbidden: Admin only')
    }

    const { user_id, plan_type, transaction_reference, amount } = await req.json()

    // 1. Create Payment Record
    const { data: payment, error: pError } = await supabaseClient
      .from('payments')
      .insert({
        user_id,
        amount: amount || 0,
        status: 'paid',
        transaction_ref: transaction_reference,
        paid_at: new Date().toISOString()
      })
      .select()
      .single()

    if (pError) throw pError

    // 2. Create/Update Subscription
    const startsAt = new Date()
    const expiresAt = new Date()
    expiresAt.setDate(startsAt.getDate() + 30)

    const { error: sError } = await supabaseClient
      .from('subscriptions')
      .upsert({
        user_id,
        plan_type,
        status: 'active',
        starts_at: startsAt.toISOString(),
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,plan_type' })

    if (sError) throw sError

    return new Response(
      JSON.stringify({ success: true, message: 'Subscription activated' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
