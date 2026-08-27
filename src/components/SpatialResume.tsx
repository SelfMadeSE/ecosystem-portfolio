'use client'

import { ArrowDown, ArrowRight, ArrowUpRight, Github, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { FieldRecord } from '@/components/FieldRecord'
import { JourneyCanvas } from '@/components/JourneyCanvas'
import { projects } from '@/data/projects'
import { worlds } from '@/data/worlds'

function ProjectEntry({ project, onEnter }: { project: typeof projects[number]; onEnter: (slug: string) => void }) {
  return <a
    className={`work-entry work-entry--${project.accent}`}
    href={`/projects/${project.slug}`}
    onClick={(event) => { event.preventDefault(); onEnter(project.slug) }}
    onFocus={() => undefined}
  >
    <img src={project.media.src} alt={project.media.alt} loading="lazy" />
    <span className="work-entry__shade" aria-hidden="true" />
    <span className="work-entry__copy"><small>{project.number} / {project.eyebrow}</small><strong>{project.title}</strong><em>{project.summary}</em></span>
    <ArrowUpRight className="work-entry__arrow" size={23} aria-hidden="true" />
  </a>
}

export function SpatialResume() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const hud = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      const next = worlds.findIndex((world) => world.id === visible.target.id)
      if (next >= 0) setActiveIndex(next)
    }, { threshold: [0.32, 0.55, 0.74] })
    worlds.forEach((world) => {
      const chapter = document.getElementById(world.id)
      if (chapter) observer.observe(chapter)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hud.current) return
    gsap.fromTo(hud.current, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power2.out', overwrite: true })
  }, [activeIndex])

  const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  const enterProject = (slug: string) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(`/projects/${slug}`)
      return
    }
    setSelectedProject(slug)
    window.setTimeout(() => router.push(`/projects/${slug}`), 460)
  }

  const active = worlds[activeIndex]
  return <div className="journey" id="top">
    <div className="journey-canvas" aria-hidden="true"><JourneyCanvas activeIndex={activeIndex} /></div>
    <nav className="journey-map" aria-label="Portfolio route">{worlds.map((world, index) => <button key={world.id} type="button" onClick={() => jumpTo(world.id)} aria-current={index === activeIndex ? 'step' : undefined}><span>{world.number}</span>{world.nav}</button>)}</nav>
    <div ref={hud} className="journey-hud" aria-live="polite"><span>{active.number} / {String(worlds.length).padStart(2, '0')}</span><b>{active.nav}</b></div>
    <main className="journey-scroll">
      <section id="field" className="chapter chapter--field" aria-labelledby="field-title">
        <div className="chapter-hero-copy"><p className="eyebrow"><span />01 / FIELD</p><h1 id="field-title">Systems that hold<br /><i>when the real world moves.</i></h1><p>A real Alberta field record: equipment, weather, constraints, and the people working through them.</p><a className="button button--acid" href="#field-record">Follow the record <ArrowDown size={16} /></a></div>
        <p className="chapter-route">FIELD → ROME → STUDIO → WORK → LAB → NOW</p>
      </section>

      <section id="field-record" className="chapter chapter--field-record" aria-labelledby="field-record-title">
        <header className="chapter-intro"><p className="eyebrow"><span />FIELD / RECORD</p><h2 id="field-record-title">The work was physical<br /><i>before it was digital.</i></h2><p>Real exterior plates establish the scale. The point of view then moves closer through a bounded field record—no reconstructed world standing in for the experience.</p></header>
        <div className="field-composition">
          <figure className="field-photo field-photo--wide"><img src="/media/field/field-exterior-safe.jpg" alt="Industrial equipment and winter landscape at a field site" loading="lazy" /><figcaption>Exterior / working scale</figcaption></figure>
          <figure className="field-photo field-photo--tall"><img src="/media/field/field-detail-safe.jpg" alt="Vertical field equipment detail" loading="lazy" /><figcaption>Process / detail</figcaption></figure>
          <FieldRecord />
        </div>
        <div className="night-strip" aria-label="Night industrial transition photographs">{[1, 2, 3, 4].map((index) => <img key={index} src={`/media/field/field-night-0${index}.jpg`} alt="Night industrial atmosphere at a field site" loading="lazy" />)}</div>
      </section>

      <section id="rome" className="chapter chapter--rome" aria-labelledby="rome-title">
        <img className="rome-background" src="/media/travel/rome-plate-01.jpg" alt="" aria-hidden="true" loading="lazy" />
        <div className="rome-copy"><p className="eyebrow"><span />02 / ROME</p><h2 id="rome-title">A different frame.<br /><i>Still the same record.</i></h2><p>Italian architecture and personal travel photographs mark a period of movement through Italy.</p></div>
        <figure className="rome-foreground"><img src="/media/travel/rome-personal-bench.jpg" alt="Personal travel moment in Italy" loading="eager" /><figcaption>Italy / personal record</figcaption></figure>
      </section>

      <section id="studio" className="chapter chapter--studio" aria-labelledby="studio-title"><div><p className="eyebrow"><span />03 / STUDIO</p><h2 id="studio-title">The present work<br /><i>is in software.</i></h2><p>Useful AI work needs a system that remembers why a change was made, what it depends on, and whether the result can actually be checked.</p><a className="text-link" href="#work">Enter selected work <ArrowRight size={15} /></a></div><figure className="studio-capture"><img src="/media/game-studio/studio-surface.jpg" alt="Game Studio creator interface from a real local capture" loading="lazy" /><figcaption><span>Game Studio</span><span>Real local capture</span></figcaption></figure></section>

      <section id="work" className="chapter chapter--work" aria-labelledby="work-title"><header className="chapter-intro"><p className="eyebrow"><span />04 / WORK</p><h2 id="work-title">The product is<br /><i>the evidence.</i></h2><p>Four flagship projects remain individually addressable case studies. Hover or keyboard focus reveals the working surface; selection carries the image into the case study.</p></header><div className="work-list">{projects.map((project) => <ProjectEntry key={project.slug} project={project} onEnter={enterProject} />)}</div></section>

      <section id="lab" className="chapter chapter--lab" aria-labelledby="lab-title"><div><p className="eyebrow"><span />05 / LAB</p><h2 id="lab-title">Make a version.<br /><i>Then make it answerable.</i></h2><p>Earlier work, experiments, and operating patterns belong here when they help explain the method without displacing the flagship products. Source records, test states, and review gates are part of the output.</p><a className="text-link" href="https://github.com/SelfMadeSE" target="_blank" rel="noreferrer">Inspect the source record <ArrowUpRight size={15} /></a></div></section>

      <section id="now" className="chapter chapter--now" aria-labelledby="now-title"><div className="now-copy"><p className="eyebrow"><span />06 / NOW</p><h2 id="now-title">Let’s make it<br /><i>real.</i></h2><p>Rylee Benson — Founder / Full-Stack Engineer. Current work is grounded in practical systems, creative tools, and evidence that a result exists beyond the pitch.</p><div className="journey-actions"><a className="button button--acid" href="mailto:owner@outboundautonomy.com">Start a conversation <Mail size={16} /></a><a className="button button--outline" href="https://github.com/SelfMadeSE" target="_blank" rel="noreferrer">GitHub <Github size={16} /></a></div></div><figure className="now-portrait"><img src="/media/founder/current-portrait-3498.jpg" alt="Rylee Benson, current candid portrait" loading="lazy" /><figcaption>Current source record / unretouched editorial derivative</figcaption></figure></section>
    </main>
    {selectedProject && <div className="project-transition" aria-hidden="true"><span>Entering {projects.find((project) => project.slug === selectedProject)?.title}</span></div>}
  </div>
}
