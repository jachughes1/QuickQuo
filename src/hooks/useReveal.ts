// src/hooks/useReveal.ts
// Intersection observer hook — returns ref + visible boolean.
// Applies once: element fades in and stays visible.

import { useEffect, useRef, useState } from 'react'

interface Options {
  threshold?: number
  rootMargin?: string
}

export function useReveal({ threshold = 0.12, rootMargin = '0px' }: Options = {}) {
  const ref     = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el) // fire once only
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, visible }
}
