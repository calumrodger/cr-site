import { getPostData, postDataSorter, getRandomPost, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './index.module.scss'

const BioPage = (props) => {

  const { posts } = props

  let bioPageContent = posts.find(item => item.slug === 'bio')

  if (!bioPageContent) {
    bioPageContent = ''
  }

  return (
    <>
    <div className={classes.pageContainer}>
      <div className={classes.pageContent}>
        <div className={classes.content} dangerouslySetInnerHTML={{__html: bioPageContent.content}}/>
      </div>
    </div>
    </>
  )
}


export async function getStaticProps() {
  const data = await getPostData()
  const posts = postDataSorter(data)
  console.log(posts)
  const categoryData = await getCategoryData()
  const categories = categoryDataSorter(categoryData)
  const randomPost = await getRandomPost(posts)

  return {
    props: { posts, randomPost, categories },
    revalidate: 600
  }
}


export default BioPage;