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
    id: 'field', number: '01', nav: 'FIELD', eyebrow: 'Alberta / origin', title: 'Rylee Benson.',
    statement: 'A real Alberta field record.',
    detail: 'A real Alberta field record is the opening coordinate: equipment, weather, constraints, and the people operating through all three. The selected frames are editorial derivatives of the original archive—not a reconstructed industrial scene.',
    camera: { position: [0, 1.1, 7], target: [0, 0.4, 0], color: '#93a6b0' },
    media: [
      { src: '/media/field/field-hero-safe.jpg', alt: 'Winter industrial field site under an expansive sky', role: 'FIELD opening environment' },
      { src: '/media/field/field-detail-safe.jpg', alt: 'Vertical editorial detail of field equipment', role: 'FIELD depth plate' },
    ],
  },
  {
    id: 'rome', number: '02', nav: 'ROME', eyebrow: 'Rome / expansion', title: 'A different frame.',
    statement: 'Italian architecture and personal travel record.',
    detail: 'Architectural and personal source plates from Italy record a period of travel. Spain remains a later travel record and is never relabelled as Rome.',
    camera: { position: [0, 0.35, -12.5], target: [0, 0, -20], color: '#3a160c' },
    media: [
      { src: '/media/travel/rome-plate-01.jpg', alt: 'Italian architectural arrival environment', role: 'Italy arrival plate' },
      { src: '/media/travel/rome-plate-02.jpg', alt: 'Italian street transition', role: 'Italy street transition' },
      { src: '/media/travel/rome-plate-03.jpg', alt: 'Italian architecture', role: 'Italy architectural plate' },
      { src: '/media/travel/rome-personal-bench.jpg', alt: 'Personal travel moment in Italy', role: 'Italy personal plate' },
    ],
  },
  {
    id: 'studio', number: '03', nav: 'STUDIO', eyebrow: 'Ecosystem Global Solutions Inc.', title: 'Build the system.',
    statement: 'AI systems, developer tools, and creative software from prototype to shipped product.',
    detail: 'The warm architectural world resolves into a working archive: current company context, technical capability, and real interfaces ready to be inspected.',
    camera: { position: [0, 0.3, -32.5], target: [0, 0, -40], color: '#0e1716' },
    media: [{ src: '/media/founder/current-portrait-3498.jpg', alt: 'Rylee Benson, current candid portrait', role: 'Present-day founder plate' }],
  },
  {
    id: 'work', number: '04', nav: 'WORK', eyebrow: 'Selected work', title: 'Enter the work.',
    statement: 'Four product worlds with real operating surfaces.',
    detail: 'Game Studio, MuseStudio, Outbound Autonomy, and Autonomous Operations remain individually addressable case studies. In the spatial route, they are entrances rather than SaaS cards.',
    camera: { position: [0, 0.2, -52.5], target: [0, 0, -60], color: '#101111' },
    media: [],
  },
  {
    id: 'lab', number: '05', nav: 'LAB', eyebrow: 'Experiments', title: 'Make the method visible.',
    statement: 'Evidence-bound AI work, native tools, and practical automation.',
    detail: 'This is where smaller prototypes, operating patterns, and the systems behind the public work can live without being inflated into product claims.',
    camera: { position: [0, 0.2, -72.5], target: [0, 0, -80], color: '#182012' },
    media: [],
  },
  {
    id: 'now', number: '06', nav: 'NOW', eyebrow: 'Current position', title: 'Let’s make it real.',
    statement: 'Rylee Benson — Founder / Full-Stack Engineer.',
    detail: 'The route ends in the present: a direct way to inspect the source work, see the project record, and start a conversation.',
    camera: { position: [0, 0.2, -92.5], target: [0, 0, -100], color: '#1f2a13' },
    media: [],
  },
]

export const worldById = (id: WorldId) => worlds.find((world) => world.id === id)
