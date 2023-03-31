import '../styles/globals.css'
import NavBar from '../components/nav-bar'
import Footer from '../components/footer'

export default function App({ Component, pageProps }) {

  const { posts } = pageProps
  const { randomPost } = pageProps
  
  return (
        <>
        <div className='global-container'>
      <NavBar posts={posts} randomPost={randomPost} />
  <Component {...pageProps} />
  <Footer />
  </div>
    </>
  )
}

