import Layout from "../../components/layout";
import ContactForm from "../../components/contact-form";
import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../../helpers/api-utils";
import classes from '../page.module.scss'

const ContactPage = async () => {

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
            <div className={classes.contentBit}>
                <ContactForm />
            </div>
        </div>
    </Layout>
    </>
  )
}



export default ContactPage;