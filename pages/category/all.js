import PostPreview from '../../components/post-preview'
import { getCategoryIntroPost, getPostData, postDataSorter, getRandomPost, getCategoryData, categoryDataSorter } from '../../helpers/api-utils'
import classes from './category.module.scss'

const AllPosts = (props) => {
    const posts = props.posts
    const { introPost } = props

    const indexedPosts = posts.filter((item) => item.indexed === true)

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array
      }
    
    const shuffledPosts = shuffleArray(indexedPosts)

    return (
        <>
        <div className={classes.pageContainer}>
        <div className={classes.intro} dangerouslySetInnerHTML={{__html: introPost.content}} />
        <div className={classes.postsContainer}>
        {shuffledPosts.map((item) => {
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
        />
        )
      })}
      </div>
      </div>
        </>
    )
}

export default AllPosts

export async function getStaticProps(context) {
  const data = await getPostData()
  const posts = postDataSorter(data)
  const categoryData = await getCategoryData()
  const categories = categoryDataSorter(categoryData)
  const introPost = await getCategoryIntroPost('all')
  const randomPost = await getRandomPost(posts)
  return {
      props: { introPost, posts, categories, randomPost },
      revalidate: 600
  }
}
