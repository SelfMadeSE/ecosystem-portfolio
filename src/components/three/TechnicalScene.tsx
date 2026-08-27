'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Line, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Instrument() {
  const group = useRef<THREE.Group>(null)
  useFrame(({ pointer, clock }, delta) => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.36 + pointer.x * 0.2, 2.4, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.12 - pointer.y * 0.12, 2.4, delta)
    group.current.position.y = Math.sin(clock.elapsedTime * 0.45) * 0.08
  })
  return <group ref={group} position={[1.9, -0.05, 0]} rotation={[0.12, -0.36, 0]}>
    <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.72, 0.72, 3.8, 64, 1, true]} /><meshPhysicalMaterial color="#1a2524" metalness={0.86} roughness={0.19} transparent opacity={0.42} side={THREE.DoubleSide} /></mesh>
    {[[-1.42, 0.95], [-0.42, 0.58], [0.64, 0.82], [1.52, 0.46]].map(([x, radius], index) => <mesh key={index} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[radius, 0.026, 12, 72]} /><meshBasicMaterial color={index % 2 ? '#5ee9ff' : '#d9ff5f'} transparent opacity={0.84} /></mesh>)}
    {[[-2.3, -1.3, 1.55], [-1.3, 1.25, -1.35], [0.1, -1.55, 1.1], [1.65, 1.38, -1.15], [2.65, -0.95, 1.4]].map((position, index) => <mesh key={index} position={position as [number, number, number]}><boxGeometry args={[0.05, 0.05, 0.05]} /><meshBasicMaterial color={index % 2 ? '#5ee9ff' : '#d9ff5f'} /></mesh>)}
    <Line points={[[-2.3, -1.3, 1.55], [-1.3, 1.25, -1.35], [0.1, -1.55, 1.1], [1.65, 1.38, -1.15], [2.65, -0.95, 1.4]]} color="#d9ff5f" transparent opacity={0.58} lineWidth={0.65} />
    <Line points={[[-2.5, 1.45, -1.2], [-1.1, -1.55, 1.1], [0.95, 1.22, 1.25], [2.55, -1.3, -0.75]]} color="#5ee9ff" transparent opacity={0.5} lineWidth={0.5} />
  </group>
}

export function TechnicalScene() {
  return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
    <ambientLight intensity={0.65} />
    <pointLight position={[3, 3, 4]} color="#d9ff5f" intensity={16} distance={12} />
    <pointLight position={[-4, -1, 3]} color="#4ccce8" intensity={9} distance={10} />
    <Instrument />
    <Sparkles count={58} scale={[6.5, 4.4, 3]} size={1.7} speed={0.18} color="#cffff2" opacity={0.28} />
  </Canvas>
}
