import { getPostData, postDataSorter, getCategoryData, categoryDataSorter, getPostsByCategory, getCategoryIntroPost } from "@helpers/api-utils";
import Layout from "@components/layout";
import AllPostsByCategory from "@components/cat-component";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {

    const cat = params.cat;
    let formattedCat;

    switch(cat) {
        case 'book':
            formattedCat = 'Books'
        break;
        case 'film-image':
            formattedCat = 'Film/Image'
        break;
        case 'performance':
            formattedCat = 'Performance'
        break;
        case 'game':
            formattedCat = 'Games'
        break;
        case 'article':
            formattedCat = 'Articles'
        break;
    }
   
    return {
      title: formattedCat,
    }
}

export default async function CatPage ({params} = props) {

    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)
    const cat = params.cat;
    const catPosts = await getPostsByCategory(cat)
    const introPost = await getCategoryIntroPost(cat)

    if ( params.cat !== 'book' && params.cat !== 'film-image' && params.cat !== 'performance' && params.cat !== 'game' && params.cat !== 'article') {
        notFound();
    }

    return (
        <>
        <Layout cat={cat} posts={posts} categories={categories}>
        <AllPostsByCategory catPosts={catPosts} introPost={introPost} cat={cat} />
        </Layout>
        </>
    )

}