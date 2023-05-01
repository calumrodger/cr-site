import classes from '../styles/globals.scss'
import Layout from '../components/layout'

export default function App({ Component, pageProps }) {

  const { posts } = pageProps
  const { randomPost } = pageProps
  const { categories } = pageProps
  const { cat } = pageProps
  
  return (
    <>
          <Layout posts={posts} randomPost={randomPost} categories={categories} cat={cat}>
          <Component {...pageProps} />
          </Layout>
    </>
  )
}

