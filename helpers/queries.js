const allPagesQuery = `
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
`

const allPostsQuery = `
query AllPosts {
  posts(where: { orderby: { field: DATE, order: DESC } }) {
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
        author {
          node {
            name
            firstName
            lastName
            avatar {
              url
            }
          }
        }
      }
    }
  }
}
`