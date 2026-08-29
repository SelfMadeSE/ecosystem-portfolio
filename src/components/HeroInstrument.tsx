'use client'

import { useEffect, useRef } from 'react'
import { subscribeMotionFrame } from '@/components/motion/MotionDirector'

export function HeroInstrument() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => subscribeMotionFrame((state) => {
    const node = ref.current
    if (!node || state.reducedMotion || !state.pageVisible) return
    node.style.setProperty('--instrument-progress', String(state.chapterProgress.present ?? 0))
    node.style.setProperty('--instrument-velocity', String(Math.min(1, Math.abs(state.velocity) / 18)))
  }), [])

  return <div ref={ref} className="hero-instrument" role="img" aria-label="Direction, build, verification, and evidence connected in one product system">
    <svg viewBox="0 0 900 720" aria-hidden="true">
      <defs>
        <linearGradient id="instrument-line" x1="0" x2="1"><stop stopColor="#e8490f" /><stop offset="1" stopColor="#b6d6d1" /></linearGradient>
        <radialGradient id="instrument-core"><stop stopColor="#f6c76c" /><stop offset=".55" stopColor="#e8490f" /><stop offset="1" stopColor="#48190a" /></radialGradient>
      </defs>
      <g className="hero-instrument__orbits">
        <ellipse cx="450" cy="360" rx="326" ry="184" />
        <ellipse cx="450" cy="360" rx="258" ry="258" transform="rotate(-28 450 360)" />
        <ellipse cx="450" cy="360" rx="140" ry="310" transform="rotate(48 450 360)" />
      </g>
      <g className="hero-instrument__links" stroke="url(#instrument-line)">
        <path d="M176 228 C310 190 350 300 450 360" />
        <path d="M450 360 C548 300 598 202 742 242" />
        <path d="M450 360 C548 426 600 528 730 514" />
        <path d="M450 360 C342 430 300 520 174 492" />
      </g>
      <circle className="hero-instrument__core" cx="450" cy="360" r="92" fill="url(#instrument-core)" />
      <circle className="hero-instrument__halo" cx="450" cy="360" r="130" />
      <g className="hero-instrument__node hero-instrument__node--direction"><circle cx="176" cy="228" r="34" /><text x="176" y="286">DIRECTION</text></g>
      <g className="hero-instrument__node hero-instrument__node--build"><circle cx="742" cy="242" r="34" /><text x="742" y="300">BUILD</text></g>
      <g className="hero-instrument__node hero-instrument__node--verify"><circle cx="730" cy="514" r="34" /><text x="730" y="572">VERIFY</text></g>
      <g className="hero-instrument__node hero-instrument__node--evidence"><circle cx="174" cy="492" r="34" /><text x="174" y="550">EVIDENCE</text></g>
      <text className="hero-instrument__center-label" x="450" y="355">PRODUCT</text>
      <text className="hero-instrument__center-label" x="450" y="378">SYSTEM</text>
    </svg>
    <div className="hero-instrument__status"><span>01</span><b>Direction</b><i /><span>02</span><b>Build</b><i /><span>03</span><b>Verify</b><i /><span>04</span><b>Evidence</b></div>
  </div>
}
