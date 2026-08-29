'use client'

import type Lenis from 'lenis'
import { useEffect } from 'react'
import { motionDirector } from '@/components/motion/MotionDirector'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function SmoothScroll() {
  useEffect(() => {
    return motionDirector.start()
  }, [])

  return null
}
