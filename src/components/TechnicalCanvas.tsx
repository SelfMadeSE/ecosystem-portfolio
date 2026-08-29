'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useMotionPreferences } from '@/components/motion/useMotionPreferences'

const TechnicalScene = dynamic(() => import('@/components/three/TechnicalScene').then((module) => module.TechnicalScene), { ssr: false })

export function TechnicalCanvas({ variant = 'studio' }: { variant?: 'hero' | 'studio' }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [nearViewport, setNearViewport] = useState(false)
  const { reducedMotion, coarsePointer, pageVisible } = useMotionPreferences()

  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setNearViewport(entry.isIntersecting), { rootMargin: '240px 0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const shouldRender = nearViewport && pageVisible && !reducedMotion && !coarsePointer

  return <div ref={containerRef} className="technical-canvas">
    {shouldRender ? <TechnicalScene variant={variant} /> : <div className="technical-canvas__fallback" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>}
  </div>
}
