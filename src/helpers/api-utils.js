import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Content used to come from WPGraphQL. It now lives in content/ (exported once by
// scripts/export-wordpress.mjs) and is read at build time. getPostData() and
// getCategoryData() return the same shape WPGraphQL did, so everything below them
// is unchanged.
const CONTENT_DIR = path.join(process.cwd(), 'content')
const POSTS_DIR = path.join(CONTENT_DIR, 'posts')

export async function getPostData() {
    const posts = fs.readdirSync(POSTS_DIR)
      .filter((file) => file.endsWith('.html'))
      .map((file) => {
        const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), 'utf8'))
        return {
          node: {
            id: data.id,
            title: data.title,
            slug: path.basename(file, '.html'),
            date: data.date,
            content,
            featuredImage: data.featuredImage ? {
              node: {
                sourceUrl: data.featuredImage.sourceUrl,
                altText: data.featuredImage.altText,
                mediaDetails: {
                  height: data.featuredImage.height,
                  width: data.featuredImage.width
                }
              }
            } : null,
            extraPostData: {
              featuredPost: data.featuredPost,
              blurb: data.blurb,
              indexPost: data.indexPost
            },
            categories: {
              nodes: data.categories
            }
          }
        }
      })

    // WPGraphQL returned posts ordered by date, newest first
    return posts.sort((a, b) => new Date(b.node.date) - new Date(a.node.date))
}

export async function getCategoryData() {
  const categories = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'categories.json'), 'utf8'))
  return categories.map((node) => ({ node }))
}

export function postDataSorter(data) {
  const placeholderImage = '/wp-content/uploads/2023/03/placeholderImage.png'
  const posts = data.map((item) => ({
    title: item.node.title,
    content: item.node.content ? item.node.content : '',
    image: item.node.featuredImage ? item.node.featuredImage.node.sourceUrl : placeholderImage,
    imageHeight: item.node.featuredImage ? item.node.featuredImage.node?.mediaDetails?.height : '',
    imageWidth: item.node.featuredImage ? item.node.featuredImage.node?.mediaDetails?.width : '',
    imageAltText: item.node.featuredImage ? item.node.featuredImage.node.altText : '',
    slug: item.node.slug,
    key: item.node.id,
    featured: item.node.extraPostData.featuredPost,
    blurb: item.node.extraPostData.blurb,
    category_slugs: item.node.categories.nodes.map((category) => (category.slug)),
    category_names: item.node.categories.nodes.map((category) => (category.name)),
    indexed: item.node.extraPostData.indexPost
  }))
  return posts
}

export function categoryDataSorter(data) {
  const sortedData = data.map((item) => ({
    slug: item.node.slug,
    key: item.node.id,
    name: item.node.name
  }))
  return sortedData
}

export async function getPostBySlug(slug) {
  const data = await getPostData()
  const sortedData = postDataSorter(data)
  const post = sortedData.find((item) => item.slug === slug)
  return post
}

export async function getPostsByCategory(currentCat) {
  const data = await getPostData()
  const sortedData = postDataSorter(data)
  const posts = sortedData.filter((post) => (post.category_slugs.includes(currentCat)))
  return posts
}

export async function getCategoryIntroPost(currentCat) {
  const data = await getPostData()
  const sortedData = postDataSorter(data)
  const post = sortedData.filter((post) => (post.title === currentCat))
  return post[0]
}
