import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        serif:   ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        mono:    ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#050508',
          2: '#08080f',
          3: '#0c0c17',
        },
        card: {
          DEFAULT: '#0e0e1c',
          2: '#121228',
        },
        purple: {
          DEFAULT: '#8b5cf6',
          2: '#a78bfa',
          3: '#c4b5fd',
          4: '#ddd6fe',
          dim: 'rgba(139,92,246,0.12)',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.055)',
          2: 'rgba(255,255,255,0.10)',
          3: 'rgba(255,255,255,0.15)',
        },
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        'hero-glow':
          'radial-gradient(ellipse 70% 55% at 50% -10%, rgba(139,92,246,.22) 0%, transparent 70%)',
      },
      boxShadow: {
        'purple-sm': '0 0 20px rgba(139,92,246,0.3)',
        'purple-md': '0 0 36px rgba(139,92,246,0.32)',
        'purple-lg': '0 0 56px rgba(139,92,246,0.52)',
        'card':      '0 40px 100px rgba(0,0,0,0.85)',
      },
      animation: {
        'badge-pulse': 'badgePulse 2.4s ease infinite',
        'float':       'float 6s ease-in-out infinite',
        'float-r':     'floatR 5s ease-in-out infinite',
        'shake':       'shake 0.35s ease',
      },
      keyframes: {
        badgePulse: {
          '0%,100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(167,139,250,0.6)' },
          '50%':     { opacity: '0.5', boxShadow: '0 0 0 6px rgba(167,139,250,0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(-8px)' },
          '50%':     { transform: 'translateY(8px)' },
        },
        floatR: {
          '0%,100%': { transform: 'translateY(6px)' },
          '50%':     { transform: 'translateY(-6px)' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%':     { transform: 'translateX(-6px)' },
          '40%':     { transform: 'translateX(6px)' },
          '60%':     { transform: 'translateX(-4px)' },
          '80%':     { transform: 'translateX(4px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
