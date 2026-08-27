'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { worlds } from '@/data/worlds'
import { usePerformanceProfile } from './PerformanceManager'

type Vector3 = [number, number, number]

type PhotoPlaneProps = {
  src: string
  position: Vector3
  scale: [number, number]
  rotation?: Vector3
  opacity?: number
  drift?: number
}

function PhotoPlane({ src, position, scale, rotation = [0, 0, 0], opacity = 1, drift = 0.04 }: PhotoPlaneProps) {
  const texture = useTexture(src)
  const ref = useRef<THREE.Mesh>(null)
  texture.colorSpace = THREE.SRGBColorSpace
  useFrame(({ pointer, clock }) => {
    if (!ref.current) return
    ref.current.position.x = position[0] + pointer.x * drift
    ref.current.position.y = position[1] + pointer.y * drift * 0.6 + Math.sin(clock.elapsedTime * 0.26 + position[2]) * 0.018
  })
  return <mesh ref={ref} position={position} rotation={rotation}>
    <planeGeometry args={scale} />
    <meshBasicMaterial map={texture} transparent opacity={opacity} toneMapped={false} />
  </mesh>
}

function CameraDrift({ activeIndex }: { activeIndex: number }) {
  const { camera, pointer, scene } = useThree()
  const desired = useMemo(() => new THREE.Vector3(), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  const color = useMemo(() => new THREE.Color(), [])
  useFrame((_, delta) => {
    const chapter = worlds[activeIndex]
    desired.set(...chapter.camera.position)
    desired.x += pointer.x * 0.13
    desired.y += pointer.y * 0.09
    target.set(...chapter.camera.target)
    camera.position.lerp(desired, 1 - Math.exp(-2.1 * delta))
    camera.lookAt(target)
    color.set(chapter.camera.color)
    ;(scene.background as THREE.Color).lerp(color, 1 - Math.exp(-1.5 * delta))
  })
  return null
}

function Chapter({ z, activeIndex, index, children }: { z: number; activeIndex: number; index: number; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (!group.current) return
    const distance = activeIndex - index
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, distance === 0 ? 0 : distance > 0 ? 1.4 : -1.4, 3.2, delta)
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, distance === 0 ? 1 : 0.9, 3.2, delta))
  })
  return <group ref={group} position={[0, 0, z]}>{children}</group>
}

function StoryPhotos({ activeIndex }: { activeIndex: number }) {
  return <>
    <Chapter z={0} activeIndex={activeIndex} index={0}>
      <PhotoPlane src="/media/field/field-hero-safe.jpg" position={[0, 0, -2.7]} scale={[6.35, 4.35]} drift={0.055} />
      <PhotoPlane src="/media/field/field-detail-safe.jpg" position={[2.55, -0.8, -0.45]} scale={[1.58, 3.6]} rotation={[0, -0.14, 0]} opacity={0.82} />
    </Chapter>
    <Chapter z={-20} activeIndex={activeIndex} index={1}>
      <PhotoPlane src="/media/travel/rome-plate-01.jpg" position={[0, 0, -2.8]} scale={[6.4, 4.35]} drift={0.045} />
      <PhotoPlane src="/media/travel/rome-personal-bench.jpg" position={[-2.45, -0.85, -0.4]} scale={[1.65, 2.3]} rotation={[0, 0.15, 0]} opacity={0.86} />
      <PhotoPlane src="/media/travel/rome-plate-03.jpg" position={[2.55, -0.2, -0.3]} scale={[1.78, 2.55]} rotation={[0, -0.16, 0]} opacity={0.82} />
    </Chapter>
    <Chapter z={-40} activeIndex={activeIndex} index={2}>
      <PhotoPlane src="/media/founder/current-portrait-3498.jpg" position={[-1.35, 0, -2.1]} scale={[3.18, 4.25]} rotation={[0, 0.07, 0]} opacity={0.76} />
      <PhotoPlane src="/media/game-studio/studio-surface.jpg" position={[1.85, 0.1, -1.6]} scale={[3.1, 2.02]} rotation={[0, -0.1, 0]} opacity={0.6} />
    </Chapter>
    <Chapter z={-60} activeIndex={activeIndex} index={3}>
      <PhotoPlane src="/media/game-studio/studio-surface.jpg" position={[-2.15, 0.25, -2.4]} scale={[2.8, 1.84]} rotation={[0, 0.12, 0]} opacity={0.68} />
      <PhotoPlane src="/media/musestudio/muse-editor.png" position={[1.95, -0.05, -2.05]} scale={[3.05, 2]} rotation={[0, -0.1, 0]} opacity={0.65} />
    </Chapter>
    <Chapter z={-80} activeIndex={activeIndex} index={4}>
      <PhotoPlane src="/media/travel/spain-plate-01.jpg" position={[0, 0, -2.6]} scale={[6.2, 4.2]} opacity={0.74} />
      <PhotoPlane src="/media/travel/spain-plate-02.jpg" position={[2.55, -1, -0.45]} scale={[1.6, 2.22]} rotation={[0, -0.12, 0]} opacity={0.8} />
    </Chapter>
    <Chapter z={-100} activeIndex={activeIndex} index={5}>
      <PhotoPlane src="/media/founder/current-portrait-3498.jpg" position={[0, 0, -2.5]} scale={[3.05, 4.06]} opacity={0.62} />
    </Chapter>
  </>
}

function Scene({ activeIndex }: { activeIndex: number }) {
  return <>
    <color attach="background" args={['#111513']} />
    <fog attach="fog" args={['#101311', 5, 28]} />
    <CameraDrift activeIndex={activeIndex} />
    <StoryPhotos activeIndex={activeIndex} />
  </>
}

export function JourneyScene({ activeIndex }: { activeIndex: number }) {
  const profile = usePerformanceProfile()
  if (!profile.enabled) return <div className="journey-canvas__fallback">Reduced-motion mode keeps the full written route and still media available.</div>
  return <Canvas dpr={profile.dpr} camera={{ position: worlds[0].camera.position, fov: 42 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
    <Suspense fallback={null}><Scene activeIndex={activeIndex} /></Suspense>
  </Canvas>
}
