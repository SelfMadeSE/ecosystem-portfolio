import type { Metadata } from 'next'
import './globals.css'
import './portfolio-v2.css'

export const metadata: Metadata = {
  title: 'Rylee Benson — Creative Product Engineer',
  description: 'Creative product engineering across AI systems, native applications, interactive web experiences, game tooling, marketplaces, and operational software.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
