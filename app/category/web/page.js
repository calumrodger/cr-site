import { getPostData, postDataSorter, getCategoryData, categoryDataSorter, getPostsByCategory, getCategoryIntroPost } from "../../../helpers/api-utils";
import Layout from "../../../components/layout";
import WebCategory from "../../../components/web-component";
import classes from './web.module.scss';

export default async function WebPage () {

    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)
    const cat = 'web';
    const catPosts = await getPostsByCategory(cat)
    const introPost = await getCategoryIntroPost(cat)


    return (
        <>
        <Layout cat={cat} posts={posts} categories={categories}>
            <div className={classes.container}>
                <WebCategory catPosts={catPosts} introPost={introPost} />
            </div>
        </Layout>
        </>
    )

}