import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './index.module.scss'
import ContactForm from "../components/contact-form";

const ContactPage = (props) => {

  const { titleSetter } = props
  titleSetter('Contact')

  return (
    <>
    <div className={classes.pageContainer}>
      <div className={classes.pageContent}>
        <ContactForm />
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


export default ContactPage;