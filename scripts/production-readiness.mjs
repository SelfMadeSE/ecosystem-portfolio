import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:3024'
const output = path.join(process.cwd(), 'artifacts', 'production-readiness')
await mkdir(output, { recursive: true })

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const viewports = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1280', width: 1280, height: 800 },
  { name: '1024', width: 1024, height: 768 },
  { name: '768', width: 768, height: 1024 },
  { name: '430', width: 430, height: 932 },
  { name: '390', width: 390, height: 844 },
]
const chapters = ['present', 'work', 'capabilities', 'studio', 'field', 'services', 'now']
const projectRoutes = ['game-studio', 'musestudio', 'outbound-autonomy', 'autonomous-operations']
const report = { baseUrl, viewports: [], routes: [], errors: [] }

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'no-preference' })
  const page = await context.newPage()
  page.on('console', message => {
    if (['error', 'warning'].includes(message.type())) report.errors.push(`${viewport.name}: console ${message.type()} ${message.text()}`)
  })
  page.on('pageerror', error => report.errors.push(`${viewport.name}: pageerror ${error.message}`))
  page.on('response', response => {
    if (response.status() >= 400) report.errors.push(`${viewport.name}: response ${response.status()} ${response.url()}`)
  })
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('#present')
  await page.waitForTimeout(1600)

  const chapterResults = []
  for (const id of chapters) {
    const target = page.locator(`#${id}`)
    await target.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    const metrics = await target.evaluate(element => {
      const rect = element.getBoundingClientRect()
      const visibleText = element.innerText.trim()
      const media = [...element.querySelectorAll('img, video, canvas, spline-viewer')].map(item => {
        const mediaRect = item.getBoundingClientRect()
        return { tag: item.tagName, width: Math.round(mediaRect.width), height: Math.round(mediaRect.height) }
      })
      return {
        top: Math.round(rect.top),
        height: Math.round(rect.height),
        textLength: visibleText.length,
        firstViewportHasContent: visibleText.length > 20 && rect.top < innerHeight,
        media,
      }
    })
    chapterResults.push({ id, ...metrics })
    await page.screenshot({ path: path.join(output, `${viewport.name}-${id}.png`) })
  }

  const documentMetrics = await page.evaluate(() => ({
    innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
    headlineWords: [...document.querySelectorAll('.kinetic-word')].map(element => ({ text: element.textContent, width: element.getBoundingClientRect().width })),
  }))
  report.viewports.push({ viewport, chapters: chapterResults, documentMetrics })
  await context.close()
}

const reducedContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
const reducedPage = await reducedContext.newPage()
await reducedPage.goto(baseUrl, { waitUntil: 'domcontentloaded' })
await reducedPage.waitForTimeout(900)
report.reducedMotion = await reducedPage.evaluate(() => ({
  matches: matchMedia('(prefers-reduced-motion: reduce)').matches,
  splineCount: document.querySelectorAll('spline-viewer').length,
  cardTransforms: [...document.querySelectorAll('.cap-card__inner')].map(element => getComputedStyle(element).transform),
}))
await reducedContext.close()

for (const slug of projectRoutes) {
  const response = await fetch(`${baseUrl}/projects/${slug}`)
  report.routes.push({ slug, status: response.status })
}

await browser.close()
await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
if (report.errors.length || report.routes.some(route => route.status !== 200) || report.viewports.some(entry => entry.documentMetrics.scrollWidth !== entry.documentMetrics.innerWidth)) process.exitCode = 1
