// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely — replaces conflicting utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a GBP amount — e.g. 1300 → "£1,300" */
export function formatGBP(pence: number): string {
  return new Intl.NumberFormat('en-GB', {
    style:    'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(pence)
}

/** Format a date to UK locale — e.g. "12 May 2025" */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  }).format(typeof date === 'string' ? new Date(date) : date)
}

/** Slugify a string — e.g. "John's Roofing" → "johns-roofing" */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Truncate text to maxLength, adding ellipsis. */
export function truncate(str: string, maxLength: number): string {
  return str.length <= maxLength ? str : `${str.slice(0, maxLength)}…`
}

/** Capitalise first letter of each word. */
export function titleCase(str: string): string {
  return str.replace(/\b\w/g, l => l.toUpperCase())
}

/** Trade label map — converts DB enum to display string. */
export const TRADE_LABELS: Record<string, string> = {
  'roofer':            'Roofer',
  'plumber':           'Plumber',
  'electrician':       'Electrician',
  'carpenter':         'Carpenter',
  'landscaper':        'Landscaper',
  'bathroom-fitter':   'Bathroom Fitter',
  'painter-decorator': 'Painter & Decorator',
  'other':             'Other',
}
