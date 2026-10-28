import PostSingle from "@components/post-single";
import Layout from "@components/layout";
import { getPostData, postDataSorter, getCategoryData, categoryDataSorter, getPostBySlug } from "@helpers/api-utils";
import classes from './slug.module.scss'
import { notFound } from "next/navigation";

// Every post gets a page, except slugs that 404 here (see generateMetadata),
// slugs that are taken by a static route, and the retired bio/news/press pages
// (their routes are parked in src/app/_bio etc.)
const excludedSlugs = [
    'book', 'poem', 'web', 'performance', 'article', 'film-image',
    'bio', 'contact', 'mailing-list', 'news', 'press', 'stanzafier', 'category'
]

export async function generateStaticParams() {
    const data = await getPostData()
    return postDataSorter(data)
        .filter((post) => !excludedSlugs.includes(post.slug))
        .map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {

    const { slug } = params;

    if ( slug === 'book' || slug === 'poem' || slug === 'web' || slug === 'performance' || slug === 'article' || slug === 'film-image' ) {
        notFound();
    }

    const post = await getPostBySlug(params.slug);
   
    return {
      title: post?.title ? post.title : '404'
    }
}

const SinglePost = async ({params} = props) => {

    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)

    const post = await getPostBySlug(params.slug);

    if ( !post ) {
        notFound();
    }

    const image = post.image



    return (
        <>
         <Layout cat={post.category_slugs[0]} posts={posts} categories={categories}>
            <div className={classes.container}>
                <div className={classes.bgImage} style={{backgroundImage: `url(${image})`}}> 
                    <div className={classes.pageContent}>
                        <PostSingle
                        title={post.title}
                        author={post.author}
                        image={post.image}
                        content={post.content}
                        tags={post.tags}
                        slug={post.slug}
                        />
                    </div> 
                </div>
            </div>
        </Layout>
        </>
    )
}

export default SinglePost;
