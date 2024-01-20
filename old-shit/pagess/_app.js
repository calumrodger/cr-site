import classes from '../styles/globals.scss'
import Layout from '../components-old/layout'
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import favicon from '../public/favicon.ico';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  
  const [theTitle, setTheTitle] = useState('')

  const { asPath } = useRouter()

  const titleSetter = (title) => {
    setTheTitle(title)
  }

  useEffect(() => {
    if ( ! asPath.includes('/poem/') ) {
      setTheTitle('')
    }
    
  }, [asPath])

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
    <meta property="og:url"                content={`https://calumrodger.com${asPath}`} />
    <meta property="og:title"              content={title} />
    <meta property="og:description"        content='poetry + books | games | film/image | web | performance | articles' />
    <meta property="og:image"              content="http://cms.calumrodger.com/wp-content/uploads/ptbo-trimmed.png" />
    <meta property="og:type" content="website" />
      <title>{title}</title>
    </Head>
          <Layout titleSetter={titleSetter} posts={posts} categories={categories} cat={cat}>
          <Component {...pageProps} titleSetter={titleSetter}/>
          </Layout>
          <Analytics />
          
    </>
  )
}

