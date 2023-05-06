import { getPostData, postDataSorter, getRandomPost, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './index.module.scss'

const HomePage = (props) => {

  const { posts } = props

  let homePageContent = posts.find(item => item.slug === 'home')
  let homePageImage = homePageContent.image

  if (!homePageContent) {
    homePageContent = ''
  }

  return (
    <>
    <div className={classes.bgImage} style={{backgroundImage: `url(${homePageImage})`}}>
      <div className={classes.pageContent} >
        <div className={classes.homeContent} dangerouslySetInnerHTML={{__html: homePageContent.content}}/>
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


