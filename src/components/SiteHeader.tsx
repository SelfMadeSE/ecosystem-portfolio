import Link from 'next/link'

export function SiteHeader() {
  return <header className="site-header">
    <Link className="wordmark" href="/" aria-label="Rylee Benson home"><span>RB</span><b>Rylee Benson</b></Link>
    <nav aria-label="Primary navigation"><a href="/#field">Field</a><a href="/#rome">Rome</a><a href="/#studio">Studio</a><a href="/#work">Work</a><a className="header-contact" href="/#now">Now</a></nav>
  </header>
}
