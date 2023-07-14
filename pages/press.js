import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './page.module.scss'

const PressPage = (props) => {

  const { titleSetter } = props
  titleSetter('Press')

  const { posts } = props

  let pressPageContent = posts.find(item => item.slug === 'press')

  if (!pressPageContent) {
    pressPageContent = ''
  }

  return (
    <>
      <div className={classes.pageContent}>
        <h2>Selected Press Snippets</h2>
        <div className={classes.content} dangerouslySetInnerHTML={{__html: pressPageContent.content}}/>
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