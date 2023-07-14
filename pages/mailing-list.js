import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './index.module.scss'
import MailingListSignup from "../components/mailing-list-signup";

const MailingListPage = (props) => {

  const { titleSetter } = props
  titleSetter('Mailing List')

  const { posts } = props

  let pageContent = posts.find(item => item.slug === 'mailing-list')

  if (!pageContent) {
    pageContent = ''
  }

  return (
    <>
    <div className={classes.pageContainer}>
      <div className={classes.pageContent}>
        <div className={classes.contentMailingList} dangerouslySetInnerHTML={{__html: pageContent.content}}/>
        <MailingListSignup />
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


export default MailingListPage;