import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../../helpers/api-utils";
import classes from './spring-poem.module.scss'

const SpringPoem = () => {
    return (
        <>
        <div className={classes.gridContainer}>

        <div className={classes.topLeft}>
            <div className={classes.topLeftText}>
                <div className={classes.topRowFirstLine}>blue</div> 
                <div className={classes.topRowSecondLine}>sky</div>
            </div>
        </div>
        <div className={classes.topRight}>
            <div className={classes.topRightText}>
                <div className={classes.topRowFirstLine}>blue</div>
                <div className={classes.topRowSecondLine}>jeans</div>
            </div>
        </div>
        <div className={classes.bottomLeft}>
            <div className={classes.bottomLeftText}>
                <div className={classes.bottomRowFirstLine}>bare</div>
                <div className={classes.bottomRowSecondLine}>trees</div>
            </div>
        </div>
        <div className={classes.bottomRight}>
            <div className={classes.bottomRightText}>
                <div className={classes.bottomRowFirstLine}>bare</div> 
                <div className={classes.bottomRowSecondLine}>arse</div>
            </div>
        </div>
    </div>
    </>
    )
}

export default SpringPoem

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