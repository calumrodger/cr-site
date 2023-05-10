import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../../helpers/api-utils";
import classes from './the-lighght-going-on-and-off.module.scss'

const Lighght = () => {

    return (
        <>
            <div className={classes.lighght}>
                lighght
            </div>
        </>
    )
}

export default Lighght

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