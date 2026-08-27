'use client'

import { useEffect, useState } from 'react'

export function usePerformanceProfile() {
  const [profile, setProfile] = useState({ dpr: 1, enabled: true })
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const constrained = window.matchMedia('(max-width: 700px)').matches || navigator.hardwareConcurrency <= 4
    setProfile({ dpr: constrained ? 1 : Math.min(window.devicePixelRatio, 1.5), enabled: !reduced })
  }, [])
  return profile
}
