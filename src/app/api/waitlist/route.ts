// src/app/api/waitlist/route.ts
import { NextResponse }    from 'next/server'
import { createClient }    from '@supabase/supabase-js'
import { Resend }          from 'resend'
import { z }               from 'zod'
import { waitlistEmailHTML } from '@/lib/email/waitlist-email'

// ── Input validation schema ───────────────────────────────
const WaitlistSchema = z.object({
  name:          z.string().min(2).max(80).trim(),
  email:         z.string().email().toLowerCase().trim(),
  trade:         z.enum([
    'roofer', 'plumber', 'electrician', 'carpenter',
    'landscaper', 'bathroom-fitter', 'painter-decorator', 'other',
  ]),
  business_name: z.string().max(100).trim().optional(),
})

function envFlag(v: string | undefined): 'set' | 'empty' | 'missing' {
  if (v === undefined) return 'missing'
  if (!String(v).trim()) return 'empty'
  return 'set'
}

// ── POST /api/waitlist ────────────────────────────────────
export async function POST(request: Request) {
  console.log('[/api/waitlist] POST received')
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const resendKey = process.env.RESEND_API_KEY
    const ownerEmail = process.env.OWNER_EMAIL?.trim()
    const resendFromRaw = process.env.RESEND_FROM_EMAIL
    const resendFromTrimmed = resendFromRaw?.trim()

    const missing: string[] = []
    if (envFlag(supabaseUrl) !== 'set') missing.push('NEXT_PUBLIC_SUPABASE_URL')
    if (envFlag(serviceKey) !== 'set') missing.push('SUPABASE_SERVICE_ROLE_KEY')
    if (envFlag(resendKey) !== 'set') missing.push('RESEND_API_KEY')
    if (envFlag(resendFromTrimmed) !== 'set') missing.push('RESEND_FROM_EMAIL')

    console.log('[/api/waitlist] env check', {
      NEXT_PUBLIC_SUPABASE_URL: envFlag(supabaseUrl),
      SUPABASE_SERVICE_ROLE_KEY: envFlag(serviceKey),
      RESEND_API_KEY: envFlag(resendKey),
      RESEND_FROM_EMAIL: envFlag(resendFromTrimmed),
      OWNER_EMAIL: envFlag(ownerEmail),
    })

    if (missing.length > 0) {
      console.error(
        '[/api/waitlist] Missing or empty required env vars:',
        missing.join(', '),
        '— fix .env.local and restart `npm run dev`.'
      )
      return NextResponse.json(
        {
          error: 'Waitlist is temporarily unavailable (server configuration).',
          code: 'MISSING_ENV',
        },
        { status: 503 }
      )
    }

    const supabase = createClient(supabaseUrl!, serviceKey!)
    const resend = new Resend(resendKey!)
    const resendFrom = resendFromTrimmed!

    const body = await request.json()
    console.log('[/api/waitlist] body keys:', body && typeof body === 'object' ? Object.keys(body as object) : [])

    // Validate
    const parsed = WaitlistSchema.safeParse(body)
    if (!parsed.success) {
      console.warn('[/api/waitlist] validation failed', parsed.error.flatten().fieldErrors)
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, trade, business_name } = parsed.data
    console.log('[/api/waitlist] validated signup', { name, email, trade })

    // ── Duplicate check ──────────────────────────────────
    const { data: existing, error: dupErr } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (dupErr) {
      console.error('[/api/waitlist] duplicate check query error:', dupErr.message)
      throw new Error(`Duplicate check failed: ${dupErr.message}`)
    }

    if (existing) {
      console.warn(
        '[/api/waitlist] duplicate email — skipping insert and Resend (no Resend API calls; nothing in Resend logs is expected).'
      )
      return NextResponse.json({ success: true, duplicate: true })
    }

    // ── Insert to DB ─────────────────────────────────────
    console.log('[/api/waitlist] inserting row into Supabase…')
    const { error: dbError } = await supabase
      .from('waitlist')
      .insert({
        name,
        email,
        trade,
        business_name: business_name ?? null,
        source:        'landing_page',
        signed_up_at:  new Date().toISOString(),
      })

    if (dbError) {
      console.error('[/api/waitlist] Supabase insert failed:', dbError.message, dbError)
      throw new Error(`DB insert failed: ${dbError.message}`)
    }
    console.log('[/api/waitlist] Supabase insert OK')

    // ── Send confirmation email to user (must succeed before owner notify) ──
    console.log('[/api/waitlist] sending customer confirmation via Resend…')
    const customerRes = await resend.emails.send({
      from:    resendFrom,
      to:      email,
      subject: "You're on the QuickQuo early access list 🚀",
      html:    waitlistEmailHTML(name.split(' ')[0]),
    })
    console.log('[/api/waitlist] Resend customer confirmation response:', JSON.stringify(customerRes))

    if (customerRes.error) {
      const detail = `${customerRes.error.name}: ${customerRes.error.message}`
      console.error('[/api/waitlist] Customer confirmation email failed:', detail)
      console.log('[/api/waitlist] rolling back Supabase row for', email)
      const { error: delErr } = await supabase.from('waitlist').delete().eq('email', email)
      if (delErr) {
        console.error('[/api/waitlist] rollback delete failed:', delErr.message)
      }
      throw new Error(`Customer confirmation email failed: ${detail}`)
    }
    console.log('[/api/waitlist] customer Resend send OK (id:', customerRes.data?.id ?? 'n/a', ')')

    // ── Notify owner (after customer send; failure is logged only) ──
    const ownerTo = ownerEmail
    if (ownerTo) {
      console.log('[/api/waitlist] sending owner notification to', ownerTo)
      const ownerRes = await resend.emails.send({
        from:    resendFrom,
        to:      ownerTo,
        subject: `🔔 New waitlist signup: ${name} (${trade})`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Trade:</strong> ${trade}</p>
          <p><strong>Business:</strong> ${business_name ?? 'N/A'}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
        `,
      })
      console.log('[/api/waitlist] Resend owner notification response:', JSON.stringify(ownerRes))
      if (ownerRes.error) {
        console.error(
          '[/api/waitlist] Owner notification failed (signup + customer email already done):',
          `${ownerRes.error.name}: ${ownerRes.error.message}`
        )
      } else {
        console.log('[/api/waitlist] owner Resend send OK (id:', ownerRes.data?.id ?? 'n/a', ')')
      }
    } else {
      console.warn('[/api/waitlist] OWNER_EMAIL not set — skipping owner notification')
    }

    console.log('[/api/waitlist] completed successfully')
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[/api/waitlist] Error:', message, err)
    return NextResponse.json(
      {
        error:
          message === 'Unknown error'
            ? 'Something went wrong. Please try again.'
            : message,
        code: 'INTERNAL',
      },
      { status: 500 }
    )
  }
}
