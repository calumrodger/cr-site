import PostPreview from '../../components/post-preview'
import { getCategoryIntroPost, getPostData, postDataSorter, getPostsByCategory, getCategoryData, categoryDataSorter } from '../../helpers/api-utils'
import classes from './category.module.scss'
import { useState, useEffect } from 'react'

const AllPostsByCategory = (props) => {

    const posts = props.catPosts
    const cat = props.cat
    const introPost = props.introPost
    const bgImage = introPost.image

    const gamesOrder = ['rabbie-burns-saves-the-world-and-by-extension-book-week-scotland', 'gotta-eat-the-plums-with-william-carlos-williams', 'sisyphus-reacts-only', 'sha-lot']
    const filmsOrder = ['rock-star-north', 'p0etryb1ts', 'whale-tree', 'burns-in-translation']
    const booksOrder = ['lumpcuts-ai-poetics', 'ports', 'occasional-poems-2012-2019', 'fiat-ontology', 'makar-unmakar', 'glasgow-flourishes', 'know-yr-stuff-poems-on-hedonism', 'poems-in-anthologies']
    const homemadeBooksOrder = ['lumpcuts-ai-poetics', 'fiat-ontology']
    const publishedBooksOrder = ['ports', 'occasional-poems-2012-2019', 'makar-unmakar', 'glasgow-flourishes', 'know-yr-stuff-poems-on-hedonism', 'poems-in-anthologies']
    const performanceOrder = ['bbc-rappers-vs-poets', 'glasgow-flourishes', 'bright-club-stand-up-comedy', 'poetry-world-cup-paris-2019', 'the-linton-worm-is-eating-the-world', 'kelburn-garden-party']
    const otherWritingOrder = ['zealots-of-ontographic-metagaming-zomg', 'exits-in-videogames-immanence-and-transcendence', 'reading-the-drones', 'ian-hamilton-finlays-topographical-poetics', 'various-reviews']

    let postDisplayOrder = posts

    const [bookSelection, setBookSelection] = useState('all')

    const arraySorter = (array1, array2) => {
      let sortedPosts = []
      for (let i = 0; i < array1.length; i++) {
        let category = array2.filter(item => item.slug === array1[i])
        sortedPosts.push(category)
      }
      let finalPostSort = sortedPosts.flat()
    return finalPostSort
    }

    if (cat === 'game') {
      postDisplayOrder = arraySorter(gamesOrder, posts)
    }
    if (cat === 'film-image') {
      postDisplayOrder = arraySorter(filmsOrder, posts)
    }
    if (cat === 'book' && bookSelection === 'all') {
      postDisplayOrder = arraySorter(booksOrder, posts)
    }
    if (cat === 'book' && bookSelection === 'homemade') {
      postDisplayOrder = arraySorter(homemadeBooksOrder, posts)
    }
    if (cat === 'book' && bookSelection === 'published') {
      postDisplayOrder = arraySorter(publishedBooksOrder, posts)
    }
    if (cat === 'performance') {
      postDisplayOrder = arraySorter(performanceOrder, posts)
    }
    if (cat === 'article') {
      postDisplayOrder = arraySorter(otherWritingOrder, posts)
    }

    const publishedSubmit = () => {
        setBookSelection('published')
    }

    const homemadeSubmit = () => {
      setBookSelection('homemade')
  }

    
    return (
        <>
        <div className={classes.bgImage} style={{backgroundImage: `url(${bgImage})`}}>
          <div className={classes.pageContent}>
          <div className={classes.intro} dangerouslySetInnerHTML={{__html: introPost.content}} />
          { cat === 'book' &&
          <div className={classes.booksButtonContainer}>
            <div className={classes.booksButton} onClick={publishedSubmit}>published</div>
            <div className={classes.booksButton} onClick={homemadeSubmit}>homemade</div>
          </div>
          }
          <div className={classes.postsContainer}>
            {postDisplayOrder.map((item) => {
            return (
            <PostPreview
            title={item.title}
            author={item.author}
            image={item.image}
            content={item.content}
            key={item.key}
            tags={item.tags}
            slug={item.slug}
            blurb={item.blurb}
            categories={item.categories}
            indexed={item.indexed}
            altText={item.imageAltText}
            />
            )
          })}
        </div>
        </div>
        </div>
        </>
    )
}

export default AllPostsByCategory

export async function getStaticProps(context) {
  const data = await getPostData()
  const posts = postDataSorter(data)
  const categoryData = await getCategoryData()
  const categories = categoryDataSorter(categoryData)
  const { params } = context
  const cat = params.cat
  const catPosts = await getPostsByCategory(cat)
  const introPost = await getCategoryIntroPost(cat)
  return {
      props: { posts, cat, catPosts, introPost, categories },
      revalidate: 600
  }
}

export async function getStaticPaths() {
    const posts = await getPostData()
    const catObjects = posts.map((post) => ((post.node.categories.nodes)))
    const catArray = catObjects.map((cat) => (cat.map((catName) => catName.slug))).flat()
    const filteredCats = catArray.filter(cat => cat !== ('web') )
    const paths = filteredCats.map(cat => ({ params: { cat: cat } }))
    return {
      paths: paths,
      fallback: false
    }
  }