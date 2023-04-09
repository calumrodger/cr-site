import { getPostData, postDataSorter, getRandomPost, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import PostPreview from "../components/post-preview";
import PostPreviewFeatured from "../components/post-preview-featured";
import classes from './index.module.scss'

const HomePage = (props) => {

  const { posts } = props

  const homePageContent = posts.find(item => item.slug === 'home')

  return (
    <>
      <div className={classes.content} dangerouslySetInnerHTML={{__html: homePageContent.content}}/>
   </>
  )
}


export async function getStaticProps() {
  const data = await getPostData()
  const posts = postDataSorter(data)
  const categoryData = await getCategoryData()
  const categories = categoryDataSorter(categoryData)
  const randomPost = await getRandomPost(posts)

  return {
    props: { posts, randomPost, categories },
    revalidate: 600
  }
}


export default HomePage;


