import PostPreview from '../../components/post-preview'
import { getPostData, postDataSorter, getRandomPost, getCategoryData, categoryDataSorter } from '../../helpers/api-utils'
import classes from './all.module.scss'

const AllPostsByCategory = (props) => {
    const posts = props.posts

    const sortedPosts = posts.sort()

    return (
        <>
        <div className={classes.postsContainer}>
        {sortedPosts.map((item) => {
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
  const randomPost = await getRandomPost(posts)
  return {
      props: { posts, categories, randomPost },
      revalidate: 600
  }
}
