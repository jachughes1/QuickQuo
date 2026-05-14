import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const inRepo = path.join(root, 'reference', 'quickquo_final_marketing_site.html')
const fallback = 'c:/Users/jacow/Downloads/quickquo_final_marketing_site.html'
const srcHtml = fs.existsSync(inRepo) ? inRepo : fallback

const html = fs.readFileSync(srcHtml, 'utf8')
const bodyStart = html.indexOf('<body>')
const bodyEnd = html.indexOf('<script>', bodyStart)
if (bodyStart === -1 || bodyEnd === -1) throw new Error('Could not find body')

let body = html.slice(bodyStart + '<body>'.length, bodyEnd).trim()

// Avoid clobbering window.scrollTo — original HTML used a global function named scrollTo
body = body.replace(/scrollTo\(/g, '__qqScroll(')
body = body.replace(/openDemo\(\)/g, '__qqDemo()')
body = body.replace(/submitWaitlist\(\)/g, '__qqSubmitWaitlist()')

const outFile = path.join(root, 'src/components/landing/landing-body-html.ts')
const out = `/* eslint-disable max-len */
/* Auto-generated from quickquo_final_marketing_site.html — do not edit by hand */
export const LANDING_BODY_HTML = ${JSON.stringify(body)} as const
`
fs.writeFileSync(outFile, out)
console.log('Wrote', outFile, 'length', body.length)
