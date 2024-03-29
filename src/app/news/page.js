import Layout from "@components/layout";
import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "@helpers/api-utils";
import classes from '../page.module.scss'

export const metadata = {
    title: 'News'
  }

const NewsPage = async () => {

    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)

  let pageContent = posts.find(item => item.slug === 'news')

  if (!pageContent) {
    pageContent = ''
  }

  return (
    <>
    <Layout cat="" posts={posts} categories={categories}>
        <div className={classes.pageContent}>
            <div className={classes.title}>News</div>
            <div className={classes.contentBit}>
                <div className={classes.content} dangerouslySetInnerHTML={{__html: pageContent.content}}/>
            </div>
        </div>
    </Layout>
    </>
  )
}



export default NewsPage;