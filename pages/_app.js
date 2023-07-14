import classes from '../styles/globals.scss'
import Layout from '../components/layout'
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import { useState } from 'react';
import favicon from '../public/favicon.ico';

export default function App({ Component, pageProps }) {
  
  const [theTitle, setTheTitle] = useState('')
  // const [onPoem, setOnPoem] = useState(false)

  const titleSetter = (title) => {
    setTheTitle(title)
  }

  // const toggleOnPoem = () => {
  //   setOnPoem(true)
  // }

  // console.log(onPoem)

  const { posts } = pageProps
  const { categories } = pageProps
  const { cat } = pageProps
  const { post } = pageProps

  let title = 'Calum Rodger'

  if ( theTitle ) {
    title = theTitle
  } else if ( post ) {
    title = pageProps.post.title
  } else if (cat === 'book') {
    title = 'Books'
  } else if (cat === 'game') {
  title = 'Games'
  } else if (cat === 'web') {
    title = 'Web'
  } else if (cat === 'performance') {
    title = 'Performance'
  } else if (cat === 'article') {
    title = 'Articles'
  } else if (cat === 'film-image') {
    title = 'Film/Image'
  }
  
  return (
    <>
    <Head>
      <title>{title}</title>
    </Head>
          <Layout titleSetter={titleSetter} posts={posts} categories={categories} cat={cat}>
          <Component {...pageProps} titleSetter={titleSetter}/>
          </Layout>
          <Analytics />
          
    </>
  )
}

