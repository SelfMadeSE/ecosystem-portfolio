'use client'

import { useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export function CameraRig({ enabled }: { enabled: boolean }) {
  const target = useRef(new THREE.Vector3(0, 0, 0))
  const { pointer, camera, invalidate } = useThree()
  useFrame(() => {
    if (!enabled) return
    target.current.set(pointer.x * 0.18, pointer.y * 0.12, 7)
    camera.position.lerp(target.current, 0.025)
    camera.lookAt(0, 0, 0)
    invalidate()
  })
  return null
}
