'use client'

import { ArrowDown, ArrowRight, ArrowUpRight, Github, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { TechnicalCanvas } from '@/components/TechnicalCanvas'
import { projects } from '@/data/projects'
import { worlds } from '@/data/worlds'

function ProjectEntry({ project, onEnter }: { project: typeof projects[number]; onEnter: (slug: string) => void }) {
  return <a className={`work-entry work-entry--${project.accent}`} href={`/projects/${project.slug}`} onClick={(event) => { event.preventDefault(); onEnter(project.slug) }}>
    <span className="work-entry__media"><img src={project.media.src} alt={project.media.alt} loading="lazy" /></span>
    <span className="work-entry__copy"><small>{project.number} / {project.eyebrow}</small><strong>{project.title}</strong><em>{project.summary}</em><span className="work-entry__stack">{project.tech.slice(0, 3).join('  ·  ')}</span></span>
    <ArrowUpRight className="work-entry__arrow" size={23} aria-hidden="true" />
  </a>
}

const studioSurfaces = [
  { title: 'Game Studio', label: 'AI / CREATOR SYSTEMS', image: '/media/product-evidence/game-studio-direction-loop.gif', alt: 'Game Studio creator interface motion loop' },
  { title: 'MuseStudio', label: 'NATIVE CREATIVE TOOL', image: '/media/musestudio/muse-editor.png', alt: 'MuseStudio native macOS editor' },
  { title: 'Outbound Autonomy', label: 'WEBSITE INTELLIGENCE', image: '/media/product-evidence/outbound-live.jpg', alt: 'Outbound Autonomy production interface' },
  { title: 'Autonomous Operations', label: 'AGENT ORCHESTRATION', image: '/media/autonomous-operations/workspace-topology.svg', alt: 'Autonomous Operations source-backed workflow topology' },
]

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

  const jumpTo = (id: string) => {
    const chapter = document.getElementById(id)
    if (!chapter) return
    const align = (behavior: ScrollBehavior) => {
      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 74
      const routeHeight = document.querySelector<HTMLElement>('.journey-map')?.getBoundingClientRect().height ?? 0
      const top = Math.max(0, chapter.getBoundingClientRect().top + window.scrollY - headerHeight - routeHeight - 28)
      window.scrollTo({ top, behavior })
    }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    align(reducedMotion ? 'auto' : 'smooth')
    if (!reducedMotion) window.setTimeout(() => align('auto'), 500)
  }
  const enterProject = (slug: string) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return router.push(`/projects/${slug}`)
    setSelectedProject(slug)
    window.setTimeout(() => router.push(`/projects/${slug}`), 460)
  }

  const active = worlds[activeIndex]
  return <div className="journey journey--product" id="top">
    <nav className="journey-map" aria-label="Portfolio route">{worlds.map((world, index) => <button key={world.id} type="button" onClick={() => jumpTo(world.id)} aria-current={index === activeIndex ? 'step' : undefined}><span>{world.number}</span>{world.nav}</button>)}</nav>
    <div ref={hud} className="journey-hud" aria-live="polite"><span>{active.number} / {String(worlds.length).padStart(2, '0')}</span><b>{active.nav}</b></div>
    <main className="journey-scroll">
      <section id="field" className="chapter chapter--field chapter--systems" aria-labelledby="field-title">
        <div className="systems-canvas" aria-hidden="true"><TechnicalCanvas /></div>
        <figure className="systems-editorial"><img src="/media/editorial/systems-field-editorial-v1.png" alt="Abstract editorial rendering of a precision system in glass, light, and spatial data lines" /><figcaption>Editorial systems study / not product evidence</figcaption></figure>
        <div className="chapter-hero-copy"><p className="eyebrow"><span />01 / FIELD</p><h1 id="field-title">AI systems.<br /><i>Tools people can use.</i></h1><p>Rylee Benson builds AI products, native creative tools, and operational software. The work is designed around an inspectable artifact, a verification boundary, and a route forward.</p><div className="hero-proof" aria-label="Focus areas"><span>AI creator systems</span><span>Native creative tools</span><span>Operational software</span></div><a className="button button--acid" href="#studio">See the working surfaces <ArrowDown size={16} /></a></div>
        <p className="chapter-route">FIELD → ROME → STUDIO → WORK → LAB → NOW</p>
      </section>

      <section id="rome" className="chapter chapter--context" aria-labelledby="rome-title">
        <header className="chapter-intro"><p className="eyebrow"><span />02 / ROME</p><h2 id="rome-title">Context,<br /><i>not the pitch.</i></h2><p>Alberta field work and travel are parts of the chronology. They establish a real record of place and time; they do not stand in for the products.</p></header>
        <div className="context-record" aria-label="Selected life record"><figure><img src="/media/field/field-establishing-01.jpg" alt="Field site in Alberta" loading="lazy" /><figcaption>Alberta / field record</figcaption></figure><figure><img src="/media/travel/rome-plate-01.jpg" alt="Architectural scene in Rome, Italy" loading="lazy" /><figcaption>Italy / travel record</figcaption></figure><div className="context-note"><span>01</span><p>One physical-work image, one architectural image. The portfolio moves on from here.</p></div></div>
      </section>

      <section id="studio" className="chapter chapter--studio" aria-labelledby="studio-title"><header className="chapter-intro"><p className="eyebrow"><span />03 / STUDIO</p><h2 id="studio-title">The working<br /><i>surface.</i></h2><p>AI is useful when it lives inside a product with context, explicit limits, and a way to check the result. These are real interfaces and source-backed workflow abstractions—not concept screens.</p><a className="text-link" href="#work">Enter selected work <ArrowRight size={15} /></a></header><div className="studio-surfaces">{studioSurfaces.map((surface, index) => <figure key={surface.title} className={`studio-surface studio-surface--${index + 1}`}><img src={surface.image} alt={surface.alt} loading={index === 0 ? 'eager' : 'lazy'} /><figcaption><small>{surface.label}</small><span>{surface.title}</span></figcaption></figure>)}</div></section>

      <section id="work" className="chapter chapter--work" aria-labelledby="work-title"><header className="chapter-intro"><p className="eyebrow"><span />04 / WORK</p><h2 id="work-title">Products with<br /><i>proof surfaces.</i></h2><p>Four flagship projects. Each entry opens a factual case study: what the system is, what was built, the architecture, the constraints, and the evidence boundary.</p></header><div className="work-list">{projects.map((project) => <ProjectEntry key={project.slug} project={project} onEnter={enterProject} />)}</div></section>

      <section id="lab" className="chapter chapter--lab" aria-labelledby="lab-title"><header className="chapter-intro"><p className="eyebrow"><span />05 / LAB</p><h2 id="lab-title">Method is part<br /><i>of the product.</i></h2><p>Earlier experiments and operational patterns earn their place when they show how work stays accountable—not because they make a bigger claim.</p></header><div className="lab-grid"><article className="evidence-ladder"><small>GAME STUDIO / OPERATING LOOP</small><ol><li><span>01</span>Creator direction</li><li><span>02</span>Bounded candidate</li><li><span>03</span>Host verification</li><li><span>04</span>Recorded runtime evidence</li></ol><p>The product does not confuse an agent response with a completed game. A staged candidate still has to survive inspection and a runtime check.</p></article><figure className="lab-surface"><img src="/media/product-evidence/specdriver-landing-desktop.jpg" alt="Source-backed earlier BuildStackSpec product landing surface" loading="lazy" /><figcaption><span>Earlier work / source-backed surface</span><span>AI-assisted specification and handoff</span></figcaption></figure></div></section>

      <section id="now" className="chapter chapter--now" aria-labelledby="now-title"><div className="now-copy"><p className="eyebrow"><span />06 / NOW</p><h2 id="now-title">Build something<br /><i>worth checking.</i></h2><p>Rylee Benson — Founder / Full-Stack Engineer. Available for ambitious product systems, AI workflows, creative tools, and the engineering needed to make them real.</p><div className="journey-actions"><a className="button button--acid" href="mailto:owner@outboundautonomy.com">Start a conversation <Mail size={16} /></a><a className="button button--outline" href="https://github.com/SelfMadeSE" target="_blank" rel="noreferrer">GitHub <Github size={16} /></a></div></div><div className="now-index" aria-label="Current focus"><span>NOW / 2026</span><strong>Build<br />Verify<br />Ship</strong><p>Product systems over portfolio theatre.</p></div></section>
    </main>
    {selectedProject && <div className="project-transition" aria-hidden="true"><span>Entering {projects.find((project) => project.slug === selectedProject)?.title}</span></div>}
  </div>
}
