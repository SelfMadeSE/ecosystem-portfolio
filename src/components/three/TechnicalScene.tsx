'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const nodes: Array<{ position: [number, number, number]; color: string; scale: number }> = [
  { position: [-2.8, 1.35, 0], color: '#ff8a50', scale: 0.28 },
  { position: [-1.15, 0.75, 0.24], color: '#8ca7ff', scale: 0.24 },
  { position: [0.55, 1.15, -0.16], color: '#61dff5', scale: 0.3 },
  { position: [2.32, 0.25, 0.12], color: '#ffb66d', scale: 0.26 },
  { position: [0.8, -1.3, 0.1], color: '#ff8a50', scale: 0.25 },
  { position: [-1.5, -1.15, -0.12], color: '#61dff5', scale: 0.22 },
]

function HeroInstrument() {
  const group = useRef<THREE.Group>(null)

  useFrame(({ pointer, clock }, delta) => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.42 + pointer.x * 0.24, 2.1, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.16 - pointer.y * 0.14, 2.1, delta)
    group.current.position.y = Math.sin(clock.elapsedTime * 0.42) * 0.1
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.22) * 0.025
  })

  return <group ref={group} position={[0.35, 0, 0]} rotation={[0.16, -0.42, 0]}>
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.84, 0.84, 4.8, 64, 1, true]} />
      <meshPhysicalMaterial color="#1a2928" metalness={0.9} roughness={0.18} transparent opacity={0.46} side={THREE.DoubleSide} />
    </mesh>
    <mesh rotation={[0, Math.PI / 2, 0]}>
      <cylinderGeometry args={[0.36, 0.36, 5.25, 48, 1, true]} />
      <meshBasicMaterial color="#60dff4" transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
    {[-1.95, -0.68, 0.68, 1.96].map((x, index) => <group key={x} position={[x, 0, 0]}>
      <mesh rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[index % 2 ? 0.61 : 0.9, 0.035, 12, 72]} /><meshBasicMaterial color={index % 2 ? '#61dff5' : '#ff8a50'} transparent opacity={0.92} /></mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[index % 2 ? 0.88 : 1.14, 0.014, 10, 72]} /><meshBasicMaterial color={index % 2 ? '#ff8a50' : '#61dff5'} transparent opacity={0.44} /></mesh>
    </group>)}
    {[[ -2.65, -1.35, 1.6 ], [ -1.62, 1.45, -1.42 ], [ -0.2, -1.68, 1.2 ], [ 1.3, 1.58, -1.18 ], [ 2.75, -1.1, 1.45 ]].map((position, index) => <mesh key={index} position={position as [number, number, number]}><icosahedronGeometry args={[0.075, 2]} /><meshBasicMaterial color={index % 2 ? '#61dff5' : '#ff8a50'} /></mesh>)}
    <Line points={[[-2.65, -1.35, 1.6], [-1.62, 1.45, -1.42], [-0.2, -1.68, 1.2], [1.3, 1.58, -1.18], [2.75, -1.1, 1.45]]} color="#ff8a50" transparent opacity={0.72} lineWidth={1.1} />
    <Line points={[[-2.7, 1.55, -1.25], [-1.22, -1.65, 1.15], [0.9, 1.4, 1.3], [2.78, -1.48, -0.8]]} color="#61dff5" transparent opacity={0.63} lineWidth={0.82} />
  </group>
}

function SystemTopology() {
  const group = useRef<THREE.Group>(null)
  const points = useMemo(() => nodes.map((node) => node.position), [])

  useFrame(({ pointer, clock }, delta) => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.13, 2.2, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.08, 2.2, delta)
    group.current.position.y = Math.sin(clock.elapsedTime * 0.38) * 0.055
  })

  return <group ref={group}>
    <Line points={[points[0], points[1], points[2], points[3]]} color="#ff8a50" transparent opacity={0.72} lineWidth={1.05} />
    <Line points={[points[3], points[4], points[5], points[0]]} color="#61dff5" transparent opacity={0.56} lineWidth={0.9} />
    <Line points={[points[1], points[5]]} color="#a89dff" transparent opacity={0.48} lineWidth={0.72} dashed dashScale={4} dashSize={0.2} gapSize={0.15} />
    {nodes.map((node, index) => <group key={index} position={node.position}>
      <mesh><sphereGeometry args={[node.scale, 28, 28]} /><meshBasicMaterial color={node.color} transparent opacity={0.96} /></mesh>
      <mesh scale={1.95}><sphereGeometry args={[node.scale, 28, 28]} /><meshBasicMaterial color={node.color} transparent opacity={0.1} /></mesh>
    </group>)}
  </group>
}

export function TechnicalScene({ variant = 'studio' }: { variant?: 'hero' | 'studio' }) {
  return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.2], fov: 40 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
    <ambientLight intensity={0.65} />
    <pointLight position={[2.5, 2.8, 3.2]} color="#ff8a50" intensity={12} distance={11} />
    <pointLight position={[-3.2, -1, 3]} color="#61dff5" intensity={8} distance={10} />
    {variant === 'hero' ? <HeroInstrument /> : <SystemTopology />}
  </Canvas>
}
