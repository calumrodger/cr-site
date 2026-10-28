// One-off export of the headless WordPress content into the repo.
//
//   node scripts/export-wordpress.mjs
//
// Writes content/posts/<slug>.html (YAML frontmatter + the post HTML exactly as
// WPGraphQL returns it) and content/categories.json, and mirrors every file under
// cms.calumrodger.com/wp-content/uploads/ that the content references into
// public/wp-content/uploads/ (same paths), rewriting those URLs to root-relative.
// Re-running it overwrites content/ and skips uploads that are already downloaded.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const API_URL = process.env.WORDPRESS_API_URL || 'https://cms.calumrodger.com/graphql'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const POSTS_DIR = path.join(ROOT, 'content', 'posts')
const PUBLIC_DIR = path.join(ROOT, 'public')

// The fallback featured image hardcoded in src/helpers/api-utils.js
const PLACEHOLDER_IMAGE = 'http://cms.calumrodger.com/wp-content/uploads/2023/03/placeholderImage.png'

const UPLOAD_URL = /https?:\/\/cms\.calumrodger\.com(\/wp-content\/uploads\/[^\s"'<>()\\]+)/g
const ANY_CMS_URL = /https?:\/\/cms\.calumrodger\.com[^\s"'<>()\\]*/g

async function fetchAPI(query) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

// Same fields as getPostData() in src/helpers/api-utils.js, plus date (to keep
// the DATE DESC order) and pageInfo (to warn if anything is past the first 100).
const postsQuery = `
  query AllPosts {
    posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          title
          slug
          date
          content
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                height
                width
              }
            }
          }
          extraPostData {
            featuredPost
            blurb
            indexPost
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  }
`

// Same as getCategoryData() in src/helpers/api-utils.js
const categoriesQuery = `
  query Categories {
    categories {
      edges {
        node {
          id
          slug
          name
        }
      }
    }
  }
`

const uploads = new Map() // upload path -> source URL

function rewriteUploads(str) {
  if (typeof str !== 'string') return str
  return str.replace(UPLOAD_URL, (url, uploadPath) => {
    uploads.set(uploadPath, url)
    return uploadPath
  })
}

function serialise(data, content) {
  const yaml = matter.stringify('', data).replace(/\n+$/, '\n')
  return yaml + content
}

async function download(uploadPath, url) {
  const dest = path.join(PUBLIC_DIR, decodeURIComponent(uploadPath))
  if (fs.existsSync(dest)) return { uploadPath, bytes: fs.statSync(dest).size, skipped: true }
  const res = await fetch(url.replace(/^http:/, 'https:'))
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.writeFileSync(dest, buf)
  return { uploadPath, bytes: buf.length, skipped: false }
}

async function inBatches(items, size, fn) {
  const results = []
  for (let i = 0; i < items.length; i += size) {
    results.push(...(await Promise.allSettled(items.slice(i, i + size).map(fn))))
  }
  return results
}

const { posts } = await fetchAPI(postsQuery)
const { categories } = await fetchAPI(categoriesQuery)

if (posts.pageInfo.hasNextPage) {
  console.warn('WARNING: more than 100 posts exist; only the first 100 are exported (as on the live site).')
}

fs.rmSync(POSTS_DIR, { recursive: true, force: true })
fs.mkdirSync(POSTS_DIR, { recursive: true })

const leftoverCmsUrls = new Set()
const mailingListLinks = []

for (const { node } of posts.edges) {
  const image = node.featuredImage?.node
  const data = {
    id: node.id,
    title: node.title,
    date: node.date,
    featuredImage: image
      ? {
          sourceUrl: rewriteUploads(image.sourceUrl),
          altText: image.altText,
          width: image.mediaDetails?.width ?? null,
          height: image.mediaDetails?.height ?? null,
        }
      : null,
    featuredPost: node.extraPostData.featuredPost,
    blurb: rewriteUploads(node.extraPostData.blurb),
    indexPost: node.extraPostData.indexPost,
    categories: node.categories.nodes.map(({ name, slug }) => ({ name, slug })),
  }
  const content = rewriteUploads(node.content ?? '')

  for (const str of [content, data.blurb]) {
    if (typeof str !== 'string') continue
    for (const url of str.match(ANY_CMS_URL) ?? []) leftoverCmsUrls.add(`${node.slug}: ${url}`)
    if (str.includes('mailing-list')) mailingListLinks.push(node.slug)
  }

  const file = serialise(data, content)
  const roundTrip = matter(file)
  if (roundTrip.content !== content) throw new Error(`Body of ${node.slug} does not survive a round trip`)

  fs.writeFileSync(path.join(POSTS_DIR, `${node.slug}.html`), file)
}

rewriteUploads(PLACEHOLDER_IMAGE)

fs.writeFileSync(
  path.join(ROOT, 'content', 'categories.json'),
  JSON.stringify(categories.edges.map(({ node }) => node), null, 2) + '\n'
)

const results = await inBatches([...uploads], 6, ([uploadPath, url]) => download(uploadPath, url))
const failed = results.filter((r) => r.status === 'rejected')
const ok = results.filter((r) => r.status === 'fulfilled').map((r) => r.value)
const totalBytes = ok.reduce((sum, r) => sum + r.bytes, 0)

console.log(`Posts exported:       ${posts.edges.length}`)
console.log(`Categories exported:  ${categories.edges.length}`)
console.log(`Uploads referenced:   ${uploads.size} (${ok.filter((r) => !r.skipped).length} downloaded, ${ok.filter((r) => r.skipped).length} already present)`)
console.log(`Uploads total size:   ${(totalBytes / 1024 / 1024).toFixed(1)} MB`)

if (failed.length) {
  console.log(`\nFAILED downloads (${failed.length}):`)
  for (const r of failed) console.log(`  ${r.reason.message}`)
}
if (leftoverCmsUrls.size) {
  console.log(`\nOther cms.calumrodger.com URLs left in content (need a manual look):`)
  for (const u of leftoverCmsUrls) console.log(`  ${u}`)
}
if (mailingListLinks.length) {
  console.log(`\nPosts mentioning mailing-list: ${mailingListLinks.join(', ')}`)
}
