import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const inRepo = path.join(root, 'reference', 'quickquo_final_marketing_site.html')
const fallback = 'c:/Users/jacow/Downloads/quickquo_final_marketing_site.html'
const src = fs.existsSync(inRepo) ? inRepo : fallback
const dst = path.join(root, 'src/app/quickquo-landing.css')

const html = fs.readFileSync(src, 'utf8')
const styles = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1].trim())
if (styles.length < 2) {
  console.error('Expected 2 <style> blocks, got', styles.length)
  process.exit(1)
}

let out = `/* Ported from quickquo_final_marketing_site.html */\n${styles[0]}\n\n${styles[1]}\n`
out = out
  .replace(/'Instrument Serif',serif/g, 'var(--font-instrument-serif), Georgia, serif')
  .replace(/'Geist',system-ui,sans-serif/g, 'var(--font-geist-sans), system-ui, sans-serif')
  .replace(/font-family:'Instrument Serif',serif/g, 'font-family: var(--font-instrument-serif), Georgia, serif')

fs.writeFileSync(dst, out)
console.log('Wrote', dst, 'bytes', out.length)
