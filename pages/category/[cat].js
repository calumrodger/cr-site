import PostPreview from '../../components/post-preview'
import { getCategoryIntroPost, getPostData, postDataSorter, getRandomPost, getPostsByCategory, getCategoryData, categoryDataSorter } from '../../helpers/api-utils'
import classes from './category.module.scss'

const AllPostsByCategory = (props) => {

    const posts = props.catPosts
    const cat = props.cat
    const introPost = props.introPost

    const gamesOrder = ['rabbie-burns-saves-the-world-and-by-extension-book-week-scotland', 'gotta-eat-the-plums-with-william-carlos-williams', 'sisyphus-reacts-only', 'sha-lot']
    const filmsOrder = ['rock-star-north', 'p0etryb1ts', 'whale-tree', 'burns-in-translation']
    const booksOrder = ['occasional-poems-2012-2019', 'ports', 'makar-unmakar', 'fiat-ontology', 'poems-in-anthologies', 'glasgow-flourishes', 'know-yr-stuff-poems-on-hedonism']
    const performanceOrder = ['slam-poem-showcase', 'the-linton-worm-is-eating-the-world', 'rock-star-north', 'glasgow-flourishes', 'occasional-poems-2012-2019', 'know-yr-stuff-poems-on-hedonism']
    const otherWritingOrder = ['zealots-of-ontographic-metagaming-zomg', 'exits-in-videogames-immanence-and-transcendence', 'reading-the-drones', 'ian-hamilton-finlays-topographical-poetics', 'glasgow-review-of-books-articles']

    let postDisplayOrder = posts

    const arraySorter = (array1, array2) => {
      let sortedPosts = []
      for (let i = 0; i < array1.length; i++) {
        let category = array2.filter(item => item.slug === array1[i])
        sortedPosts.push(category)
      }
      let finalPostSort = sortedPosts.flat()
    return finalPostSort
    }

    const shuffleArray = array => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array
    }

    if (cat === 'game') {
      postDisplayOrder = arraySorter(gamesOrder, posts)
    }
    if (cat === 'film-image') {
      postDisplayOrder = arraySorter(filmsOrder, posts)
    }
    if (cat === 'book') {
      postDisplayOrder = arraySorter(booksOrder, posts)
    }
    if (cat === 'performance') {
      postDisplayOrder = arraySorter(performanceOrder, posts)
    }
    if (cat === 'article') {
      postDisplayOrder = arraySorter(otherWritingOrder, posts)
    }
    if (cat === 'poetry') {
      postDisplayOrder = shuffleArray(posts)
    }
    

    return (
        <>
        <div className={classes.pageContainer}>
          <div className={classes.pageContent}>
        <div className={classes.intro} dangerouslySetInnerHTML={{__html: introPost.content}} />
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
  const randomPost = await getRandomPost(posts)
  return {
      props: { posts, cat, catPosts, introPost, categories, randomPost },
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