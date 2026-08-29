'use client'

import { useSyncExternalStore } from 'react'
import { motionDirector, type MotionPreferences } from './MotionDirector'

const SERVER_PREFERENCES: MotionPreferences = {
  reducedMotion: true,
  coarsePointer: true,
  pageVisible: true,
  tier: 'static',
  viewport: { width: 0, height: 0 },
}

/**
 * React consumers subscribe only to semantic preference changes. Scroll and
 * chapter progress remain in the imperative motion director, avoiding a React
 * render on every animation frame.
 */
export function useMotionPreferences() {
  return useSyncExternalStore(
    motionDirector.subscribePreferences,
    motionDirector.getPreferences,
    () => SERVER_PREFERENCES,
  )
}
