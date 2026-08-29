'use client'

import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CapabilityShowcase } from '@/components/CapabilityShowcase'
import { FieldRecord } from '@/components/FieldRecord'
import { HeroInstrument } from '@/components/HeroInstrument'
import { ProjectInquiry } from '@/components/ProjectInquiry'
import { TechnicalCanvas } from '@/components/TechnicalCanvas'
import { projects } from '@/data/projects'
import { worlds } from '@/data/worlds'

const buildSteps = [
  { number: '01', title: 'Align the product', copy: 'Clarify who it serves, what needs to change, and what a meaningful outcome looks like.' },
  { number: '02', title: 'Design the system', copy: 'Turn the idea into flows, states, interfaces, data, and technical decisions we can actually discuss.' },
  { number: '03', title: 'Build across the stack', copy: 'Use LLMs to accelerate the work while keeping the implementation structured, reviewable, and maintainable.' },
  { number: '04', title: 'Verify what ships', copy: 'Test the important paths, inspect the runtime, and keep evidence attached to the version we are evaluating.' },
  { number: '05', title: 'Keep improving', copy: 'Use what the product shows us to focus the next release, workflow, or design decision.' },
]

const strengths = [
  { number: '01', title: 'Product + visual direction', copy: 'Shape the product, message, information architecture, interaction model, and visual language together.', proof: 'Game Studio · Outbound Autonomy · this site' },
  { number: '02', title: 'AI-native engineering', copy: 'Four years building with LLMs as an engineering medium — exploration, implementation, refactoring, and iteration without giving up engineering judgment.', proof: 'Game Studio · SpecDriver · 7-agent operations system' },
  { number: '03', title: 'Web + platform software', copy: 'Build responsive products with real accounts, roles, data, background work, reports, and operational surfaces.', proof: 'Outbound Autonomy · Ecosystem Marketplace · SaaS billing' },
  { number: '04', title: 'Native + interactive tools', copy: 'Move comfortably between native macOS and iOS, Rust desktop apps, game engines, and interactive 3D web.', proof: 'MuseStudio · SpecDriver (Tauri/Rust) · Spector · Unity/Godot · Three.js' },
  { number: '05', title: 'Data, payments + cloud', copy: 'Databases, auth, Stripe flows, webhooks, vector memory, cloud services, hosting, and delivery — the layer that makes a product real.', proof: 'Stripe · Postgres · Qdrant · Supabase · Amplify · Vercel' },
  { number: '06', title: 'Automation + quality', copy: 'Turn repeated work into bounded systems with schedulers, approval gates, test suites, and retained artifacts.', proof: '7-agent orchestration · 351+ tests · 14 E2E suites' },
]

const supportingWork = [
  {
    label: 'Native developer tool',
    title: 'SpecDriver IDE',
    copy: 'A spec-first development environment built as a real native app: Tauri 2 desktop shell, Rust backend, React front end, integrated AI assistant, Stripe billing, and 14 Playwright end-to-end suites.',
    tags: ['Rust', 'Tauri 2', 'Stripe', 'Supabase'],
  },
  {
    label: 'Local AI system',
    title: 'ACE-Step music generation',
    copy: 'A local music-generation stack: PyTorch pipelines running on CUDA and Apple MLX, a FastAPI service, packaged CLI entry points, and a Gradio interface for text-to-music and audio editing.',
    tags: ['Python', 'PyTorch', 'FastAPI', 'CLI'],
  },
  {
    label: 'Native iOS + backend',
    title: 'Spector',
    copy: 'A SwiftUI iOS app that profiles an artist’s lyrical DNA, backed by its own Node.js API proxy with server-side key management, rate limiting, and caching.',
    tags: ['Swift', 'SwiftUI', 'SwiftData', 'Node.js'],
  },
  {
    label: 'Game tooling',
    title: 'Game Studio — Godot generation',
    copy: 'The Godot-first generation of Game Studio: agents write GDScript, creators playtest in the browser, and 351+ automated tests hold the system together.',
    tags: ['Godot 4', 'Node.js', '351+ tests'],
  },
  {
    label: 'Developer tool',
    title: 'EcoStack IDE',
    copy: 'A desktop development environment with AI chat, project context, and approval-gated actions.',
    tags: ['Electron', 'Code OSS', 'AWS Bedrock'],
  },
  {
    label: 'Cloud marketplace',
    title: 'Ecosystem Marketplace',
    copy: 'A cloud marketplace with dedicated backend functions for search, messaging, disputes, notifications, and vendor matching.',
    tags: ['Next.js', 'AWS Amplify', 'GraphQL'],
  },
  {
    label: 'Field engineering / work history',
    title: 'Robotic casing operations',
    copy: 'Brought prototype robotic pipe-handling equipment into live field operations: wrote the operating procedures, supported the mechanisms, and verified torque and top-drive behavior under real conditions.',
    tags: ['robotic pipe handling', 'SOPs', 'torque verification'],
    href: '#field',
  },
]

const services = [
  {
    number: '01',
    title: 'Product direction + build leadership',
    range: '$3k–$8k',
    copy: 'Turn an early idea or messy brief into a clear product slice people can actually try.',
    includes: ['Product framing', 'Core user flow', 'Working first slice'],
  },
  {
    number: '02',
    title: 'Interactive website / product site',
    range: '$4k–$12k',
    copy: 'A distinctive responsive site that explains the product quickly and gives visitors a reason to act.',
    includes: ['Information architecture', 'Responsive implementation', 'Purposeful motion'],
  },
  {
    number: '03',
    title: 'AI workflow / automation',
    range: '$8k–$20k',
    copy: 'An AI-assisted workflow with useful context, visible boundaries, retained evidence, and human review.',
    includes: ['Workflow design', 'Tool boundaries', 'Evaluation and failure paths'],
  },
  {
    number: '04',
    title: 'SaaS, marketplace, or operations platform',
    range: '$20k–$50k+',
    copy: 'A more complete product with accounts, roles, data, billing, integrations, and operational states.',
    includes: ['Product system', 'Data + permissions', 'Billing / integration architecture'],
  },
]

const skillsTrail = [
  'Product direction',
  'Interaction design',
  'Full-stack TypeScript',
  'Swift + native apps',
  'Unity + game tooling',
  'AI + multi-agent systems',
  'Cloud + infrastructure',
  'Verification + testing',
  'Production delivery',
]

const roleFits = [
  { title: 'Creative product engineering', project: 'Game Studio', href: '/projects/game-studio' },
  { title: 'Founding product engineering', project: 'Outbound Autonomy', href: '/projects/outbound-autonomy' },
  { title: 'AI product systems', project: 'Autonomous Operations', href: '/projects/autonomous-operations' },
  { title: 'Native + interactive software', project: 'MuseStudio', href: '/projects/musestudio' },
]

function ProjectEntry({ project, active, onEnter }: { project: typeof projects[number]; active: boolean; onEnter: (slug: string) => void }) {
  return <a className={`work-entry work-entry--${project.accent} work-entry--${project.visual.treatment}${active ? ' is-active' : ''}`} data-project={project.slug} data-treatment={project.visual.treatment} href={`/projects/${project.slug}`} onClick={(event) => { event.preventDefault(); onEnter(project.slug) }}>
    <span className="work-entry__media">
      <span className="work-scene__grid" aria-hidden="true" />
      <img className="work-scene__primary" src={project.media.src} alt={project.media.alt} loading="lazy" />
      {project.visual.secondarySrc && <img className="work-scene__secondary" src={project.visual.secondarySrc} alt="" loading="lazy" aria-hidden="true" />}
      <span className="work-scene__signal" aria-hidden="true"><i /><i /><i /></span>
      <span className="work-scene__label"><b>{project.visual.label}</b><span>{project.visual.detail}</span></span>
    </span>
    <span className="work-entry__copy">
      <small>{project.number} / {project.eyebrow} <b>{project.statusLabel}</b></small>
      <strong>{project.title}</strong>
      <em>{project.summary}</em>
      <span className="work-entry__build"><b>What exists</b>{project.built.slice(0, 2).join(' · ')}</span>
      <span className="work-entry__stack">{project.tech.join('  ·  ')}</span>
      <span className="work-entry__verified"><b>Provenance</b>{project.verified}</span>
    </span>
    <span className="work-entry__cta">Open the build <ArrowUpRight size={17} aria-hidden="true" /></span>
  </a>
}

export function SpatialResume() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeProject, setActiveProject] = useState(projects[0].slug)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    let frame = 0
    const updateActive = () => {
      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 74
      const routeHeight = document.querySelector<HTMLElement>('.journey-map')?.getBoundingClientRect().height ?? 0
      const anchor = headerHeight + routeHeight + 80
      let next = 0
      worlds.forEach((world, index) => {
        const chapter = document.getElementById(world.id)
        if (chapter && chapter.getBoundingClientRect().top <= anchor) next = index
      })
      setActiveIndex(next)
    }
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateActive)
    }
    const detachLenis = window.__lenis?.on('scroll', scheduleUpdate)
    const settle = window.setTimeout(scheduleUpdate, 240)
    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('pageshow', scheduleUpdate)
    return () => {
      detachLenis?.()
      window.clearTimeout(settle)
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('pageshow', scheduleUpdate)
    }
  }, [])

  useEffect(() => {
    const rail = document.querySelector<HTMLElement>('.journey-map')
    const activeButton = rail?.querySelector<HTMLElement>('button[aria-current="step"]')
    if (!rail || !activeButton || rail.scrollWidth <= rail.clientWidth) return
    const left = Math.max(0, activeButton.offsetLeft - (rail.clientWidth - activeButton.offsetWidth) / 2)
    rail.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }, [activeIndex])

  useEffect(() => {
    const entries = Array.from(document.querySelectorAll<HTMLElement>('.work-entry[data-project]'))
    if (!entries.length) return
    const ratios = new Map<Element, number>()
    const observer = new IntersectionObserver((changes) => {
      changes.forEach((change) => ratios.set(change.target, change.isIntersecting ? change.intersectionRatio : 0))
      const next = entries.reduce<{ slug: string; ratio: number } | null>((best, entry) => {
        const ratio = ratios.get(entry) ?? 0
        const slug = entry.dataset.project
        return slug && ratio > (best?.ratio ?? 0) ? { slug, ratio } : best
      }, null)
      if (next?.ratio) setActiveProject(next.slug)
    }, { rootMargin: '-18% 0px -18%', threshold: [0, .2, .4, .6, .8] })
    entries.forEach((entry) => observer.observe(entry))
    return () => observer.disconnect()
  }, [])

  const jumpTo = (id: string) => {
    const chapter = document.getElementById(id)
    if (!chapter) return
    const headerHeight = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 74
    const routeHeight = document.querySelector<HTMLElement>('.journey-map')?.getBoundingClientRect().height ?? 0
    const top = Math.max(0, chapter.getBoundingClientRect().top + window.scrollY - headerHeight - routeHeight - 28)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reducedMotion && window.__lenis) window.__lenis.scrollTo(top, { duration: 1.15 })
    else window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const enterProject = (slug: string) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return router.push(`/projects/${slug}`)
    setSelectedProject(slug)
    window.setTimeout(() => router.push(`/projects/${slug}`), 460)
  }

  return <div className="journey journey--portfolio" id="top">
    <nav className="journey-map" aria-label="Portfolio route">{worlds.map((world, index) => <button key={world.id} type="button" onClick={() => jumpTo(world.id)} aria-current={index === activeIndex ? 'step' : undefined}><span>{world.number}</span>{world.nav}</button>)}</nav>
    <main className="journey-scroll">
      <section id="present" className="chapter chapter--present chapter--proof-hero" aria-labelledby="present-title">
        <div className="proof-hero__layout">
          <div className="proof-hero__copy">
            <p className="eyebrow"><span />Creative product engineer</p>
            <h1 id="present-title">I help you design, build, and ship <i>ambitious software.</i></h1>
            <p>I take products from the first question through direction, interface, architecture, implementation, and release. AI accelerates the loop; clear decisions and verification make the result hold up.</p>
            <div className="journey-actions">
              <a className="button button--acid" href="#hire">Hire me <ArrowRight size={16} /></a>
              <a className="button button--outline" href="#work">Explore the work <ArrowRight size={16} /></a>
              <a className="hero-project-link" href="#now">Start a project <Mail size={15} /></a>
            </div>
            <div className="proof-hero__principles" aria-label="Working principles"><span>Rapid AI-assisted development</span><span>Spec- and task-driven</span><span>Production-minded delivery</span></div>
          </div>
          <div className="proof-hero__fig" aria-hidden="true">
            <HeroInstrument />
            <p>Fig. 01 — an owned product-system instrument, connected to the page&apos;s motion clock</p>
          </div>
        </div>
      </section>

      <section id="work" className="chapter chapter--work" aria-labelledby="work-title">
        <header className="chapter-intro chapter-intro--work"><p className="eyebrow"><span />02 / Selected work</p><h2 id="work-title">Products<br /><i>with a trail.</i></h2><p>Four systems, four different shapes of problem — a game creation tool, native creative software, a live web product, and an autonomous agent team. Open any of them.</p></header>
        <div className="work-list">{projects.map((project) => <ProjectEntry key={project.slug} project={project} active={project.slug === activeProject} onEnter={enterProject} />)}</div>
        <div className="work-skills" aria-label="Skills represented in the selected work">
          <p>Across the work</p>
          <ul>{skillsTrail.map((skill) => <li key={skill}>{skill}</li>)}</ul>
        </div>
        <div id="supporting-work" className="supporting-work">
          <span className="watermark" aria-hidden="true">SYSTEMS</span>
          <header><p className="eyebrow"><span />Systems index</p><h3>The range behind the products.</h3><p className="supporting-work__lede">Native apps, local AI systems, CLIs, game tooling, cloud platforms, and field automation — built end to end, not assembled from templates.</p></header>
          <div className="supporting-work__grid">{supportingWork.map((item) => <article className={item.href ? 'supporting-work__item--linked' : undefined} key={item.title}><small>{item.label}</small><h4>{item.title}</h4><p>{item.copy}</p><div>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{item.href && <a className="supporting-work__link" href={item.href} onClick={(event) => { event.preventDefault(); jumpTo(item.href!.slice(1)) }}>Read the field record <ArrowRight size={15} aria-hidden="true" /></a>}</article>)}</div>
        </div>
      </section>

      <section id="capabilities" className="chapter chapter--capabilities" aria-label="Capability prototypes">
        <CapabilityShowcase />
      </section>

      <section id="studio" className="chapter chapter--studio chapter--technical-thesis" aria-labelledby="studio-title">
        <div className="studio-thesis-grid">
          <header className="chapter-intro"><p className="eyebrow"><span />04 / About + how I work</p><h2 id="studio-title">From the first question to the <i>shipped system.</i></h2><p>I can work as the product designer, the engineer, the systems person, or the connective tissue between them. For the last four years, I&apos;ve worked closely with LLMs as a development medium—using them to accelerate the loop while clear decisions, software principles, and verification keep it useful.</p></header>
          <div className="studio-system-map" aria-label="Lifecycle: intent, plan, tools, verification, artifact, iteration">
            <TechnicalCanvas />
            <div className="studio-system-map__labels" aria-hidden="true"><span className="map-label map-label--intent">Intent</span><span className="map-label map-label--plan">Plan</span><span className="map-label map-label--tools">Tools</span><span className="map-label map-label--verify">Verify</span><span className="map-label map-label--artifact">Artifact</span><span className="map-label map-label--revision">Iterate</span></div>
            <p>The working pattern behind the products</p>
          </div>
        </div>
        <div className="studio-strengths" aria-label="Capabilities and evidence">
          {strengths.map((strength) => <article key={strength.number}><small>{strength.number}</small><h3>{strength.title}</h3><p>{strength.copy}</p><span>{strength.proof}</span></article>)}
        </div>
        <aside className="role-fit" aria-labelledby="role-fit-title">
          <div><p className="eyebrow"><span />Role fit</p><h3 id="role-fit-title">Useful where product, design, and engineering meet.</h3></div>
          <div className="role-fit__links">{roleFits.map((role) => <a href={role.href} key={role.title}><strong>{role.title}</strong><span>{role.project}</span><ArrowUpRight size={16} aria-hidden="true" /></a>)}</div>
        </aside>
        <div className="technical-lanes">{buildSteps.map((step) => <article key={step.number}><small>{step.number}</small><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
        <p className="process-principle">Fast with AI. Deliberate about architecture. Accountable for what ships.</p>
      </section>

      <section id="field" className="chapter chapter--field-evidence" aria-labelledby="field-title">
        <span className="watermark watermark--field" aria-hidden="true">FIELD PROVEN</span>
        <div className="field-scene__intro chapter-intro"><p className="eyebrow"><span />05 / Field context</p><h2 id="field-title">I learned to build for real conditions <i>before software.</i></h2><p>Before product engineering, I worked close to rig-floor automation where equipment had to be understood, documented, tested, and trusted under real operating conditions.</p></div>
        <div className="field-scene__sequence" aria-label="Selected field record"><FieldRecord /></div>
        <div className="field-engineering-story">
          <header><p className="eyebrow"><span />Responsibility in the field</p><h3>Operations, prototypes, and verification.</h3></header>
          <div className="field-engineering-story__grid">
            <article><small>01 / Operations</small><strong>Hands-free casing work</strong><p>Supported production-casing operations using robotic pipe-handling equipment and a hands-free workflow in the field.</p></article>
            <article><small>02 / Prototypes</small><strong>Mechanisms + SOPs</strong><p>Helped engineer prototype components including an automatic stabbing guide, latching mechanisms, spring-activated elevators, and driller-activated control behavior—and wrote the operating procedures around them.</p></article>
            <article><small>03 / Verification</small><strong>Torque + top-drive testing</strong><p>Verified top-drive torque outputs and helped establish torque-monitoring and testing practices that connected machine behavior to an operator’s decision.</p></article>
          </div>
          <p className="field-engineering-story__note">Firsthand work history, supported by a private photo and video archive. Employer names and equipment specifics available on request.</p>
        </div>
        <blockquote className="field-transition">Systems must remain legible when conditions stop being ideal.</blockquote>
      </section>

      <section id="services" className="chapter chapter--services" aria-labelledby="services-title">
        <header className="chapter-intro"><p className="eyebrow"><span />06 / Hire or collaborate</p><h2 id="services-title">Two ways to build <i>something real.</i></h2><p>Bring me into the team for product ownership across design and engineering, or engage me to shape and deliver a focused product system.</p></header>
        <div className="work-paths">
          <article className="work-path work-path--hire" id="hire">
            <small>01 / Join your team</small>
            <h3>Creative product engineering with end-to-end ownership.</h3>
            <p>Best suited to ambitious product problems, design-engineering ownership, native, web, AI, or interactive systems, and small high-agency teams.</p>
            <ul><li>Creative Product Engineer</li><li>Founding Engineer</li><li>Creative Technologist</li><li>AI Product Engineer</li></ul>
            <div className="work-path__actions"><a className="button button--acid" href="mailto:owner@outboundautonomy.com?subject=Creative%20Product%20Engineer%20conversation">Discuss a role <Mail size={15} /></a><a className="text-link" href="https://github.com/SelfMadeSE" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a></div>
          </article>
          <article className="work-path work-path--build">
            <small>02 / Build a product together</small>
            <h3>A focused engagement from direction through delivery.</h3>
            <p>Choose a practical starting point below. Each range is typical—not a fixed quote—and the scope stays tied to a credible release.</p>
            <a className="button button--outline" href="#service-options">View engagement options <ArrowRight size={15} /></a>
          </article>
        </div>
        <div className="service-grid" id="service-options">{services.map((service) => <article className="service-card" key={service.title}><header><small>{service.number}</small><span>Typical range</span></header><h3>{service.title}</h3><strong>{service.range}</strong><p>{service.copy}</p><ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul><a href="#now">Choose this direction <ArrowRight size={15} /></a></article>)}</div>
        <p className="services-note">These are typical build ranges, not fixed quotes. Final scope depends on the existing product, required integrations, evidence, security and compliance obligations, and how quickly the product needs to reach a credible release.</p>
      </section>

      <section id="now" className="chapter chapter--now chapter--inquiry" aria-label="Start a project">
        <ProjectInquiry />
      </section>
    </main>
    {selectedProject && <div className="project-transition" aria-hidden="true"><span>Opening {projects.find((project) => project.slug === selectedProject)?.title}</span></div>}
  </div>
}
