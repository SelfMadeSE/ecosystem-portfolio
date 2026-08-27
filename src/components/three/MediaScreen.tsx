'use client'

import { useTexture } from '@react-three/drei'

export function MediaScreen({ src, aspect = 1.5 }: { src: string; aspect?: number }) {
  const texture = useTexture(src)
  return <mesh position={[0, 0, 0.24]}><planeGeometry args={[1.55, 1.55 / aspect]} /><meshBasicMaterial map={texture} toneMapped={false} /></mesh>
}
