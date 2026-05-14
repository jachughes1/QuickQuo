-- ============================================================
-- QuickQuo — Waitlist table migration
-- Run in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- WAITLIST
CREATE TABLE IF NOT EXISTS public.waitlist (
  id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT         NOT NULL,
  email          TEXT         NOT NULL UNIQUE,
  trade          TEXT         NOT NULL,
  business_name  TEXT,
  source         TEXT         DEFAULT 'landing_page',
  signed_up_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  invited_at     TIMESTAMPTZ,
  notes          TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_waitlist_email
  ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_trade
  ON public.waitlist(trade);
CREATE INDEX IF NOT EXISTS idx_waitlist_signed_up
  ON public.waitlist(signed_up_at DESC);

-- Row-Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Only service role has access (API route uses service key)
CREATE POLICY "service_only"
  ON public.waitlist FOR ALL
  USING (auth.role() = 'service_role');

-- ── Admin summary view (useful for super admin dashboard) ──
CREATE OR REPLACE VIEW public.waitlist_summary AS
SELECT
  COUNT(*)                                                     AS total_signups,
  COUNT(*) FILTER (WHERE signed_up_at > NOW() - INTERVAL '24h')  AS last_24h,
  COUNT(*) FILTER (WHERE signed_up_at > NOW() - INTERVAL '7d')   AS last_7_days,
  COUNT(*) FILTER (WHERE signed_up_at > NOW() - INTERVAL '30d')  AS last_30_days,
  COUNT(*) FILTER (WHERE invited_at IS NULL)                     AS pending_invite
FROM public.waitlist;

-- ── By trade breakdown ─────────────────────────────────────
CREATE OR REPLACE VIEW public.waitlist_by_trade AS
SELECT
  trade,
  COUNT(*) AS count
FROM public.waitlist
GROUP BY trade
ORDER BY count DESC;
