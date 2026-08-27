import Link from 'next/link'

export function SiteHeader() {
  return <header className="site-header">
    <Link className="wordmark" href="/" aria-label="Rylee Benson home"><span>RB</span><b>Rylee Benson</b></Link>
    <nav aria-label="Primary navigation"><a href="/#work">Work</a><a href="/#about">About</a><a href="https://github.com/SelfMadeSE" target="_blank" rel="noreferrer">GitHub</a><a className="header-contact" href="mailto:owner@outboundautonomy.com">Contact</a></nav>
  </header>
}
