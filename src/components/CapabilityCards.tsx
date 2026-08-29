'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

/**
 * CapabilityCards — the four hats, dealt as blueprint cards.
 * A deterministic GSAP timeline deals and flips every card in order. Each
 * card owns an explicit timeline segment, so Systems always completes last.
 */

const CARDS = [
  { number: '01', title: 'Strategy', items: ['Product framing', 'Scope + sequencing', 'Evidence boundaries', 'Honest budgets'] },
  { number: '02', title: 'Design', items: ['Information architecture', 'Interface systems', 'Motion with intent', 'Editorial craft'] },
  { number: '03', title: 'Engineering', items: ['Full-stack TypeScript', 'Native Swift + Rust', 'GPU / WebGL / shaders', 'AI-assisted, verified'] },
  { number: '04', title: 'Systems', items: ['Multi-agent orchestration', 'Payments + data', 'Cloud delivery', 'Automation + tests'] },
]

export function CapabilityCards() {
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const deck = deckRef.current
    if (!deck) return

    gsap.registerPlugin(ScrollTrigger)
    const cards = Array.from(deck.querySelectorAll<HTMLElement>('.cap-card'))
    const inners = Array.from(deck.querySelectorAll<HTMLElement>('.cap-card__inner'))
    const backs = Array.from(deck.querySelectorAll<HTMLElement>('.cap-card__back'))
    const faces = Array.from(deck.querySelectorAll<HTMLElement>('.cap-card__face'))
    const matchMedia = gsap.matchMedia()

    matchMedia.add('(min-width: 701px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set(cards, { '--fan': 0, '--flip': 0 })

      const timeline = gsap.timeline({ defaults: { ease: 'none' } })
      cards.forEach((card, index) => {
        const start = index * 0.5
        timeline.addLabel(`card-${index + 1}`, start)
        timeline.to(card, { '--fan': 1, duration: 0.28 }, start)
        timeline.to(card, { '--flip': 1, duration: 0.34 }, start + 0.18)
      })

      ScrollTrigger.create({
        trigger: deck,
        animation: timeline,
        start: 'top 18%',
        end: () => `+=${Math.max(window.innerHeight * 1.6, 1100)}`,
        scrub: 0.45,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      })
    })

    matchMedia.add('(max-width: 700px), (pointer: coarse), (prefers-reduced-motion: reduce)', () => {
      gsap.set(deck, {
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 430 ? '1fr' : 'repeat(2, minmax(0, 1fr))',
        gap: '0.6rem',
        height: 'auto',
        perspective: 'none',
      })
      gsap.set(cards, {
        '--fan': 1,
        '--flip': 1,
        position: 'static',
        width: '100%',
        aspectRatio: 'auto',
        minHeight: 250,
        transform: 'none',
      })
      gsap.set(inners, { height: '100%', transform: 'none' })
      gsap.set(backs, { display: 'none' })
      gsap.set(faces, { backfaceVisibility: 'visible' })
    })

    return () => matchMedia.revert()
  }, [])

  return <div ref={deckRef} className="capability-cards" role="list" aria-label="Four disciplines">
    {CARDS.map((card, index) => <article key={card.number} role="listitem" className="cap-card" style={{ '--i': index, '--jit': `${[-2.5, 1.8, -1.2, 2.4][index]}deg` } as React.CSSProperties}>
      <div className="cap-card__inner">
        <div className="cap-card__back" aria-hidden="true">
          <span className="cap-card__glyph">✚</span>
          <span className="cap-card__brand">RB — FIELD TO SOFTWARE</span>
        </div>
        <div className="cap-card__face">
          <small>{card.number} / 04</small>
          <h4>{card.title}</h4>
          <ul>{card.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </article>)}
  </div>
}
