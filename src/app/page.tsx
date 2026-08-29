import { SiteHeader } from '@/components/SiteHeader'
import { SmoothScroll } from '@/components/SmoothScroll'
import { SpatialResume } from '@/components/SpatialResume'

export default function Home() {
  const buildId = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'local'
  return <>
    <SmoothScroll />
    <div className="page-grain" aria-hidden="true" />
    <SiteHeader />
    <SpatialResume />
    <footer><span>© {new Date().getFullYear()} Rylee Benson · build {buildId}</span><nav aria-label="Footer links"><a href="https://github.com/SelfMadeSE" target="_blank" rel="noreferrer">GitHub</a><a href="#top">Back to top ↑</a></nav></footer>
  </>
}
