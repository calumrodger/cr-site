import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../../helpers/api-utils";
import classes from './falp.module.scss'

const Falp = () => {

    return (
        <>
        <div className={classes.grid}>
            <div className={classes.top}></div>
            <div className={classes.left}></div>
            <div className={classes.falp}>
                FULLY AUTOMATED LUXURY POETRY
            </div>
            <div className={classes.right}></div>
            <div className={classes.bottom}></div>
        </div>
        </>
    )
}

export default Falp

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