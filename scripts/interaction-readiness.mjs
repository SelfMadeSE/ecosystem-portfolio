import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:3024'
const output = path.join(process.cwd(), 'artifacts', 'interaction-readiness')
await mkdir(output, { recursive: true })

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
const page = await context.newPage()
const errors = []
page.on('console', message => {
  if (['error', 'warning'].includes(message.type())) errors.push(`console ${message.type()} ${message.text()}`)
})
page.on('pageerror', error => errors.push(`pageerror ${error.message}`))
page.on('response', response => {
  if (response.status() >= 400) errors.push(`response ${response.status()} ${response.url()}`)
})

await page.goto(baseUrl, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)

const range = await page.locator('#capabilities').evaluate(element => {
  const top = element.getBoundingClientRect().top + scrollY
  return { top, bottom: top + element.getBoundingClientRect().height }
})
const samples = []
for (let y = range.top; y <= range.bottom; y += 90) {
  await page.evaluate(target => {
    window.__lenis?.scrollTo(target, { immediate: true, force: true })
    window.scrollTo({ top: target, behavior: 'instant' })
  }, y)
  await page.waitForTimeout(70)
  samples.push({
    y,
    flips: await page.locator('.cap-card').evaluateAll(cards => cards.map(card => Number.parseFloat(getComputedStyle(card).getPropertyValue('--flip')) || 0)),
  })
}

const firstComplete = [0, 1, 2, 3].map(index => samples.find(sample => sample.flips[index] >= 0.99)?.y ?? null)
const finalFlips = samples.at(-1)?.flips ?? []

for (let y = range.bottom; y >= range.top; y -= 120) {
  await page.evaluate(target => {
    window.__lenis?.scrollTo(target, { immediate: true, force: true })
    window.scrollTo({ top: target, behavior: 'instant' })
  }, y)
  await page.waitForTimeout(60)
}
const reversedFlips = await page.locator('.cap-card').evaluateAll(cards => cards.map(card => Number.parseFloat(getComputedStyle(card).getPropertyValue('--flip')) || 0))

const anchorScreens = ['present', 'field', 'now']
for (const anchor of anchorScreens) {
  await page.goto(`${baseUrl}/#${anchor}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: path.join(output, `anchor-${anchor}.png`) })
}

for (const slug of ['game-studio', 'musestudio', 'outbound-autonomy', 'autonomous-operations']) {
  await page.goto(`${baseUrl}/projects/${slug}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  await page.screenshot({ path: path.join(output, `case-${slug}.png`), fullPage: true })
}

const ordered = firstComplete.every(value => value !== null) && firstComplete.every((value, index) => index === 0 || value > firstComplete[index - 1])
const finalComplete = finalFlips.length === 4 && finalFlips.every(value => value >= 0.99)
const reverseComplete = reversedFlips.length === 4 && reversedFlips.every(value => value <= 0.01)
const report = { baseUrl, range, firstComplete, finalFlips, reversedFlips, ordered, finalComplete, reverseComplete, errors }
await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2))
await browser.close()

console.log(JSON.stringify(report, null, 2))
if (!ordered || !finalComplete || !reverseComplete || errors.length) process.exitCode = 1
