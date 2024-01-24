import Layout from "../../components/layout";
import MailingListSignup from "../../components/mailing-list-signup";
import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../../helpers/api-utils";
import classes from '../page.module.scss'

export const metadata = {
    title: 'Mailing List'
  }

const MailingListPage = async () => {

    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)

  let pageContent = posts.find(item => item.slug === 'mailing-list')

  if (!pageContent) {
    pageContent = ''
  }

  return (
    <>
    <Layout cat="" posts={posts} categories={categories}>
        <div className={classes.pageContent}>
            <div className={classes.contentBit}>
                <div className={classes.contentMailingList} dangerouslySetInnerHTML={{__html: pageContent.content}}/>
                <MailingListSignup />
            </div>
        </div>
    </Layout>
    </>
  )
}



export default MailingListPage;