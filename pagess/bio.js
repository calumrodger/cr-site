import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './page.module.scss'

const BioPage = (props) => {

  const { titleSetter } = props
  titleSetter('Bio')

  const { posts } = props

  let bioPageContent = posts.find(item => item.slug === 'bio')

  if (!bioPageContent) {
    bioPageContent = ''
  }

  return (
    <>
      <div className={classes.pageContent}>
        <div className={classes.title}>Bio</div>
        <div className={classes.contentBit}>
        <div className={classes.content} dangerouslySetInnerHTML={{__html: bioPageContent.content}}/>
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


export default BioPage;