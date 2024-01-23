import Layout from "../../components/layout";
import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../../helpers/api-utils";
import classes from '../page.module.scss'

export const metadata = {
  title: 'Bio'
}

const BioPage = async () => {

    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)

  let bioPageContent = posts.find(item => item.slug === 'bio')

  if (!bioPageContent) {
    bioPageContent = ''
  }

  return (
    <>
    <Layout cat="" posts={posts} categories={categories}>
      <div className={classes.pageContent}>
        <div className={classes.title}>Bio</div>
        <div className={classes.contentBit}>
        <div className={classes.content} dangerouslySetInnerHTML={{__html: bioPageContent.content}}/>
        </div>
      </div>
    </Layout>
    </>
  )
}



export default BioPage;