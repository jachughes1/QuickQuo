import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

// ── Metadata ───────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://quickquo.co.uk'),
  title: {
    default:  'QuickQuo — Never Lose A Lead Again',
    template: '%s | QuickQuo',
  },
  description:
    'The AI receptionist for trades businesses. Reply instantly, quote faster, win more jobs — without the admin.',
  keywords: [
    'trades business software',
    'AI quotes',
    'roofer CRM',
    'plumber leads',
    'missed call reply',
    'WhatsApp automation',
    'tradesman app UK',
  ],
  authors: [{ name: 'QuickQuo', url: 'https://quickquo.co.uk' }],
  creator: 'QuickQuo',
  openGraph: {
    type:      'website',
    locale:    'en_GB',
    url:       'https://quickquo.co.uk',
    siteName:  'QuickQuo',
    title:     'QuickQuo — Never Lose A Lead Again',
    description:
      'AI-powered lead capture, instant quoting, and automated follow-ups for UK trades businesses.',
    images: [
      {
        url:    '/og-image.png',   // 1200×630 — create in /public
        width:  1200,
        height: 630,
        alt:    'QuickQuo dashboard preview',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'QuickQuo — Never Lose A Lead Again',
    description: 'AI-powered lead capture and quoting for UK trades businesses.',
    images:      ['/og-image.png'],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon:    [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
    apple:   '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor:         '#050508',
  colorScheme:        'dark',
  width:              'device-width',
  initialScale:       1,
  maximumScale:       5,
}

// ── Layout ─────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Instrument Serif — display/heading font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-white antialiased">
        {children}
      </body>
    </html>
  )
}
