'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-void/95 backdrop-blur-sm border-b border-signal/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-signal">
          EGS
        </Link>
        
        <div className="flex gap-8">
          <Link href="/#projects" className="text-muted hover:text-signal transition-colors">
            Projects
          </Link>
          <Link href="/#contact" className="text-muted hover:text-signal transition-colors">
            Contact
          </Link>
          <Link href="https://github.com/SelfMadeSE" target="_blank" className="text-muted hover:text-signal transition-colors">
            GitHub
          </Link>
        </div>
      </div>
    </nav>
  )
}