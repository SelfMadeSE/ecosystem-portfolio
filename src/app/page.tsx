import { ArrowDown, ArrowUpRight, Github, Mail } from 'lucide-react'
import { ProjectCard } from '@/components/ProjectCard'
import { PortraitPlaceholder } from '@/components/PortraitPlaceholder'
import { SiteHeader } from '@/components/SiteHeader'
import { SpatialGallery } from '@/components/SpatialGallery'
import { projects } from '@/data/projects'

const capabilities = ['AI systems & agent workflows', 'Native creative software', 'Full-stack product engineering', 'Interactive 3D on the web']

export default function Home() {
  return <>
    <SiteHeader />
    <main>
      <section className="hero" id="top">
        <div className="hero__copy"><p className="eyebrow">Ecosystem Global Solutions Inc.</p><h1>Rylee<br /><em>Benson.</em></h1><p className="hero__role">Founder / Full-Stack Engineer</p><p className="hero__proposition">I build AI systems, developer tools and creative software from prototype to shipped product.</p><div className="hero__actions"><a className="button button--primary" href="#work">Selected work <ArrowDown size={16} /></a><a className="button" href="#about">About / Résumé</a><a className="icon-action" href="https://github.com/SelfMadeSE" aria-label="Rylee Benson on GitHub" target="_blank" rel="noreferrer"><Github size={19} /></a><a className="icon-action" href="mailto:owner@outboundautonomy.com" aria-label="Email Rylee Benson"><Mail size={19} /></a></div></div>
        <PortraitPlaceholder />
        <div className="hero__index" aria-hidden="true"><span>01</span><span>Independent engineering practice<br />Grande Prairie, Alberta</span></div>
      </section>

      <section className="section work-section" id="work"><div className="section-intro"><p className="eyebrow">Selected work</p><h2>Products with a real <em>operating surface.</em></h2><p>Four current bodies of work across AI, native applications, interactive systems, and full-stack product engineering.</p></div><div className="project-grid">{projects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div></section>

      <section className="section archive-section" aria-labelledby="archive-title"><div className="section-intro archive-intro"><p className="eyebrow">Spatial product archive</p><h2 id="archive-title">A readable portfolio,<br /><em>with another dimension.</em></h2><p>Each object is built from the material logic of a real project. It is optional; the work above remains the fastest way in.</p></div><SpatialGallery projects={projects} /><p className="scene-note">Drag to orbit. Select a project object to open its case study. Reduced-motion and non-WebGL visitors keep the HTML archive above.</p></section>

      <section className="section capabilities" id="about"><div><p className="eyebrow">Capabilities</p><h2>Systems thinking<br />with a builder&apos;s <em>finish.</em></h2></div><ul>{capabilities.map((capability, index) => <li key={capability}><span>0{index + 1}</span>{capability}<ArrowUpRight size={19} /></li>)}</ul></section>

      <section className="section experiments"><div className="section-intro"><p className="eyebrow">Lab / selected experiments</p><h2>Where methods become <em>working tools.</em></h2></div><div className="experiment-list"><article><span>01</span><h3>Evidence-bound AI work</h3><p>Systems that separate a planned change from a verified runtime outcome.</p></article><article><span>02</span><h3>Creative-process capture</h3><p>Tools that preserve context, iterations, and the human decisions that shape an artifact.</p></article><article><span>03</span><h3>Human-in-the-loop operations</h3><p>Agent workflows with clear review boundaries, artifact trails, and accountability.</p></article></div></section>

      <section className="contact-section" id="contact"><p className="eyebrow">Contact</p><h2>Have a system that<br />needs to become <em>real?</em></h2><a href="mailto:owner@outboundautonomy.com">owner@outboundautonomy.com <ArrowUpRight size={25} /></a><p>Rylee Benson · Ecosystem Global Solutions Inc.</p></section>
    </main>
    <footer><span>© {new Date().getFullYear()} Rylee Benson</span><a href="#top">Back to top ↑</a></footer>
  </>
}
