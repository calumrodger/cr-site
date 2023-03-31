import { getPostData, postDataSorter, getRandomPost } from "../helpers/api-utils";
import PostPreview from "../components/post-preview";
import PostPreviewFeatured from "../components/post-preview-featured";
import classes from './index.module.css'

const HomePage = (props) => {

  const { posts } = props

  const sortStandardFromFeaturedPosts = (posts) => {
    let featured = [], standard = []
    posts.forEach((post) => (post.featured === true ? featured : standard).push(post))
    return [featured, standard]
  }
  
  const [ featured, standard ] = sortStandardFromFeaturedPosts(posts)

  return (
    <>
    <div className={classes.featuredPostContainer}>
      <div className={classes.featuredPostHighlight}>
        <p>FEATURED POST</p>
    {featured.map((item) => {
        return (
        <PostPreviewFeatured
        title={item.title}
        author={item.author}
        image={item.image}
        content={item.content}
        key={item.key}
        tags={item.tags}
        slug={item.slug}
        blurb={item.blurb}
        />
        )
      })}
        </div>
      </div>
      <div className={classes.standardPostsHighlight}>
          <p>MORE POSTS</p>

      <div className={classes.standardPostsContainer}>       
      {standard.map((item) => {
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
        />
        )
      })}
      </div>
      </div>
   </>
  )
}


export async function getStaticProps() {
  const data = await getPostData()
  const posts = postDataSorter(data)
  const randomPost = await getRandomPost(posts)

  return {
    props: { posts, randomPost },
    revalidate: 600
  }
}


export default HomePage;


