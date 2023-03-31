import { allPostsQuery, allPagesQuery } from './queries'

const API_URL = process.env.WORDPRESS_API_URL

// note original getting passed in: query = '', { variables } = {}
async function fetchAPI(query) {
    const headers = { 'Content-Type': 'application/json' }
  
    // WPGraphQL Plugin must be enabled
    const res = await fetch(API_URL, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        query,
        // variables,
      }),
    })
  
    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch API')
    }
    return json.data
  }

export async function getPostData() {
    const query = `
    query AllPosts {
      posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            excerpt
            slug
            date
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
            tags {
              nodes {
                name
              }
            }
            author {
              node {
                name
              }
            }
            extraPostData {
              featuredPost
              blurb
            }
          }
        }
      }
    }
  `
    const data = await fetchAPI(
        query,
      )
    
      return data?.posts.edges
}

export async function getPageData() {
  const data = await fetchAPI(
      `
      query AllPages {
        pages {
          nodes {
            id
            title
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
            content
          }
        }
      }
    `,
    )
    return pageDataSorter(data?.pages.nodes)
}

export function postDataSorter(data) {
  const placeholderImage = '../../img/placeholder-image.png'
  const posts = data.map((item) => ({
    title: item.node.title,
    author: item.node.author.node.name,
    content: item.node.content ? item.node.content : 'No content at this time.',
    image: item.node.featuredImage ? item.node.featuredImage.node.sourceUrl : placeholderImage,
    slug: item.node.slug,
    key: item.node.id,
    tags: item.node.tags.nodes.map((tag) => (tag.name)),
    featured: item.node.extraPostData.featuredPost,
    blurb: item.node.extraPostData.blurb
  }))
  return posts
}

export function pageDataSorter(data) {
  const placeholderImage = '../../img/placeholder-image.png'
  const sortedData = data.map((item) => ({
    title: item.title,
    content: item.content,
    image: item.featuredImage ? item.featuredImage.node.sourceUrl : placeholderImage,
    slug: item.slug,
    key: item.id
  }))
  return sortedData
}

export async function getPageBySlug(slug) {
  const data = await getPageData()
  const page = data.find((item) => item.slug === slug)
  return page
}

export async function getPostBySlug(slug) {
  const data = await getPostData()
  const sortedData = postDataSorter(data)
  const post = sortedData.find((item) => item.slug === slug)
  return post
}

export async function getPostsByTag(currentTag) {
  const data = await getPostData()
  const sortedData = postDataSorter(data)
  const posts = sortedData.filter((post) => (post.tags.includes(currentTag)))
  return posts
}

export async function getRandomPost(posts) {
  const randomPost = posts[Math.floor(Math.random()*posts.length)]
  return randomPost
}

