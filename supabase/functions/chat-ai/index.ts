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

    // Get user from JWT
    const authHeader = req.headers.get('Authorization')!
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))
    if (authError || !user) throw new Error('Unauthorized')

    const { message, sessionId } = await req.json()

    // 1. Check role and subscription
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const { data: sub } = await supabaseClient
      .from('subscriptions')
      .select('status, plan_type')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle()

    const isUnlimited = ['admin', 'super_admin', 'mentor'].includes(profile?.role) || 
                       (sub && ['POWER_OF_THREE', 'SIGNALS_ROOM', 'PREMIUM_ALL_ACCESS'].includes(sub.plan_type))

    // 2. Rate limit check
    const today = new Date().toISOString().split('T')[0]
    const { data: usage } = await supabaseClient
      .from('ai_usage')
      .select('message_count')
      .eq('user_id', user.id)
      .eq('usage_date', today)
      .maybeSingle()

    const currentCount = usage?.message_count || 0
    const limit = profile?.role === 'guest' ? 5 : 3

    if (!isUnlimited && currentCount >= limit) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please upgrade your plan.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 3. Manage Session
    let currentSessionId = sessionId
    if (!currentSessionId) {
      const { data: session } = await supabaseClient
        .from('ai_sessions')
        .insert({ user_id: user.id, title: message.substring(0, 40) })
        .select()
        .single()
      currentSessionId = session.id
    }

    // 4. Save User Message
    await supabaseClient
      .from('ai_messages')
      .insert({ session_id: currentSessionId, role: 'user', content: message })

    // 5. Call Gemini API
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
    const systemPrompt = `Tu és o MM AI, mentor de trading da Money Makers Academy em Moçambique.
Falas português europeu. Tom: maduro, disciplinado, sem hype, sem 
promessas de lucros. Foca em: psicologia, gestão de risco, estratégia,
disciplina. NUNCA dês conselhos financeiros directos. NUNCA garantas 
retornos. Cita conceitos como risk:reward, drawdown, position sizing.`

    // Fetch history for context
    const { data: history } = await supabaseClient
      .from('ai_messages')
      .select('role, content')
      .eq('session_id', currentSessionId)
      .order('created_at', { ascending: true })
      .limit(10)

    const contents = history.map(h => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    }))

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contents,
        system_instruction: { parts: [{ text: systemPrompt }] }
      })
    })

    const geminiData = await response.json()
    const reply = geminiData.candidates[0].content.parts[0].text

    // 6. Save Assistant Message
    await supabaseClient
      .from('ai_messages')
      .insert({ session_id: currentSessionId, role: 'assistant', content: reply })

    // 7. Increment Usage
    if (!isUnlimited) {
      await supabaseClient.rpc('increment_ai_usage', { p_user_id: user.id, p_date: today })
    }

    return new Response(
      JSON.stringify({ reply, sessionId: currentSessionId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
