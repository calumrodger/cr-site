// Runs after `next build` (npm postbuild). statichost serves /x from x.html but
// 404s /x/, whereas Vercel used to 308 /x/ -> /x, and old WordPress-era links use
// the trailing-slash form. This writes one /x/ -> /x rule per exported page to
// out/_redirects (statichost only applies rules when no static file matches).
// Rules are appended, so a public/_redirects copied into out/ is kept.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'out')
const REDIRECTS = path.join(OUT, '_redirects')

function listPages(dir, base = '') {
  const pages = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base + '/' + entry.name
    if (entry.isDirectory()) {
      if (entry.name !== '_next') pages.push(...listPages(path.join(dir, entry.name), rel))
    } else if (entry.name.endsWith('.html') && rel !== '/404.html' && rel !== '/index.html') {
      pages.push(rel.replace(/\.html$/, ''))
    }
  }
  return pages
}

const pages = listPages(OUT).sort()
const rules = pages.map((page) => `${page}/ ${page} 308`).join('\n') + '\n'

const existing = fs.existsSync(REDIRECTS) ? fs.readFileSync(REDIRECTS, 'utf8') : ''
fs.writeFileSync(REDIRECTS, existing && !existing.endsWith('\n') ? existing + '\n' + rules : existing + rules)

console.log(`Wrote ${pages.length} trailing-slash redirects to out/_redirects`)
