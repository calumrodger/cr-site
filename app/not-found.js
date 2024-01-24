import Layout from "../components/layout";
import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './page.module.scss';
import Link from "next/link";

const FourOhFourPage = async () => {

    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)

  return (
    <>
    <Layout cat="" posts={posts} categories={categories}>
        <div className={classes.pageContent}>
            <h1>404 - Page Not Found!</h1>
                <Link href="/">
                    Go back home
                </Link>
        </div>
    </Layout>
    </>
  )
}



export default FourOhFourPage;