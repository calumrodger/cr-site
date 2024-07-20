import Layout from "@components/layout";
import ContactForm from "@components/contact-form";
import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "@helpers/api-utils";
import classes from '../page.module.scss'

export const metadata = {
  title: 'Contact'
}

const ContactPage = async () => {

    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)

  let pageContent = posts.find(item => item.slug === 'bio')

  if (!pageContent) {
    pageContent = ''
  }

  return (
    <>
    <Layout cat="" posts={posts} categories={categories}>
        <div className={classes.pageContent}>
            <div className={classes.contentBit}>
                <p style={{textAlign: "center"}}>email: <b><a href="mailto:calumrodger@gmail.com">calumrodger@gmail.com</a></b></p>
                <p style={{textAlign: "center"}}>insta: <b><a href="https://www.instagram.com/calum.rodger">calum.rodger</a></b></p>
            </div>
        </div>
    </Layout>
    </>
  )
}



export default ContactPage;