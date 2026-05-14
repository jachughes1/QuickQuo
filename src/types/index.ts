// src/types/index.ts
// Shared application types used across components and API routes.

// ── Waitlist ───────────────────────────────────────────────
export type TradeType =
  | 'roofer'
  | 'plumber'
  | 'electrician'
  | 'carpenter'
  | 'landscaper'
  | 'bathroom-fitter'
  | 'painter-decorator'
  | 'other'

export interface WaitlistEntry {
  name:          string
  email:         string
  trade:         TradeType
  business_name?: string
}

// ── Subscription ───────────────────────────────────────────
export type SubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'unpaid'
  | 'canceled'
  | 'suspended'

export type PlanName = 'Starter' | 'Pro' | 'Agency'

// ── Lead ──────────────────────────────────────────────────
export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'quote_sent'
  | 'won'
  | 'lost'
  | 'completed'

export type ContactMethod = 'whatsapp' | 'sms' | 'phone' | 'email'

// ── Quote ─────────────────────────────────────────────────
export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'

export interface QuoteLineItem {
  label:  string
  amount: number
}

// ── API response helpers ───────────────────────────────────
export interface ApiSuccess<T = void> {
  success: true
  data?:   T
}

export interface ApiError {
  success: false
  error:   string
  details?: Record<string, string[]>
}

export type ApiResponse<T = void> = ApiSuccess<T> | ApiError

// ── User roles ─────────────────────────────────────────────
export type UserRole = 'tradesman' | 'admin'
