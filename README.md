# QuickQuo — Production Codebase

**"The AI receptionist for trades businesses."**

> Never lose a lead again. AI-powered lead capture, instant quoting,
> WhatsApp automation, and missed call follow-ups for UK trades businesses.

---

## Project Structure

```
quickquo/
│
├── 📄 package.json               # All dependencies & scripts
├── 📄 tsconfig.json              # TypeScript config
├── 📄 next.config.js             # Next.js config (images, headers, redirects)
├── 📄 tailwind.config.ts         # Tailwind theme (colours, fonts, animations)
├── 📄 postcss.config.js          # PostCSS (Tailwind + Autoprefixer)
├── 📄 .env.example               # Environment variable template
├── 📄 .gitignore
│
├── 📁 src/
│   │
│   ├── 📁 app/                   # Next.js 14 App Router
│   │   │
│   │   ├── 📄 layout.tsx         # Root layout — fonts, metadata, viewport
│   │   ├── 📄 globals.css        # Global styles, CSS vars, Tailwind base
│   │   ├── 📄 page.tsx           # Landing page (server component)
│   │   │
│   │   ├── 📁 api/
│   │   │   ├── 📁 waitlist/
│   │   │   │   └── 📄 route.ts   # POST — save to Supabase, send email
│   │   │   │
│   │   │   ├── 📁 leads/         # (Dashboard app — add when building)
│   │   │   │   ├── 📄 route.ts
│   │   │   │   └── 📁 [id]/
│   │   │   │       └── 📄 route.ts
│   │   │   │
│   │   │   ├── 📁 quotes/
│   │   │   │   ├── 📄 route.ts
│   │   │   │   └── 📁 generate/
│   │   │   │       └── 📄 route.ts   # AI quote generation
│   │   │   │
│   │   │   └── 📁 webhooks/
│   │   │       ├── 📁 stripe/
│   │   │       │   └── 📄 route.ts   # Stripe subscription events
│   │   │       └── 📁 twilio/
│   │   │           └── 📄 route.ts   # Missed call → auto-SMS
│   │   │
│   │   ├── 📁 (landing)/         # Landing page route group (no layout change)
│   │   │
│   │   ├── 📁 (auth)/            # Auth pages — login, signup
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 signup/
│   │   │       └── 📄 page.tsx
│   │   │
│   │   ├── 📁 (dashboard)/       # Tradesman dashboard — auth-gated
│   │   │   ├── 📄 layout.tsx     # Sidebar + subscription check
│   │   │   ├── 📄 page.tsx       # Dashboard home
│   │   │   ├── 📁 leads/
│   │   │   ├── 📁 quotes/
│   │   │   ├── 📁 pipeline/
│   │   │   ├── 📁 missed-calls/
│   │   │   ├── 📁 conversations/
│   │   │   ├── 📁 reviews/
│   │   │   ├── 📁 onboarding/
│   │   │   └── 📁 settings/
│   │   │       ├── 📄 page.tsx
│   │   │       ├── 📁 billing/
│   │   │       ├── 📁 automations/
│   │   │       └── 📁 integrations/
│   │   │
│   │   ├── 📁 (admin)/           # Super admin — admin role only
│   │   │   ├── 📄 layout.tsx
│   │   │   ├── 📄 page.tsx
│   │   │   ├── 📁 accounts/
│   │   │   ├── 📁 billing/
│   │   │   ├── 📁 analytics/
│   │   │   └── 📁 waitlist/      # View/manage waitlist entries
│   │   │
│   │   └── 📁 [slug]/            # Public quote page per tradesman
│   │       └── 📄 page.tsx       # quickquo.co.uk/johnsroofing
│   │
│   ├── 📁 components/
│   │   │
│   │   ├── 📁 landing/           # Landing page sections
│   │   │   ├── 📄 Navbar.tsx
│   │   │   ├── 📄 Hero.tsx
│   │   │   ├── 📄 NumbersStrip.tsx
│   │   │   ├── 📄 ProblemSection.tsx
│   │   │   ├── 📄 FeaturesSection.tsx
│   │   │   ├── 📄 HowItWorks.tsx
│   │   │   ├── 📄 MobileAppSection.tsx
│   │   │   ├── 📄 Testimonials.tsx
│   │   │   ├── 📄 WaitlistSection.tsx  ← Full form + API call
│   │   │   ├── 📄 FinalCTA.tsx
│   │   │   └── 📄 Footer.tsx
│   │   │
│   │   ├── 📁 ui/                # Reusable primitives
│   │   │   ├── 📄 Button.tsx
│   │   │   ├── 📄 Card.tsx
│   │   │   ├── 📄 Input.tsx
│   │   │   ├── 📄 Select.tsx
│   │   │   ├── 📄 Badge.tsx
│   │   │   ├── 📄 Modal.tsx
│   │   │   ├── 📄 Toast.tsx
│   │   │   └── 📄 Spinner.tsx
│   │   │
│   │   ├── 📁 dashboard/         # Dashboard-specific components
│   │   │   ├── 📄 Sidebar.tsx
│   │   │   ├── 📄 MobileNav.tsx
│   │   │   ├── 📄 KPICard.tsx
│   │   │   ├── 📄 LeadCard.tsx
│   │   │   ├── 📄 QuoteEditor.tsx
│   │   │   ├── 📄 KanbanBoard.tsx
│   │   │   ├── 📄 MissedCallsPanel.tsx
│   │   │   └── 📄 SubscriptionBanner.tsx
│   │   │
│   │   └── 📁 public-page/       # Customer-facing quote form
│   │       ├── 📄 QuoteForm.tsx
│   │       ├── 📄 HeroSection.tsx
│   │       └── 📄 SuccessState.tsx
│   │
│   ├── 📁 lib/
│   │   ├── 📁 supabase/
│   │   │   ├── 📄 client.ts      # Browser client
│   │   │   └── 📄 server.ts      # Server + service-role client
│   │   │
│   │   ├── 📁 email/
│   │   │   ├── 📄 waitlist-email.ts     # Confirmation email HTML
│   │   │   ├── 📄 quote-email.ts        # Quote delivery email
│   │   │   └── 📄 review-request.ts     # Review request email
│   │   │
│   │   ├── 📁 stripe/
│   │   │   ├── 📄 client.ts
│   │   │   └── 📄 plans.ts       # Plan definitions + price IDs
│   │   │
│   │   ├── 📁 openai/
│   │   │   └── 📄 quote.ts       # AI quote generation
│   │   │
│   │   ├── 📁 twilio/
│   │   │   └── 📄 client.ts      # SMS / WhatsApp helpers
│   │   │
│   │   └── 📄 utils.ts           # cn(), formatGBP(), slugify(), etc.
│   │
│   ├── 📁 hooks/
│   │   ├── 📄 useReveal.ts       # Scroll-triggered reveal animation
│   │   ├── 📄 useLeads.ts        # Real-time leads subscription
│   │   ├── 📄 useSubscription.ts # Stripe subscription status
│   │   └── 📄 useToast.ts        # Toast notification helper
│   │
│   ├── 📁 types/
│   │   ├── 📄 database.ts        # Supabase generated types
│   │   └── 📄 index.ts           # Shared TypeScript types
│   │
│   └── 📁 middleware.ts          # Route auth + subscription guard
│
├── 📁 public/
│   ├── 📄 manifest.json          # PWA manifest
│   ├── 📄 robots.txt
│   ├── 📄 sitemap.xml            # (generate with next-sitemap)
│   ├── 📄 favicon.ico
│   ├── 📄 og-image.png           # 1200×630 Open Graph image
│   ├── 📄 apple-touch-icon.png   # 180×180
│   └── 📁 icons/
│       ├── 📄 icon-72.png
│       ├── 📄 icon-96.png
│       ├── 📄 icon-128.png
│       ├── 📄 icon-192.png
│       └── 📄 icon-512.png
│
└── 📁 supabase/
    └── 📁 migrations/
        ├── 📄 001_waitlist.sql         # Waitlist table + RLS
        ├── 📄 002_users.sql            # Auth users extension
        ├── 📄 003_tradesman_profiles.sql
        ├── 📄 004_subscriptions.sql
        ├── 📄 005_leads.sql
        ├── 📄 006_quotes.sql
        ├── 📄 007_missed_calls.sql
        ├── 📄 008_automations.sql
        └── 📄 009_admin_actions.sql
```

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/your-org/quickquo.git
cd quickquo
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
# Fill in Supabase URL, anon key, service role key, Resend API key
```

### 3. Set up Supabase

```bash
# Option A — Supabase CLI (recommended)
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_ID
supabase db push

# Option B — Paste each migration file into the Supabase SQL Editor
```

### 4. Set up Resend

1. Sign up at [resend.com](https://resend.com)
2. Add and verify domain: `quickquo.co.uk`
3. Add DNS records (SPF + DKIM) — Resend provides these
4. Create API key → paste into `RESEND_API_KEY`

### 5. Run locally

```bash
npm run dev
# → http://localhost:3000
```

### 6. Type check

```bash
npm run type-check

# Regenerate Supabase types after schema changes:
npm run db:generate
```

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Add environment variables (or do this in the Vercel dashboard)
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add RESEND_API_KEY production
vercel env add OWNER_EMAIL production
vercel env add NEXT_PUBLIC_DEMO_URL production
vercel env add NEXT_PUBLIC_APP_URL production

# Deploy
vercel --prod
```

### Domain setup (Vercel)

1. Vercel Dashboard → Project → Settings → Domains
2. Add `quickquo.co.uk` and `www.quickquo.co.uk`
3. At your DNS registrar, add:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | ✅ | Full URL (e.g. `https://quickquo.co.uk`) |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key (server-only) |
| `RESEND_API_KEY` | ✅ | Resend email API key |
| `OWNER_EMAIL` | ✅ | Your email — receives signup alerts |
| `NEXT_PUBLIC_DEMO_URL` | ✅ | Link to the QuickQuo beta demo |
| `STRIPE_SECRET_KEY` | Dashboard | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Dashboard | Stripe webhook signing secret |
| `TWILIO_ACCOUNT_SID` | Dashboard | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | Dashboard | Twilio auth token |
| `OPENAI_API_KEY` | Dashboard | OpenAI API key for AI quoting |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Email | Resend |
| Payments | Stripe |
| SMS / Calls | Twilio |
| AI Quoting | OpenAI GPT-4o-mini |
| Deployment | Vercel |
| PWA | Web App Manifest + Service Worker |

---

## Key Scripts

```bash
npm run dev          # Start dev server on :3000
npm run build        # Production build
npm run start        # Serve production build locally
npm run lint         # ESLint
npm run type-check   # TypeScript check (no emit)
npm run db:generate  # Regenerate Supabase TypeScript types
```

---

## Go-Live Checklist

- [ ] All env vars set in Vercel
- [ ] Supabase migrations run
- [ ] Resend domain verified (SPF + DKIM records active)
- [ ] Full waitlist flow tested end-to-end
- [ ] Confirmation email received and renders correctly
- [ ] `NEXT_PUBLIC_DEMO_URL` set to real demo
- [ ] `og-image.png` (1200×630) created and placed in `/public`
- [ ] `apple-touch-icon.png` (180×180) created
- [ ] App icons created (72, 96, 128, 192, 512px) in `/public/icons/`
- [ ] Privacy Policy page added at `/privacy`
- [ ] Terms page added at `/terms`
- [ ] robots.txt domain updated to `quickquo.co.uk`
- [ ] Google Search Console verified
- [ ] Error monitoring (Sentry) wired up
- [ ] Analytics (Posthog or GA4) added
- [ ] Domain SSL active (auto via Vercel)
