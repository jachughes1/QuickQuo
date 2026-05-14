'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import '@/app/quickquo-landing.css'
import { LANDING_BODY_HTML } from './landing-body-html'

declare global {
  interface Window {
    __qqScroll: (id: string) => void
    __qqDemo: () => void
    __qqSubmitWaitlist: () => Promise<void>
  }
}

const LOG = '[QuickQuo waitlist]'

/** Hosted interactive demo (`public/quickquo-demo.html`). Override with `NEXT_PUBLIC_DEMO_URL` (path or full URL). */
const DEFAULT_DEMO_PATH = '/quickquo-demo.html'

function resolveDemoUrl(): string {
  const u = process.env.NEXT_PUBLIC_DEMO_URL
  if (u && u !== '#') {
    if (u.startsWith('http://') || u.startsWith('https://')) return u
    const path = u.startsWith('/') ? u : `/${u}`
    return new URL(path, window.location.origin).href
  }
  return new URL(DEFAULT_DEMO_PATH, window.location.origin).href
}

function shakeInput(id: string) {
  const el = document.getElementById(id) as HTMLElement | null
  if (!el) return
  el.style.borderColor = '#f87171'
  el.style.animation = 'none'
  void el.offsetHeight
  el.style.animation = 'shakeinput .35s ease'
  el.focus()
  setTimeout(() => {
    el.style.borderColor = ''
  }, 2000)
}

function setInlineStatus(msg: string, kind: 'err' | 'ok' | '') {
  const el = document.getElementById('wl-inline-status')
  if (!el) return
  if (!msg) {
    el.textContent = ''
    el.className = 'wl-inline-status'
    return
  }
  el.textContent = msg
  el.className = kind === 'err' ? 'wl-inline-status wl-inline-err' : 'wl-inline-status wl-inline-ok'
}

type WaitlistJson = {
  success?: boolean
  duplicate?: boolean
  error?: string
  code?: string
  details?: unknown
}

export function QuickQuoLanding() {
  const rootRef = useRef<HTMLDivElement>(null)
  const landingHtml = useMemo(() => ({ __html: LANDING_BODY_HTML }), [])
  const [waitlistSuccess, setWaitlistSuccess] = useState(false)
  const waitlistSuccessPayload = useRef<{ name: string; email: string } | null>(null)

  const submitWaitlist = useCallback(async () => {
    console.log(`${LOG} Join button clicked`)

    const name = (document.getElementById('wl-name') as HTMLInputElement | null)?.value.trim() ?? ''
    const email = (document.getElementById('wl-email') as HTMLInputElement | null)?.value.trim() ?? ''
    const trade = (document.getElementById('wl-trade') as HTMLSelectElement | null)?.value ?? ''
    const biz = (document.getElementById('wl-biz') as HTMLInputElement | null)?.value.trim() ?? ''

    if (!name) {
      console.warn(`${LOG} validation failed: missing name`)
      setInlineStatus('Please enter your name.', 'err')
      return shakeInput('wl-name')
    }
    if (!email || !email.includes('@')) {
      console.warn(`${LOG} validation failed: invalid email`)
      setInlineStatus('Please enter a valid email address.', 'err')
      return shakeInput('wl-email')
    }
    if (!trade) {
      console.warn(`${LOG} validation failed: trade not selected`)
      setInlineStatus('Please select your trade.', 'err')
      return shakeInput('wl-trade')
    }

    console.log(`${LOG} validation passed`, { name, email, trade, hasBusiness: Boolean(biz) })
    setInlineStatus('', '')

    const btn = document.getElementById('wl-btn') as HTMLButtonElement | null
    const btnT = document.getElementById('wl-btn-text')
    if (btn) btn.disabled = true
    if (btnT) btnT.textContent = 'Joining…'
    if (btn) btn.style.opacity = '0.7'

    const resetButton = () => {
      if (btn) btn.disabled = false
      if (btnT) btnT.textContent = "✦ Join Waiting List — It's Free"
      if (btn) btn.style.opacity = '1'
    }

    try {
      console.log(`${LOG} sending POST /api/waitlist`)
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: email.toLowerCase(),
          trade,
          business_name: biz || undefined,
        }),
      })

      let data: WaitlistJson = {}
      try {
        data = (await res.json()) as WaitlistJson
      } catch {
        console.warn(`${LOG} API response was not JSON`, res.status)
      }

      console.log(`${LOG} API response`, res.status, data)

      if (!res.ok) {
        resetButton()
        const hint =
          data.code === 'MISSING_ENV'
            ? 'Waitlist is temporarily unavailable. The site owner should check server environment variables in the dev terminal.'
            : (data.error ?? 'Something went wrong. Please try again.')
        setInlineStatus(hint, 'err')
        if (data.details) console.warn(`${LOG} validation details`, data.details)
        return
      }

      if (data.duplicate) {
        console.warn(`${LOG} duplicate email — API skipped insert and emails by design`)
        resetButton()
        setInlineStatus(
          'This email is already on the list, so no new confirmation was sent. Check your inbox for your original message, or use a different address to test again.',
          'ok'
        )
        return
      }

      waitlistSuccessPayload.current = { name, email: email.toLowerCase() }
      setWaitlistSuccess(true)
      setInlineStatus('', '')
      console.log(`${LOG} success UI state set`)
    } catch (e) {
      console.error(`${LOG} network or unexpected error`, e)
      resetButton()
      setInlineStatus('Network error. Check your connection and try again.', 'err')
    }
  }, [])

  useEffect(() => {
    window.__qqScroll = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    window.__qqDemo = () => {
      window.open(resolveDemoUrl(), '_blank', 'noopener,noreferrer')
    }

    window.__qqSubmitWaitlist = submitWaitlist

    return () => {
      delete (window as unknown as { __qqScroll?: unknown }).__qqScroll
      delete (window as unknown as { __qqDemo?: unknown }).__qqDemo
      delete (window as unknown as { __qqSubmitWaitlist?: unknown }).__qqSubmitWaitlist
    }
  }, [submitWaitlist])

  useEffect(() => {
    if (!waitlistSuccess) return
    const p = waitlistSuccessPayload.current
    const msg = document.getElementById('wl-success-msg')
    if (msg && p) {
      const first = p.name.split(' ')[0] ?? p.name
      msg.textContent = `Hey ${first}! We'll email you at ${p.email} with your early access details — including 2 weeks completely free and priority onboarding when we launch.`
    }
  }, [waitlistSuccess])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const onWlClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (!t?.closest?.('#wl-btn')) return
      e.preventDefault()
      void submitWaitlist()
    }
    root.addEventListener('click', onWlClick)

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('in')
        })
      },
      { threshold: 0.1 }
    )

    root.querySelectorAll('.r0,.r1,.r2,.r3,.r4,.r5').forEach(el => obs.observe(el))

    const onScroll = () => {
      const nav = document.getElementById('nav')
      if (!nav) return
      nav.style.background =
        window.scrollY > 40 ? 'rgba(5,5,8,0.92)' : 'rgba(5,5,8,0.75)'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const heroReveal = () => {
      root.querySelectorAll('#hero .r0,#hero .r1,#hero .r2,#hero .r3,#hero .r4').forEach(el => {
        setTimeout(() => el.classList.add('in'), 100)
      })
    }
    if (document.readyState === 'complete') heroReveal()
    else window.addEventListener('load', heroReveal, { once: true })

    return () => {
      root.removeEventListener('click', onWlClick)
      obs.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [submitWaitlist])

  return (
    <div
      ref={rootRef}
      className={waitlistSuccess ? 'qq-wl-submitted' : undefined}
      suppressHydrationWarning
      dangerouslySetInnerHTML={landingHtml}
    />
  )
}
