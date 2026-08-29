import Link from 'next/link'

export function SiteHeader() {
  return <header className="site-header">
    <Link className="wordmark" href="/" aria-label="Rylee Benson — home"><span>RB</span><b>Rylee Benson</b></Link>
    <nav aria-label="Primary navigation"><a href="/#work">Work</a><Link href="/canadian-compute">Canadian Compute</Link><a href="/#capabilities">What I build</a><a href="/#studio">About + process</a><a href="/#services">Services</a><a className="header-contact" href="/#now">Start a project</a></nav>
  </header>
}
