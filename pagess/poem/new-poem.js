import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../../helpers/api-utils";
import classes from './new-poem.module.scss'

const Poem = (props) => {

    const { titleSetter } = props

    titleSetter('poem')

    return (
        <div className={classes.pageContainer}>
            poem here
        </div>
    )
}

export default Poem;

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