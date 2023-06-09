import classes from '../styles/globals.scss'
import Layout from '../components/layout'
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {


  const { posts } = pageProps
  const { categories } = pageProps
  const { cat } = pageProps
  
  return (
    <>
          <Layout posts={posts} categories={categories} cat={cat}>
          <Component {...pageProps} />
          </Layout>
    </>
  )
}

