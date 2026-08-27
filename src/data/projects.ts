export type Project = {
  slug: string
  number: string
  title: string
  eyebrow: string
  status: string
  summary: string
  whatItIs: string
  why: string
  built: string[]
  architecture: string[]
  problems: string[]
  tech: string[]
  verified: string
  media: { src: string; alt: string; source: string; note: string }
  href?: string
  github?: string
  accent: 'violet' | 'orange' | 'cyan' | 'lime'
}

export const projects: Project[] = [
  {
    slug: 'game-studio', number: '01', title: 'Game Studio', eyebrow: 'AI / Unity / creator systems', status: 'Active local prototype', accent: 'violet',
    summary: 'A Unity-first creator loop for directing a game, retaining the revision, and verifying the playable result.',
    whatItIs: 'A local-first product surface where a creator describes a game direction, an agent can stage the work, and the host owns verification before a result is promoted.',
    why: 'Creative software needs an honest path from a promising instruction to a revision that can be inspected, played, and traced back to its evidence.',
    built: ['Revision-aware project control plane', 'Local creator interface and run stream', 'Host-owned candidate staging and verification gates', 'Unity adapter path and retained runtime evidence'],
    architecture: ['Creator direction → revision plan', 'Agent workspace → staged candidate', 'Host verification → versioned outcome', 'Runtime artifacts → retained evidence'],
    problems: ['Keeping the same project intact through changes', 'Separating an agent claim from verified runtime proof', 'Making lifecycle and failure states legible without hiding the system'],
    tech: ['TypeScript', 'React', 'Unity', 'Node.js', 'local Codex adapter'],
    verified: 'Current source identifies this as the Unity-first clean core. The supplied surface is labeled a local proof environment; it is not presented as a general autonomous game-generation claim.',
    media: { src: '/media/game-studio/studio-surface.jpg', alt: 'Game Studio local creator surface showing a playable-draft workflow', source: 'Local Game Studio Unity project capture, 2026-08-26', note: 'Real local product evidence; visible language remains a local proof environment.' },
    github: 'https://github.com/SelfMadeSE/Game-Studio',
  },
  {
    slug: 'musestudio', number: '02', title: 'MuseStudio', eyebrow: 'native creative engineering', status: 'Native macOS work', accent: 'orange',
    summary: 'A macOS-native songwriting workspace that keeps writing, recording, context, and AI-assisted iteration in one creative surface.',
    whatItIs: 'The SPECTER LYRICS / Muse Studio codebase is a native SwiftUI and SwiftData application for lyric writing, recording context, project history, and the Muse AI interaction surface.',
    why: 'Creative tools should preserve process—not just export the final artifact—so revision, performance context, and writing decisions remain available to the artist.',
    built: ['SwiftUI editor and project navigation', 'Muse AI interaction surface', 'Recording and lyric-context workflows', 'Revision-oriented local persistence'],
    architecture: ['Artist profile + track context', 'Lyrics and recorded takes', 'Muse prompt/context assembly', 'Native editing and persisted project state'],
    problems: ['Representing an evolving creative context without flattening it into a prompt', 'Keeping the native workflow responsive while preserving history', 'Designing AI assistance as an instrument rather than the whole interface'],
    tech: ['Swift', 'SwiftUI', 'SwiftData', 'XCTest', 'macOS'],
    verified: 'The supplied macOS test capture shows the native Muse AI editor surface. This case study describes the source-supported product surface and does not claim a completed model run from the capture.',
    media: { src: '/media/musestudio/muse-editor.png', alt: 'MuseStudio native macOS editor with Muse AI control', source: 'Spector Muse UI test capture', note: 'Real native UI evidence. It is framed as a source-backed application capture.' },
  },
  {
    slug: 'outbound-autonomy', number: '03', title: 'Outbound Autonomy', eyebrow: 'shipped full-stack product', status: 'Live public product', accent: 'cyan',
    summary: 'A website intelligence product that turns a public URL into a prioritized audit and implementation-ready next steps.',
    whatItIs: 'A live web product centered on a free URL scan, website scoring, issue prioritization, competitor context, and AI-ready fix instructions.',
    why: 'A site owner needs an ordered decision about what to improve next—not a disconnected pile of audit data.',
    built: ['Public scan and audit-report experience', 'Scored findings across product dimensions', 'Prioritization and comparison surfaces', 'Implementation-ready fix prompt delivery'],
    architecture: ['URL input → scan', 'Audit findings → prioritization', 'Competitive context → report', 'Finding → implementation-ready next step'],
    problems: ['Turning multi-signal site analysis into a clear next action', 'Keeping public product language specific without overclaiming outcomes', 'Designing a complete desktop and mobile audit journey'],
    tech: ['Next.js', 'React', 'TypeScript', 'Vercel'],
    verified: 'The current public site presents Outbound Autonomy as a URL-based website-audit product. No customers, revenue, testimonial, or internal-pipeline metric is asserted here.',
    media: { src: '/media/outbound-autonomy/production-hero.jpg', alt: 'Outbound Autonomy public website audit product hero', source: 'Outbound Autonomy production capture, 2026-08-26', note: 'Real production product evidence; live pricing and performance claims are not repeated as portfolio claims.' },
    href: 'https://outboundautonomy.com/',
  },
  {
    slug: 'autonomous-operations', number: '04', title: 'Autonomous Operations', eyebrow: 'agent orchestration systems', status: 'Private operational work', accent: 'lime',
    summary: 'Custom operational workflows, review gates, and project workspaces built using OpenClaw.',
    whatItIs: 'A private operating layer for assigning bounded work, maintaining context and artifacts, and routing results through human review. It is custom work built using OpenClaw—not OpenClaw itself.',
    why: 'Autonomy becomes useful when responsibility, context, and review are designed into the operating workflow instead of added afterward.',
    built: ['Custom project and role workspaces', 'Mission and artifact conventions', 'Human review boundaries', 'Operational handoff patterns around an external OpenClaw gateway'],
    architecture: ['Brief → bounded workspace', 'Agent work → artifact trail', 'Review gate → human decision', 'Approved work → operational handoff'],
    problems: ['Retaining context across multi-step work', 'Keeping credentials and private operational data out of public artifacts', 'Defining where autonomous execution must stop for review'],
    tech: ['OpenClaw', 'workspace conventions', 'mission artifacts', 'custom orchestration'],
    verified: 'The private workspace is source-confirmed, but no private dashboard or credential-bearing material is published. The visual is an explicit source-backed topology abstraction, not a product screenshot.',
    media: { src: '/media/autonomous-operations/workspace-topology.svg', alt: 'Source-backed topology abstraction for the Autonomous Operations workflow', source: 'Custom OpenClaw workspace structure and official OpenClaw workspace documentation', note: 'No operational interface image is published because the source workspace contains sensitive material.' },
  },
]

export const projectBySlug = (slug: string) => projects.find((project) => project.slug === slug)
