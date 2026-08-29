import Link from 'next/link'
import type { Project } from '@/data/projects'

export function ProjectCard({ project }: { project: Project }) {
  return <article className={`project-card project-card--${project.accent}`}>
    <div className="project-card__top"><span>{project.number}</span><span>{project.status}</span></div>
    <div className="project-card__media"><img src={project.media.src} alt={project.media.alt} loading="lazy" /></div>
    <p className="eyebrow">{project.eyebrow}</p>
    <h3>{project.title}</h3>
    <p>{project.summary}</p>
    <Link href={`/projects/${project.slug}`} className="text-link">Open the build <span aria-hidden="true">↗</span></Link>
  </article>
}
