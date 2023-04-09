import '../styles/globals.scss'
import NavBar from '../components/nav-bar'
import Footer from '../components/footer'
import PostPreviewFeatured from '../components/post-preview-featured'
import { useState } from 'react'

export default function App({ Component, pageProps }) {

  const { posts } = pageProps
  const { randomPost } = pageProps
  const { categories } = pageProps

  const [access, setAccess] = useState(true)
  
  return (
        <>
        { access ?
        <div className='global-container'>
      <NavBar posts={posts} randomPost={randomPost} categories={categories}/>
  <Component {...pageProps} />
  <Footer />
  </div>
  : 
  <p>underconstruction</p>}
    </>
  )
}

