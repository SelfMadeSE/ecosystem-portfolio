export type WorldId = 'field' | 'rome' | 'studio' | 'work' | 'lab' | 'now'

export type WorldChapter = {
  id: WorldId
  number: string
  nav: string
  eyebrow: string
  title: string
  statement: string
  detail: string
  camera: { position: [number, number, number]; target: [number, number, number]; color: string }
  media: Array<{ src: string; alt: string; role: string }>
}

export const worlds: WorldChapter[] = [
  {
    id: 'field', number: '00', nav: 'FIELD', eyebrow: 'Alberta / origin', title: 'Rylee Benson.',
    statement: 'Field work → independent engineering.',
    detail: 'A real Alberta drilling site is the opening coordinate. The systems work begins with a life lived close to equipment, weather, constraints, and the people operating through all three.',
    camera: { position: [0, 1.1, 7], target: [0, 0.4, 0], color: '#93a6b0' },
    media: [
      { src: '/media/field/rig-day.webp', alt: 'Drilling rig at an Alberta field site', role: 'Field scale and opening environment' },
      { src: '/media/field/tubulars.webp', alt: 'Tubular pipe sections in snow at a field site', role: 'Transition tunnel material' },
    ],
  },
  {
    id: 'rome', number: '01', nav: 'ROME', eyebrow: 'Rome / expansion', title: 'A different frame.',
    statement: 'Travel becomes a memory-space, not a mood board.',
    detail: 'The brick vault, couch, street-light warmth, and founder photographs are the architectural source plates for this chapter. The camera moves through them rather than treating them as an About gallery.',
    camera: { position: [0, 0.35, -12.5], target: [0, 0, -20], color: '#3a160c' },
    media: [
      { src: '/media/rome/vault.webp', alt: 'Rylee Benson seated beneath a brick vault', role: 'Primary vaulted-room geometry' },
      { src: '/media/rome/arrival.webp', alt: 'Rylee Benson in a warm Rome interior', role: 'Arrival memory plate' },
      { src: '/media/rome/rome-two.webp', alt: 'Rylee Benson seated with a companion in Rome', role: 'Social memory plate' },
      { src: '/media/rome/rome-portrait.webp', alt: 'Rylee Benson in a Rome interior', role: 'Founder close-range plate' },
    ],
  },
  {
    id: 'studio', number: '02', nav: 'STUDIO', eyebrow: 'Ecosystem Global Solutions Inc.', title: 'Build the system.',
    statement: 'AI systems, developer tools, and creative software from prototype to shipped product.',
    detail: 'The warm architectural world resolves into a working archive: current company context, technical capability, and real interfaces ready to be inspected.',
    camera: { position: [0, 0.3, -32.5], target: [0, 0, -40], color: '#0e1716' },
    media: [{ src: '/media/portrait/rylee-benson-hero-desktop.webp', alt: 'Rylee Benson, founder and full-stack engineer', role: 'Present-day founder plate' }],
  },
  {
    id: 'work', number: '03', nav: 'WORK', eyebrow: 'Selected work', title: 'Enter the work.',
    statement: 'Four product worlds with real operating surfaces.',
    detail: 'Game Studio, MuseStudio, Outbound Autonomy, and Autonomous Operations remain individually addressable case studies. In the spatial route, they are entrances rather than SaaS cards.',
    camera: { position: [0, 0.2, -52.5], target: [0, 0, -60], color: '#101111' },
    media: [],
  },
  {
    id: 'lab', number: '04', nav: 'LAB', eyebrow: 'Experiments', title: 'Make the method visible.',
    statement: 'Evidence-bound AI work, native tools, and practical automation.',
    detail: 'This is where smaller prototypes, operating patterns, and the systems behind the public work can live without being inflated into product claims.',
    camera: { position: [0, 0.2, -72.5], target: [0, 0, -80], color: '#182012' },
    media: [],
  },
  {
    id: 'now', number: '05', nav: 'NOW', eyebrow: 'Current position', title: 'Let’s make it real.',
    statement: 'Rylee Benson — Founder / Full-Stack Engineer.',
    detail: 'The route ends in the present: a direct way to inspect the source work, see the project record, and start a conversation.',
    camera: { position: [0, 0.2, -92.5], target: [0, 0, -100], color: '#1f2a13' },
    media: [],
  },
]

export const worldById = (id: WorldId) => worlds.find((world) => world.id === id)
