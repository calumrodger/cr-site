import '../styles/globals.scss'
import NavBar from '../components/nav-bar'
import Footer from '../components/footer'
import PostPreviewFeatured from '../components/post-preview-featured'

export default function App({ Component, pageProps }) {

  const { posts } = pageProps
  const { randomPost } = pageProps
  const { categories } = pageProps
  
  return (
        <>
        <div className='global-container'>
      <NavBar posts={posts} randomPost={randomPost} categories={categories}/>
  <Component {...pageProps} />
  <Footer />
  </div>
    </>
  )
}

