const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query) {
    const headers = { 'Content-Type': 'application/json' }
  
    // WPGraphQL Plugin must be enabled
    const res = await fetch(API_URL, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        query,
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
            content
            featuredImage {
              node {
                sourceUrl
                altText
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
    const data = await fetchAPI(
        query,
      )
    
      return data?.posts.edges
}

export async function getCategoryData() {
  const data = await fetchAPI(
      `
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
    `,
    )
    return data?.categories.edges
}

export function postDataSorter(data) {
  const placeholderImage = 'http://cms.calumrodger.com/wp-content/uploads/2023/03/placeholderImage.png'
  const posts = data.map((item) => ({
    title: item.node.title,
    content: item.node.content ? item.node.content : 'No content at this time.',
    image: item.node.featuredImage ? item.node.featuredImage.node.sourceUrl : placeholderImage,
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

export async function getRandomPost(posts) {
  const indexedPosts = posts.filter((item) => item.indexed === true)
  const randomPost = indexedPosts[Math.floor(Math.random()*indexedPosts.length)]
  return randomPost
}

export const sendContactData = async (path, details) => {

  const response = await fetch(path, {
       method: 'POST',
       body: JSON.stringify(details),
       headers: {
           'Content-Type': 'application/json'
       }
   })

   const data = await response.json()

   if (!response.ok) {
       throw new Error(data.message || "That didn't work.")
   }
}

