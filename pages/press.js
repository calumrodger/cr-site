import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './index.module.scss'

const PressPage = (props) => {

  const { posts } = props

  let pressPageContent = posts.find(item => item.slug === 'press')

  if (!pressPageContent) {
    pressPageContent = ''
  }

  return (
    <>
    <div className={classes.pageContainer}>
      <div className={classes.pageContent}>
        <h2>Selected Press Snippets</h2>
        <div className={classes.content} dangerouslySetInnerHTML={{__html: pressPageContent.content}}/>
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

  return {
    props: { posts, categories },
    revalidate: 600
  }
}


export default PressPage;