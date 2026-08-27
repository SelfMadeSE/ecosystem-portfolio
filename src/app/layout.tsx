import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rylee Benson — Founder / Full-Stack Engineer',
  description: 'Rylee Benson builds AI systems, developer tools and creative software from prototype to shipped product.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
