import PostPreview from '../../components/post-preview'
import { getPostsByTag, getPostData, postDataSorter, getRandomPost, getPostsByCategory, getCategoryData, categoryDataSorter } from '../../helpers/api-utils'
import classes from './category.module.css'

const AllPostsByCategory = (props) => {
    const posts = props.catPosts

    return (
        <>
        <div className={classes.postsContainer}>
        {posts.map((item) => {
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
        />
        )
      })}
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
  console.log(context)
  // console.log(params)
  const cat = params.cat
  const catPosts = await getPostsByCategory(cat)
  const randomPost = await getRandomPost(posts)
  return {
      props: { posts, catPosts, categories, randomPost },
      revalidate: 600
  }
}

export async function getStaticPaths() {
    const posts = await getPostData()
    const catObjects = posts.map((post) => ((post.node.categories.nodes)))
    console.log(catObjects)
    const catArray = catObjects.map((cat) => (cat.map((catName) => catName.slug))).flat()
    const paths = catArray.map(cat => ({ params: { cat: cat } }))
    return {
      paths: paths,
      fallback: false
    }
  }