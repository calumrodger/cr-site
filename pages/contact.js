import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './page.module.scss'
import ContactForm from "../components/contact-form";

const ContactPage = (props) => {

  const { titleSetter } = props
  titleSetter('Contact')

  return (
    <>
      <div className={classes.pageContent}>
        <ContactForm />
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