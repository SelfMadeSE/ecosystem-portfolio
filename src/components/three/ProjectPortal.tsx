'use client'

import { Float, Html, RoundedBox } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import type { Project } from '@/data/projects'
import { MediaScreen } from './MediaScreen'

const colors: Record<Project['accent'], string> = { violet: '#8b7dff', orange: '#f18b4b', cyan: '#4ccce8', lime: '#a3c96a' }

export function ProjectPortal({ project, position }: { project: Project; position: [number, number, number] }) {
  const router = useRouter()
  const color = colors[project.accent]
  const open = () => router.push(`/projects/${project.slug}`)
  const common = { onClick: open, onPointerOver: () => { document.body.style.cursor = 'pointer' }, onPointerOut: () => { document.body.style.cursor = 'auto' } }
  return <group position={position}><Float floatIntensity={0.25} rotationIntensity={0.08} speed={1.2}><group {...common}>
    {project.slug === 'game-studio' && <><RoundedBox args={[2.15, 1.42, 0.3]} radius={0.08} smoothness={4}><meshStandardMaterial color="#151328" metalness={0.65} roughness={0.2} /></RoundedBox><MediaScreen src={project.media.src} /></>}
    {project.slug === 'musestudio' && <><mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.95, 0.95, 0.22, 48]} /><meshStandardMaterial color="#171217" metalness={0.8} roughness={0.15} /></mesh><mesh position={[0, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.55, 0.04, 8, 32]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} /></mesh><MediaScreen src={project.media.src} aspect={1.65} /></>}
    {project.slug === 'outbound-autonomy' && <><RoundedBox args={[2.15, 1.42, 0.24]} radius={0.12} smoothness={4}><meshPhysicalMaterial color="#0c2730" transmission={0.06} metalness={0.45} roughness={0.1} /></RoundedBox><MediaScreen src={project.media.src} /></>}
    {project.slug === 'autonomous-operations' && <><mesh><icosahedronGeometry args={[0.95, 2]} /><meshStandardMaterial color="#263019" wireframe metalness={0.7} roughness={0.4} /></mesh><mesh rotation={[0.5, 0.6, 0]}><torusGeometry args={[1.2, 0.04, 12, 48]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} /></mesh><MediaScreen src={project.media.src} aspect={1.3} /></>}
  </group></Float><Html position={[0, -1.28, 0]} center transform distanceFactor={9}><button className="portal-label" onClick={open}><span>{project.number}</span>{project.title}</button></Html></group>
}
