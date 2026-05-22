import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Find expired active subscriptions
    const { data: expiredSubs, error: fetchError } = await supabaseClient
      .from('subscriptions')
      .select('id, user_id')
      .eq('status', 'active')
      .lt('expires_at', new Date().toISOString())

    if (fetchError) throw fetchError

    if (expiredSubs && expiredSubs.length > 0) {
      const ids = expiredSubs.map(s => s.id)
      
      // Update to expired
      const { error: updateError } = await supabaseClient
        .from('subscriptions')
        .update({ status: 'expired' })
        .in('id', ids)

      if (updateError) throw updateError

      console.log(`Expired ${ids.length} subscriptions`)
    }

    return new Response(JSON.stringify({ success: true, count: expiredSubs?.length || 0 }), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
