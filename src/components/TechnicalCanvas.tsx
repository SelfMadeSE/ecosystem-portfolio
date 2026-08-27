'use client'

import dynamic from 'next/dynamic'

const TechnicalScene = dynamic(() => import('@/components/three/TechnicalScene').then((module) => module.TechnicalScene), { ssr: false })

export function TechnicalCanvas() {
  return <TechnicalScene />
}
