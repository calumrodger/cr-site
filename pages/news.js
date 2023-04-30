import { getPostData, postDataSorter, getRandomPost, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './index.module.scss'

const NewsPage = (props) => {

  const { posts } = props

  let pageContent = posts.find(item => item.slug === 'news')

  if (!pageContent) {
    pageContent = ''
  }

  return (
    <>
    <div className={classes.pageContainer}>
      <div className={classes.pageContent}>
        <div className={classes.content} dangerouslySetInnerHTML={{__html: pageContent.content}}/>
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


export default NewsPage;