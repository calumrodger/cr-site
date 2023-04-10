import PostPreview from '../../components/post-preview'
import { getPostsByTag, getPostData, postDataSorter, getRandomPost, getCategoryData, categoryDataSorter } from '../../helpers/api-utils'
import classes from './tag.module.css'

const AllPostsByTag = (props) => {
    const posts = props.tagPosts

    const indexedPosts = posts.filter((item) => item.indexed === true)

    return (
        <>
        <div className={classes.postsContainer}>
        {indexedPosts.map((item) => {
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
        indexed={item.indexed}
        />
        )
      })}
      </div>
        </>
    )
}

export default AllPostsByTag

export async function getStaticProps(context) {
  const data = await getPostData()
  const posts = postDataSorter(data)
  const { params } = context
  const tag = params.tag
  const tagPosts = await getPostsByTag(tag)
  const randomPost = await getRandomPost(posts)
  const categoryData = await getCategoryData()
  const categories = categoryDataSorter(categoryData)
  return {
      props: { posts, tagPosts, categories, randomPost },
      revalidate: 600
  }
}

export async function getStaticPaths() {
    const posts = await getPostData()
    const tagObjects = posts.map((post) => ((post.node.tags.nodes)))
    const tagArray = tagObjects.map((tag) => (tag.map((tagName) => tagName.name))).flat()
    const paths = tagArray.map(tag => ({ params: { tag: tag } }))
    return {
      paths: paths,
      fallback: false
    }
  }

