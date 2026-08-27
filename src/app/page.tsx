import { SiteHeader } from '@/components/SiteHeader'
import { SpatialResume } from '@/components/SpatialResume'

export default function Home() {
  return <>
    <SiteHeader />
    <main>
      <SpatialResume />
    </main>
    <footer><span>© {new Date().getFullYear()} Rylee Benson</span><a href="#top">Back to top ↑</a></footer>
  </>
}
