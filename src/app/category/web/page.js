import { getPostData, postDataSorter, getCategoryData, categoryDataSorter, getCategoryIntroPost } from "@helpers/api-utils";
import Layout from "@components/layout";
import WebCategory from "@components/web-component";
import classes from './web.module.scss';

export const metadata = {
    title: 'Web'
  }

export default async function WebPage () {

    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)
    const cat = 'web';
    const introPost = await getCategoryIntroPost(cat)


    return (
        <>
        <Layout cat={cat} posts={posts} categories={categories}>
            <div className={classes.container}>
                <WebCategory introPost={introPost} />
            </div>
        </Layout>
        </>
    )

}