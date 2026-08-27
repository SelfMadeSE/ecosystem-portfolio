'use client'

import { Environment, Grid } from '@react-three/drei'
import type { Project } from '@/data/projects'
import { ProjectPortal } from './ProjectPortal'

export function ProjectWorld({ projects }: { projects: Project[] }) {
  const positions: [number, number, number][] = [[-2.2, 1, 0], [2.2, 1, 0], [-2.2, -1.65, 0], [2.2, -1.65, 0]]
  return <><color attach="background" args={['#0a0b0b']} /><ambientLight intensity={0.35} /><spotLight position={[0, 5, 5]} angle={0.5} penumbra={1} intensity={7} color="#e5dfd4" /><pointLight position={[-4, -2, 3]} intensity={4} color="#8b7dff" /><Environment preset="city" /><Grid position={[0, -3, 0]} args={[12, 12]} cellSize={0.5} sectionSize={2} fadeDistance={10} cellColor="#22302a" sectionColor="#405244" infiniteGrid />{projects.map((project, index) => <ProjectPortal key={project.slug} project={project} position={positions[index]} />)}</>
}
