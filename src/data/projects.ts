export type ProjectStatus = 'production' | 'working-local' | 'prototype' | 'private-system' | 'reference-only'

export type Project = {
  slug: string
  number: string
  title: string
  eyebrow: string
  status: ProjectStatus
  statusLabel: string
  role: string
  contribution: string
  evidence: string[]
  skills: string[]
  decisions: string[]
  lessons: string[]
  summary: string
  whatItIs: string
  why: string
  built: string[]
  architecture: string[]
  problems: string[]
  tech: string[]
  verified: string
  media: { src: string; alt: string; source: string; note: string }
  visual: {
    treatment: 'revision' | 'document' | 'scan' | 'topology'
    label: string
    detail: string
    secondarySrc?: string
  }
  href?: string
  github?: string
  accent: 'violet' | 'orange' | 'cyan' | 'lime'
}

export const projects: Project[] = [
  {
    slug: 'game-studio', number: '01', title: 'Game Studio', eyebrow: 'AI / Unity / creator systems', status: 'working-local', statusLabel: 'Working local build', role: 'Product architect and technical lead', contribution: 'Defined the creator-to-playable workflow, built the revision loop, and wired host-owned verification.', evidence: ['Running Unity editor integration', 'Automated checks in the native vertical slice', 'Retained candidate and verification artifacts'], skills: ['Product systems', 'Unity integration', 'Agent orchestration', 'Verification design'], decisions: ['Keep the host in control of promotion', 'Persist every meaningful revision', 'Show failure states instead of hiding them'], lessons: ['A playable artifact is more useful than a confident generation claim', 'Verification must be part of the product loop'], accent: 'violet',
    summary: 'Describe a game. Get a playable Unity draft you can inspect, revise, and keep as a real project.',
    whatItIs: 'A local Unity environment where a creator describes a game, AI agents stage a candidate build, and the host verifies it before it becomes a permanent project revision.',
    why: 'A good first response is not enough. The creator needs a path from direction to something playable, inspectable, and easy to revise.',
    built: ['Versioned project revisions with rollback', 'Creator interface with a live run stream', 'Host-side verification before any change is kept', 'A shell-free Unity adapter that retains runtime evidence'],
    architecture: ['Creator direction → revision plan', 'Agent workspace → staged candidate', 'Host verification → versioned outcome', 'Runtime artifacts → retained evidence'],
    problems: ['Preserving the same project through successive changes', 'Separating an agent claim from verified runtime proof', 'Making lifecycle and failure states legible without hiding the system'],
    tech: ['TypeScript', 'React', 'Unity', 'Node.js', 'local Codex adapter'],
    verified: 'Runs locally against a real Unity editor. Every capture here is from the working build, and the Godot generation of this system carries 351+ automated tests.',
    media: { src: '/media/product-evidence/game-studio-live.jpg', alt: 'Game Studio creator interface for a versioned playable-draft workflow', source: 'Local Game Studio Unity project capture · 2026-08-26', note: 'Local product capture from the current prototype.' },
    visual: { treatment: 'revision', label: 'Local proof environment', detail: 'Direction → candidate → verified revision', secondarySrc: '/media/product-evidence/game-studio-direction-loop.gif' },
    github: 'https://github.com/SelfMadeSE/Game-Studio',
  },
  {
    slug: 'musestudio', number: '02', title: 'MuseStudio', eyebrow: 'native creative software', status: 'working-local', statusLabel: 'Native macOS application', role: 'Product designer and SwiftUI engineer', contribution: 'Shaped the document model and built the native editing surface around lyrics, takes, and context.', evidence: ['Running macOS application', 'SwiftUI and SwiftData project model', 'Native capture from the working app'], skills: ['SwiftUI', 'SwiftData', 'Interaction design', 'Creative tooling'], decisions: ['Keep project context beside the writing', 'Treat AI as an instrument inside the document'], lessons: ['Creative assistance needs memory and restraint, not just generation'], accent: 'orange',
    summary: 'A native macOS songwriting studio — write, record, and revise with AI without leaving the document.',
    whatItIs: 'A native songwriting workspace for lyrics, recordings, project history, and the Muse AI interaction surface, built with SwiftUI and SwiftData.',
    why: 'Creative work builds over time. The tool keeps the writing, performance context, and earlier decisions available instead of flattening everything into one prompt.',
    built: ['Native editor and project navigation', 'Muse AI interaction surface', 'Recording and lyric-context workflows', 'Local persistence with project history'],
    architecture: ['Artist profile + track context', 'Lyrics and recorded takes', 'Muse prompt/context assembly', 'Native editing and persisted project state'],
    problems: ['Representing evolving creative context without flattening it into a prompt', 'Keeping the native workflow responsive while preserving history', 'Designing AI assistance as an instrument, not the entire interface'],
    tech: ['Swift', 'SwiftUI', 'SwiftData', 'XCTest', 'macOS'],
    verified: 'A real native SwiftUI + SwiftData application — the capture is taken from the running app on macOS.',
    media: { src: '/media/musestudio/muse-editor.png', alt: 'MuseStudio native macOS editor with Muse AI controls', source: 'Captured from the running macOS app', note: 'The native Muse editor with lyrics, takes, and AI controls in one surface.' },
    visual: { treatment: 'document', label: 'Native macOS capture', detail: 'Document + local project context' },
  },
  {
    slug: 'outbound-autonomy', number: '03', title: 'Outbound Autonomy', eyebrow: 'web product / site intelligence', status: 'production', statusLabel: 'Public web product', role: 'Founder, product designer, and engineer', contribution: 'Designed and shipped the audit flow from URL input through scored findings and practical next steps.', evidence: ['Production site at outboundautonomy.com', 'Live URL scan flow', 'Desktop and mobile product surfaces'], skills: ['Product strategy', 'Next.js', 'Information architecture', 'Launch execution'], decisions: ['Prioritize decisions over dashboards', 'Use specific language instead of inflated outcomes'], lessons: ['An audit earns trust by making the next action obvious'], accent: 'cyan',
    summary: 'Paste a URL, get a scored audit and a prioritized plan — live in production at outboundautonomy.com.',
    whatItIs: 'A public web product that scans sites, organizes findings, compares competitive context, and turns observations into next steps.',
    why: 'An audit is useful when it helps a site owner decide what to do next—not when it simply produces more information.',
    built: ['Public scan and audit-report experience', 'Scored findings across product dimensions', 'Prioritization and comparison surfaces', 'Next-step prompts for implementation planning'],
    architecture: ['URL input → scan', 'Audit findings → prioritization', 'Competitive context → report', 'Finding → practical next step'],
    problems: ['Turning multi-signal site analysis into a clear next action', 'Keeping product language specific without overclaiming outcomes', 'Designing a complete desktop and mobile audit experience'],
    tech: ['Next.js', 'React', 'TypeScript', 'Vercel'],
    verified: 'In production on Vercel. Open it, paste a URL, and watch it work.',
    media: { src: '/media/product-evidence/outbound-live.jpg', alt: 'Outbound Autonomy website intelligence interface', source: 'Outbound Autonomy production capture · 2026-08-26', note: 'The live product — open it and run an audit yourself.' },
    visual: { treatment: 'scan', label: 'Production surface', detail: 'URL → finding → practical next step' },
    href: 'https://outboundautonomy.com/',
  },
  {
    slug: 'autonomous-operations', number: '04', title: 'Autonomous Operations', eyebrow: 'multi-agent orchestration', status: 'private-system', statusLabel: 'Private production system', role: 'Systems architect and operator', contribution: 'Defined the agent contracts, approval boundaries, event trail, and operational safeguards.', evidence: ['Private production topology', '639 commits of systems work', 'Public architecture map with sensitive interfaces withheld'], skills: ['Agent systems', 'Python', 'Docker', 'Operational design'], decisions: ['Bound autonomy with approval tiers', 'Retain artifacts and kill switches by default'], lessons: ['Autonomy is only useful when consequences remain legible and stoppable'], accent: 'lime',
    summary: 'A seven-agent autonomous team that researches, drafts, and executes bounded work — with approval gates and kill switches.',
    whatItIs: 'A private multi-agent operations system: seven specialized agent roles coordinated through task contracts and a message bus, running on an OpenClaw gateway with an autonomous scheduler and tiered human approval.',
    why: 'Autonomous work is only useful when a person can bound it, watch it, and stop it. This system is the deliberate answer: agents do the volume, approval gates own the consequences.',
    built: ['Seven specialized agent roles with task contracts and a shared message bus', 'An autonomous scheduler with four-tier approval gates', 'Docker Compose stack: gateway, Postgres, Qdrant vector memory, local models', 'Kill switches, budget throttles, and retained artifact trails'],
    architecture: ['Brief → task contract → bounded agent workspace', 'Agent work → structured event log → artifact trail', 'Approval tier → human decision', 'Approved work → operational handoff'],
    problems: ['Retaining context across long-running multi-agent work', 'Throttling cost and stopping runaway loops', 'Defining exactly where autonomous execution stops for review'],
    tech: ['Python', 'Docker', 'Postgres', 'Qdrant', 'OpenClaw gateway', 'local + hosted models'],
    verified: '639 commits of private systems work. Shown as an architecture map because the live workspace holds credentials and operational data.',
    media: { src: '/media/autonomous-operations/workspace-topology.svg', alt: 'Architecture map of the Autonomous Operations multi-agent system', source: 'Architecture map of the live private workspace', note: 'The live system stays private — it holds credentials and operational data.' },
    visual: { treatment: 'topology', label: 'Public topology only', detail: 'Private operational interfaces withheld' },
  },
]

export const projectBySlug = (slug: string) => projects.find((project) => project.slug === slug)
