'use client'

import dynamic from 'next/dynamic'
import type { Project } from '@/data/projects'

const PortfolioScene = dynamic(() => import('@/components/three/PortfolioScene').then((module) => module.PortfolioScene), { ssr: false, loading: () => <div className="spatial-loading">Preparing spatial archive…</div> })

export function SpatialGallery({ projects }: { projects: Project[] }) {
  return <div className="spatial-gallery" aria-label="Interactive spatial product archive"><PortfolioScene projects={projects} /></div>
}
