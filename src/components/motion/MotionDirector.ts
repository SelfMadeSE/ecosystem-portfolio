'use client'

import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export type MotionTier = 'immersive' | 'balanced' | 'static'

export interface MotionPreferences {
  reducedMotion: boolean
  coarsePointer: boolean
  pageVisible: boolean
  tier: MotionTier
  viewport: Readonly<{ width: number; height: number }>
}

export interface MotionRuntimeState extends MotionPreferences {
  scroll: number
  velocity: number
  direction: -1 | 0 | 1
  activeChapter: string | null
  chapterProgress: Readonly<Record<string, number>>
}

type FrameListener = (state: Readonly<MotionRuntimeState>) => void
type PreferenceListener = () => void

interface ChapterBounds {
  id: string
  top: number
  height: number
}

const clamp = (value: number) => Math.min(1, Math.max(0, value))

class MotionDirector {
  private lenis: Lenis | null = null
  private chapters: ChapterBounds[] = []
  private frameListeners = new Set<FrameListener>()
  private preferenceListeners = new Set<PreferenceListener>()
  private cleanup: (() => void) | null = null
  private preferenceSnapshot: MotionPreferences = {
    reducedMotion: false,
    coarsePointer: false,
    pageVisible: true,
    tier: 'immersive',
    viewport: { width: 0, height: 0 },
  }
  private state: MotionRuntimeState = {
    ...this.preferenceSnapshot,
    scroll: 0,
    velocity: 0,
    direction: 0,
    activeChapter: null,
    chapterProgress: {},
  }

  start() {
    if (this.cleanup || typeof window === 'undefined') return () => this.stop()

    gsap.registerPlugin(ScrollTrigger)

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarseQuery = window.matchMedia('(pointer: coarse)')
    const balancedQuery = window.matchMedia('(max-width: 1180px)')
    let refreshFrame = 0

    const resolvePreferences = () => {
      const reducedMotion = reducedQuery.matches
      const coarsePointer = coarseQuery.matches
      const width = window.innerWidth
      const height = window.innerHeight
      const pageVisible = document.visibilityState !== 'hidden'
      const tier: MotionTier = reducedMotion || coarsePointer || width <= 700
        ? 'static'
        : balancedQuery.matches
          ? 'balanced'
          : 'immersive'
      const previous = this.preferenceSnapshot
      const changed = previous.reducedMotion !== reducedMotion
        || previous.coarsePointer !== coarsePointer
        || previous.pageVisible !== pageVisible
        || previous.tier !== tier
        || previous.viewport.width !== width
        || previous.viewport.height !== height

      if (!changed) return
      this.preferenceSnapshot = {
        reducedMotion,
        coarsePointer,
        pageVisible,
        tier,
        viewport: { width, height },
      }
      Object.assign(this.state, this.preferenceSnapshot)
      this.preferenceListeners.forEach((listener) => listener())
    }

    const measureChapters = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-motion-chapter], main section[id]'))
      const seen = new Set<string>()
      this.chapters = elements.flatMap((element) => {
        const id = element.dataset.motionChapter || element.id
        if (!id || seen.has(id)) return []
        seen.add(id)
        const rect = element.getBoundingClientRect()
        return [{ id, top: rect.top + window.scrollY, height: Math.max(1, rect.height) }]
      })
    }

    const scheduleRefresh = () => {
      window.cancelAnimationFrame(refreshFrame)
      refreshFrame = window.requestAnimationFrame(() => {
        resolvePreferences()
        measureChapters()
        ScrollTrigger.refresh()
      })
    }

    resolvePreferences()
    measureChapters()

    if (!this.preferenceSnapshot.reducedMotion) {
      this.lenis = new Lenis({
        autoRaf: false,
        lerp: this.preferenceSnapshot.tier === 'balanced' ? 0.12 : 0.09,
        wheelMultiplier: 0.92,
        smoothWheel: true,
        syncTouch: false,
      })
      window.__lenis = this.lenis
    }

    const updateRuntimeState = () => {
      const scroll = this.lenis?.animatedScroll ?? window.scrollY
      const viewportHeight = Math.max(1, window.innerHeight)
      const chapterProgress: Record<string, number> = {}
      let activeChapter: string | null = this.chapters[0]?.id ?? null
      const activeLine = scroll + viewportHeight * 0.38

      for (const chapter of this.chapters) {
        chapterProgress[chapter.id] = clamp((scroll + viewportHeight - chapter.top) / (chapter.height + viewportHeight))
        if (chapter.top <= activeLine) activeChapter = chapter.id
      }

      this.state.scroll = scroll
      this.state.velocity = this.lenis?.velocity ?? 0
      this.state.direction = this.lenis?.direction ?? 0
      this.state.activeChapter = activeChapter
      this.state.chapterProgress = chapterProgress
      this.frameListeners.forEach((listener) => listener(this.state))
    }

    const tick = (time: number) => {
      if (!this.preferenceSnapshot.pageVisible) return
      this.lenis?.raf(time * 1000)
      updateRuntimeState()
    }

    const onLenisScroll = () => ScrollTrigger.update()
    const onVisibilityChange = () => resolvePreferences()
    const onPageShow = () => scheduleRefresh()

    this.lenis?.on('scroll', onLenisScroll)
    gsap.ticker.add(tick)
    ScrollTrigger.addEventListener('refreshInit', measureChapters)
    reducedQuery.addEventListener('change', scheduleRefresh)
    coarseQuery.addEventListener('change', scheduleRefresh)
    balancedQuery.addEventListener('change', scheduleRefresh)
    window.addEventListener('resize', scheduleRefresh)
    window.addEventListener('pageshow', onPageShow)
    window.addEventListener('load', scheduleRefresh)
    document.addEventListener('visibilitychange', onVisibilityChange)
    document.fonts?.ready.then(scheduleRefresh).catch(() => undefined)

    this.cleanup = () => {
      window.cancelAnimationFrame(refreshFrame)
      this.lenis?.off('scroll', onLenisScroll)
      this.lenis?.destroy()
      this.lenis = null
      delete window.__lenis
      gsap.ticker.remove(tick)
      ScrollTrigger.removeEventListener('refreshInit', measureChapters)
      reducedQuery.removeEventListener('change', scheduleRefresh)
      coarseQuery.removeEventListener('change', scheduleRefresh)
      balancedQuery.removeEventListener('change', scheduleRefresh)
      window.removeEventListener('resize', scheduleRefresh)
      window.removeEventListener('pageshow', onPageShow)
      window.removeEventListener('load', scheduleRefresh)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      this.cleanup = null
    }

    scheduleRefresh()
    return () => this.stop()
  }

  stop() {
    this.cleanup?.()
  }

  getState = (): Readonly<MotionRuntimeState> => this.state

  getPreferences = (): MotionPreferences => this.preferenceSnapshot

  subscribeFrame = (listener: FrameListener) => {
    this.frameListeners.add(listener)
    return () => {
      this.frameListeners.delete(listener)
    }
  }

  subscribePreferences = (listener: PreferenceListener) => {
    this.preferenceListeners.add(listener)
    return () => {
      this.preferenceListeners.delete(listener)
    }
  }

  refresh = () => {
    if (typeof window !== 'undefined') ScrollTrigger.refresh()
  }
}

export const motionDirector = new MotionDirector()

export const getMotionState = motionDirector.getState
export const subscribeMotionFrame = motionDirector.subscribeFrame
export const refreshMotionLayout = motionDirector.refresh
