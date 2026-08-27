'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Github, Mail } from 'lucide-react'
import gsap from 'gsap'
import { JourneyCanvas } from '@/components/JourneyCanvas'
import { projects } from '@/data/projects'
import { worlds, type WorldChapter } from '@/data/worlds'

function ChapterActions({ chapter }: { chapter: WorldChapter }) {
  if (chapter.id === 'field') return <div className="journey-actions"><a className="journey-button journey-button--solid" href="#work">Enter the work <ArrowDown size={16} /></a><a className="journey-button" href="#now">Contact</a><a className="journey-icon" href="https://github.com/SelfMadeSE" aria-label="Rylee Benson on GitHub" target="_blank" rel="noreferrer"><Github size={18} /></a></div>
  if (chapter.id === 'now') return <div className="journey-actions"><a className="journey-button journey-button--solid" href="mailto:owner@outboundautonomy.com">owner@outboundautonomy.com <Mail size={16} /></a><a className="journey-button" href="https://github.com/SelfMadeSE" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a></div>
  return <a className="journey-next" href={`#${worlds[Math.min(worlds.length - 1, worlds.indexOf(chapter) + 1)].id}`}>Continue the route <ArrowDown size={15} /></a>
}

export function SpatialResume() {
  const [activeIndex, setActiveIndex] = useState(0)
  const hud = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      const next = worlds.findIndex((world) => world.id === visible.target.id)
      if (next >= 0) setActiveIndex(next)
    }, { threshold: [0.35, 0.55, 0.75] })
    worlds.forEach((world) => document.getElementById(world.id) && observer.observe(document.getElementById(world.id)!))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hud.current) return
    gsap.fromTo(hud.current, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', overwrite: true })
  }, [activeIndex])

  const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  const active = worlds[activeIndex]

  return <div className="journey" id="top">
    <div className="journey-canvas" aria-hidden="true"><JourneyCanvas activeIndex={activeIndex} /></div>
    <nav className="journey-map" aria-label="Portfolio route">{worlds.map((world, index) => <button key={world.id} type="button" onClick={() => jumpTo(world.id)} aria-current={index === activeIndex ? 'step' : undefined}><span>{world.number}</span>{world.nav}</button>)}</nav>
    <div ref={hud} className="journey-hud" aria-live="polite"><span>{active.number} / 05</span><b>{active.nav}</b></div>
    <div className="journey-scroll">
      {worlds.map((chapter) => <section className={`journey-chapter journey-chapter--${chapter.id}`} id={chapter.id} key={chapter.id} aria-labelledby={`${chapter.id}-title`}>
        <div className="journey-chapter__copy"><p className="journey-eyebrow">{chapter.eyebrow}</p><h1 id={`${chapter.id}-title`}>{chapter.title}</h1><p className="journey-statement">{chapter.statement}</p><p className="journey-detail">{chapter.detail}</p><ChapterActions chapter={chapter} /></div>
        {chapter.media.length > 0 && <div className="journey-source-plates" aria-label={`${chapter.nav} source media`}>{chapter.media.map((media) => <figure key={media.src}><img src={media.src} alt={media.alt} loading={chapter.id === 'field' ? 'eager' : 'lazy'} /><figcaption>{media.role}</figcaption></figure>)}</div>}
        {chapter.id === 'work' && <div className="journey-work-grid">{projects.map((project) => <a key={project.slug} href={`/projects/${project.slug}`}><span>{project.number}</span><strong>{project.title}</strong><small>{project.eyebrow}</small><ArrowUpRight size={18} /></a>)}</div>}
        {chapter.id === 'lab' && <ul className="journey-lab-list"><li><span>01</span>Evidence-bound AI systems</li><li><span>02</span>Native creative tools</li><li><span>03</span>Human-reviewed operations</li></ul>}
      </section>)}
    </div>
  </div>
}
