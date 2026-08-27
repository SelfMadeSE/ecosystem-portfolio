'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import type { Project } from '@/data/projects'
import { CameraRig } from './CameraRig'
import { usePerformanceProfile } from './PerformanceManager'
import { ProjectWorld } from './ProjectWorld'

export function PortfolioScene({ projects }: { projects: Project[] }) {
  const profile = usePerformanceProfile()
  if (!profile.enabled) return <div className="spatial-fallback">Spatial archive paused for reduced motion. Explore the selected-work case studies above.</div>
  return <Canvas dpr={profile.dpr} frameloop="demand" camera={{ position: [0, 0, 7], fov: 42 }} gl={{ antialias: false, powerPreference: 'high-performance' }}><Suspense fallback={null}><CameraRig enabled={profile.enabled} /><ProjectWorld projects={projects} /></Suspense></Canvas>
}
