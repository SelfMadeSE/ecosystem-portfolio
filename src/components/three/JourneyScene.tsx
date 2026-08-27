'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { worlds } from '@/data/worlds'
import { usePerformanceProfile } from './PerformanceManager'

type Vector3 = [number, number, number]

function Plate({ src, position, scale, rotation = [0, 0, 0], opacity = 1 }: { src: string; position: Vector3; scale: [number, number]; rotation?: Vector3; opacity?: number }) {
  const texture = useTexture(src)
  texture.colorSpace = THREE.SRGBColorSpace
  return <mesh position={position} rotation={rotation}><planeGeometry args={scale} /><meshBasicMaterial map={texture} transparent opacity={opacity} toneMapped={false} /></mesh>
}

function WorldGroup({ chapter, activeIndex, index, children }: { chapter: number; activeIndex: number; index: number; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    const active = activeIndex === index
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, active ? 0 : index < activeIndex ? 1.5 : -1.5, 3.2, delta)
    ref.current.scale.setScalar(THREE.MathUtils.damp(ref.current.scale.x, active ? 1 : 0.88, 3.2, delta))
  })
  return <group ref={ref} position={[0, 0, chapter]}>{children}</group>
}

function TimelineCamera({ activeIndex }: { activeIndex: number }) {
  const { camera, pointer, scene } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])
  const desired = useMemo(() => new THREE.Vector3(), [])
  const color = useMemo(() => new THREE.Color(), [])
  useFrame((_, delta) => {
    const chapter = worlds[activeIndex]
    desired.set(...chapter.camera.position)
    desired.x += pointer.x * 0.18
    desired.y += pointer.y * 0.12
    target.set(...chapter.camera.target)
    camera.position.lerp(desired, 1 - Math.exp(-2.6 * delta))
    camera.lookAt(target)
    color.set(chapter.camera.color)
    ;(scene.background as THREE.Color).lerp(color, 1 - Math.exp(-1.8 * delta))
  })
  return null
}

function FieldWorld({ activeIndex }: { activeIndex: number }) {
  return <WorldGroup chapter={0} activeIndex={activeIndex} index={0}><ambientLight intensity={0.65} /><directionalLight position={[-3, 5, 4]} intensity={2.2} color="#d6e7f0" /><Plate src="/media/field/rig-day.webp" position={[0, 0, -2.5]} scale={[5.3, 7]} /><Plate src="/media/field/tubulars.webp" position={[2.7, -0.7, 0.3]} scale={[2.5, 4.1]} rotation={[0, -0.32, 0]} opacity={0.96} /><mesh position={[-2.25, -2.65, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[16, 16]} /><meshStandardMaterial color="#263235" roughness={0.95} metalness={0.2} /></mesh><mesh position={[0, 0.4, -7]} rotation={[0, 0, 0]}><cylinderGeometry args={[1.9, 1.9, 9, 40, 1, true]} /><meshStandardMaterial color="#111719" side={THREE.BackSide} metalness={0.7} roughness={0.28} /></mesh></WorldGroup>
}

function RomeWorld({ activeIndex }: { activeIndex: number }) {
  return <WorldGroup chapter={-20} activeIndex={activeIndex} index={1}><ambientLight intensity={0.72} color="#ffb76e" /><pointLight position={[1, 3, -16]} intensity={20} color="#ff8e3b" distance={11} /><Plate src="/media/rome/vault.webp" position={[0, 0, -2.6]} scale={[5.2, 6.95]} /><Plate src="/media/rome/arrival.webp" position={[-3.4, -0.5, 0.7]} scale={[2.5, 1.86]} rotation={[0, 0.5, 0]} opacity={0.88} /><Plate src="/media/rome/rome-portrait.webp" position={[3.35, 0.3, 0.2]} scale={[2.45, 1.83]} rotation={[0, -0.48, 0]} opacity={0.9} /><Plate src="/media/rome/rome-two.webp" position={[0.5, -2.2, 1.4]} scale={[2.9, 2.17]} rotation={[0.1, -0.08, 0]} opacity={0.82} /><mesh position={[0, 0.2, -7]}><torusGeometry args={[2.35, 0.13, 12, 48]} /><meshStandardMaterial color="#24130c" metalness={0.75} roughness={0.24} /></mesh></WorldGroup>
}

function StudioWorld({ activeIndex }: { activeIndex: number }) {
  return <WorldGroup chapter={-40} activeIndex={activeIndex} index={2}><ambientLight intensity={0.4} /><pointLight position={[0, 2, 2]} intensity={13} color="#c8df66" distance={9} /><Plate src="/media/portrait/rylee-benson-hero-desktop.webp" position={[-1.7, 0, -2]} scale={[3.6, 4.76]} rotation={[0, 0.16, 0]} opacity={0.82} /><mesh position={[1.9, 0.25, -1.3]}><boxGeometry args={[2.9, 3.7, 0.18]} /><meshStandardMaterial color="#111817" metalness={0.78} roughness={0.2} /></mesh><mesh position={[1.9, 0.25, -1.18]}><planeGeometry args={[2.5, 1.55]} /><meshBasicMaterial color="#c8df66" transparent opacity={0.3} /></mesh><gridHelper args={[15, 15, '#546155', '#242b28']} position={[0, -2.8, 0]} /></WorldGroup>
}

function ArchiveWorld({ activeIndex }: { activeIndex: number }) {
  return <WorldGroup chapter={-60} activeIndex={activeIndex} index={3}><ambientLight intensity={0.3} /><pointLight position={[0, 2, 2]} intensity={12} color="#8b7dff" distance={9} />{[-2.5, -0.8, 0.8, 2.5].map((x, index) => <mesh key={x} position={[x, index % 2 === 0 ? 0.4 : -0.6, -1]} rotation={[0, index % 2 ? -0.15 : 0.15, 0]}><boxGeometry args={[1.15, 1.6, 0.22]} /><meshStandardMaterial color={['#24203d', '#35231d', '#10343d', '#24351c'][index]} metalness={0.7} roughness={0.22} /></mesh>)}</WorldGroup>
}

function FutureWorlds({ activeIndex }: { activeIndex: number }) {
  return <><WorldGroup chapter={-80} activeIndex={activeIndex} index={4}><ambientLight intensity={0.4} /><mesh position={[0, 0, -1]}><icosahedronGeometry args={[2.2, 2]} /><meshStandardMaterial color="#344d26" wireframe /></mesh></WorldGroup><WorldGroup chapter={-100} activeIndex={activeIndex} index={5}><ambientLight intensity={0.55} /><pointLight position={[0, 2, 2]} intensity={18} color="#c8df66" distance={10} /><mesh position={[0, 0, -1]}><torusKnotGeometry args={[1.6, 0.08, 220, 28]} /><meshStandardMaterial color="#c8df66" metalness={0.7} roughness={0.18} /></mesh></WorldGroup></>
}

function Scene({ activeIndex }: { activeIndex: number }) {
  return <><color attach="background" args={['#93a6b0']} /><fog attach="fog" args={['#111312', 8, 35]} /><TimelineCamera activeIndex={activeIndex} /><FieldWorld activeIndex={activeIndex} /><RomeWorld activeIndex={activeIndex} /><StudioWorld activeIndex={activeIndex} /><ArchiveWorld activeIndex={activeIndex} /><FutureWorlds activeIndex={activeIndex} /></>
}

export function JourneyScene({ activeIndex }: { activeIndex: number }) {
  const profile = usePerformanceProfile()
  if (!profile.enabled) return <div className="journey-canvas__fallback">Reduced-motion mode keeps the full written route available.</div>
  return <Canvas dpr={profile.dpr} camera={{ position: worlds[0].camera.position, fov: 42 }} gl={{ antialias: !profile.enabled, powerPreference: 'high-performance' }}><Suspense fallback={null}><Scene activeIndex={activeIndex} /></Suspense></Canvas>
}
