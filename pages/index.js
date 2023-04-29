import { getPostData, postDataSorter, getRandomPost, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './index.module.scss'

const HomePage = (props) => {

  const { posts } = props

  let homePageContent = posts.find(item => item.slug === 'home')

  if (!homePageContent) {
    homePageContent = ''
  }

  return (
    <>
    <div className={classes.pageContainer}>
      <div className={classes.pageContent}>
        <div className={classes.content} dangerouslySetInnerHTML={{__html: homePageContent.content}}/>
      </div>
    </div>
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


