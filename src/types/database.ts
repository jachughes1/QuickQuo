// src/types/database.ts
// Auto-generate with: npm run db:generate
// Manual skeleton shown here — regenerate after running migrations.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // ── Waitlist ─────────────────────────────────────
      waitlist: {
        Row: {
          id:            string
          name:          string
          email:         string
          trade:         string
          business_name: string | null
          source:        string | null
          signed_up_at:  string
          invited_at:    string | null
          notes:         string | null
        }
        Insert: {
          id?:           string
          name:          string
          email:         string
          trade:         string
          business_name?: string | null
          source?:       string | null
          signed_up_at?: string
          invited_at?:   string | null
          notes?:        string | null
        }
        Update: {
          id?:           string
          name?:         string
          email?:        string
          trade?:        string
          business_name?: string | null
          source?:       string | null
          signed_up_at?: string
          invited_at?:   string | null
          notes?:        string | null
        }
      }

      // ── Tradesman profiles (dashboard app) ───────────
      tradesman_profiles: {
        Row: {
          id:             string
          user_id:        string
          business_name:  string
          slug:           string
          trade_type:     string | null
          phone:          string | null
          whatsapp_number: string | null
          email:          string | null
          brand_color:    string
          logo_url:       string | null
          hero_image_url: string | null
          headline:       string | null
          google_review_link: string | null
          rating:         number | null
          review_count:   number
          public_page_active: boolean
          onboarding_complete: boolean
          created_at:     string
          updated_at:     string
        }
        Insert: Partial<Database['public']['Tables']['tradesman_profiles']['Row']> & {
          user_id: string
          business_name: string
          slug: string
        }
        Update: Partial<Database['public']['Tables']['tradesman_profiles']['Row']>
      }

      // ── Subscriptions ─────────────────────────────────
      subscriptions: {
        Row: {
          id:                     string
          user_id:                string
          stripe_customer_id:     string | null
          stripe_subscription_id: string | null
          stripe_price_id:        string | null
          status:                 'trialing' | 'active' | 'past_due' | 'unpaid' | 'canceled' | 'suspended'
          plan_name:              string | null
          monthly_price_gbp:      number | null
          trial_ends_at:          string | null
          current_period_start:   string | null
          current_period_end:     string | null
          cancel_at_period_end:   boolean
          canceled_at:            string | null
          created_at:             string
          updated_at:             string
        }
        Insert: Partial<Database['public']['Tables']['subscriptions']['Row']> & {
          user_id: string
        }
        Update: Partial<Database['public']['Tables']['subscriptions']['Row']>
      }

      // ── Leads ─────────────────────────────────────────
      leads: {
        Row: {
          id:               string
          tradesman_id:     string
          first_name:       string
          last_name:        string | null
          phone:            string | null
          email:            string | null
          address:          string | null
          postcode:         string | null
          job_description:  string | null
          photo_urls:       string[] | null
          voice_note_url:   string | null
          preferred_contact: 'whatsapp' | 'sms' | 'phone' | 'email'
          status:           'new' | 'contacted' | 'quote_sent' | 'won' | 'lost' | 'completed'
          source:           string | null
          notes:            string | null
          created_at:       string
          updated_at:       string
        }
        Insert: Partial<Database['public']['Tables']['leads']['Row']> & {
          tradesman_id: string
          first_name: string
        }
        Update: Partial<Database['public']['Tables']['leads']['Row']>
      }

      // ── Quotes ────────────────────────────────────────
      quotes: {
        Row: {
          id:             string
          lead_id:        string
          tradesman_id:   string
          greeting:       string | null
          summary:        string | null
          line_items:     Json
          subtotal:       number | null
          vat_rate:       number
          vat_amount:     number | null
          total:          number | null
          estimated_days: string | null
          valid_until:    string | null
          notes:          string | null
          status:         'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
          ai_generated:   boolean
          sent_at:        string | null
          viewed_at:      string | null
          accepted_at:    string | null
          rejected_at:    string | null
          created_at:     string
          updated_at:     string
        }
        Insert: Partial<Database['public']['Tables']['quotes']['Row']> & {
          lead_id: string
          tradesman_id: string
        }
        Update: Partial<Database['public']['Tables']['quotes']['Row']>
      }
    }

    Views: {
      [_ in never]: never
    }

    Functions: {
      [_ in never]: never
    }

    Enums: {
      [_ in never]: never
    }
  }
}
