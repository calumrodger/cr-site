import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './page.module.scss'

const NewsPage = (props) => {

  const { titleSetter } = props
  titleSetter('News')

  const { posts } = props

  let pageContent = posts.find(item => item.slug === 'news')

  if (!pageContent) {
    pageContent = ''
  }

  return (
    <>
      <div className={classes.pageContent}>
        <div className={classes.content} dangerouslySetInnerHTML={{__html: pageContent.content}}/>
      </div>
    </>
  )
}


export async function getStaticProps() {
  const data = await getPostData()
  const posts = postDataSorter(data)
  const categoryData = await getCategoryData()
  const categories = categoryDataSorter(categoryData)

  return {
    props: { posts, categories },
    revalidate: 600
  }
}


export default NewsPage;