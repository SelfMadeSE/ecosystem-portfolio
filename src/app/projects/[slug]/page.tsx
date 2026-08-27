import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projectBySlug, projects } from '@/data/projects'
import { SiteHeader } from '@/components/SiteHeader'

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })) }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectBySlug(slug)
  if (!project) notFound()
  return <><SiteHeader /><main className={`case-study case-study--${project.accent}`}><Link className="back-link" href="/#work"><ArrowLeft size={17} /> All selected work</Link><header className="case-study__hero"><p className="eyebrow">{project.number} / {project.eyebrow}</p><h1>{project.title}</h1><p className="case-study__summary">{project.summary}</p><div className="case-study__actions">{project.href && <a className="button button--primary" href={project.href} target="_blank" rel="noreferrer">Visit product <ArrowUpRight size={16} /></a>}{project.github && <a className="button" href={project.github} target="_blank" rel="noreferrer">Source repository <ArrowUpRight size={16} /></a>}</div></header><figure className="case-study__media"><img src={project.media.src} alt={project.media.alt} /><figcaption><span>{project.media.source}</span><span>{project.media.note}</span></figcaption></figure><div className="case-study__grid"><section><p className="eyebrow">What it is</p><p>{project.whatItIs}</p></section><section><p className="eyebrow">Why it exists</p><p>{project.why}</p></section></div><section className="case-study__details"><article><p className="eyebrow">What I built</p><ul>{project.built.map((item) => <li key={item}>{item}</li>)}</ul></article><article><p className="eyebrow">Architecture</p><ol>{project.architecture.map((item) => <li key={item}>{item}</li>)}</ol></article><article><p className="eyebrow">Hard engineering problems</p><ul>{project.problems.map((item) => <li key={item}>{item}</li>)}</ul></article><article><p className="eyebrow">Tech</p><div className="tag-list">{project.tech.map((item) => <span key={item}>{item}</span>)}</div></article></section><section className="verified-block"><p className="eyebrow">Current verified status</p><p>{project.verified}</p></section></main></>
}
