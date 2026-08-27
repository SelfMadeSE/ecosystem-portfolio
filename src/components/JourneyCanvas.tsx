'use client'

import dynamic from 'next/dynamic'

const JourneyScene = dynamic(() => import('@/components/three/JourneyScene').then((module) => module.JourneyScene), { ssr: false, loading: () => <div className="journey-canvas__loading">Loading the route…</div> })

export function JourneyCanvas({ activeIndex }: { activeIndex: number }) {
  return <JourneyScene activeIndex={activeIndex} />
}
