export type WorldId = 'present' | 'work' | 'capabilities' | 'studio' | 'field' | 'services' | 'now'

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
    id: 'present', number: '01', nav: 'INTRO', eyebrow: 'Independent product engineer', title: 'Design, build, and ship ambitious software.',
    statement: 'Product direction, visual design, AI-assisted engineering, and delivery across the stack.',
    detail: 'Real product surfaces stay visible while motion supports the systems behind them.',
    camera: { position: [0, 0.8, 7], target: [0, 0.2, 0], color: '#111a1a' },
    media: [],
  },
  {
    id: 'work', number: '02', nav: 'WORK', eyebrow: 'Selected work', title: 'Products with a trail.',
    statement: 'Projects with a clear product, build, and verification story.',
    detail: 'Open a project to see what exists, why it matters, and what can be verified today.',
    camera: { position: [0, 0.2, -12.5], target: [0, 0, -20], color: '#101111' },
    media: [],
  },
  {
    id: 'capabilities', number: '03', nav: 'CAPABILITIES', eyebrow: 'What I build', title: 'Working interfaces, not promises.',
    statement: 'Six interactive systems showing the products I design and engineer.',
    detail: 'Marketplace, CRM, billing, regulated workflows, AI automation, native tools, and operations.',
    camera: { position: [0, 0.3, -32.5], target: [0, 0, -40], color: '#0e1716' },
    media: [],
  },
  {
    id: 'studio', number: '04', nav: 'ABOUT / PROCESS', eyebrow: 'About + how I work', title: 'From the first question to the shipped system.',
    statement: 'Find the problem, shape the system, build the slice, and check the result.',
    detail: 'The goal is the next useful version, not the most impressive plan.',
    camera: { position: [0, 0.3, -42.5], target: [0, 0, -50], color: '#0e1716' },
    media: [],
  },
  {
    id: 'field', number: '05', nav: 'CONTEXT', eyebrow: 'Operating context', title: 'I design for the conditions products actually face.',
    statement: 'Weather, noise, time pressure, and imperfect information.',
    detail: 'Real working conditions are part of the product context, not an afterthought.',
    camera: { position: [0, 0.35, -62.5], target: [0, 0, -70], color: '#252e2c' },
    media: [
      { src: '/media/field/field-hero-safe.jpg', alt: 'Winter industrial field site under an expansive sky', role: 'FIELD establishing frame' },
      { src: '/media/field/field-detail-safe.jpg', alt: 'Editorial detail of field equipment', role: 'FIELD process detail' },
    ],
  },
  {
    id: 'services', number: '06', nav: 'WAYS TO WORK', eyebrow: 'Ways to work together', title: 'Choose the right level of help.',
    statement: 'Clear starting points and realistic budget bands.',
    detail: 'Product direction, interactive sites, AI workflows, and complete platforms.',
    camera: { position: [0, 0.2, -72.5], target: [0, 0, -80], color: '#182012' },
    media: [],
  },
  {
    id: 'now', number: '07', nav: 'START A PROJECT', eyebrow: 'Start a project', title: 'Tell me what needs to exist.',
    statement: 'A structured project note with a direct email fallback.',
    detail: 'Choose the closest project type, budget, and timing, then open a prepared email.',
    camera: { position: [0, 0.2, -92.5], target: [0, 0, -100], color: '#1f2a13' },
    media: [],
  },
]

export const worldById = (id: WorldId) => worlds.find((world) => world.id === id)
