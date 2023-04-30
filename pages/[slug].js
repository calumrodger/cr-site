import PostSingle from '../components/post-single'
import { getPostBySlug, getPostData, postDataSorter, getRandomPost, getCategoryData, categoryDataSorter } from '../helpers/api-utils'
import classes from './slug.module.scss'

const SinglePost = (props) => {

    const post = props.post

    return (
        <>
        <div className={classes.pageContainer}>
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
        </>
    )
}

export default SinglePost

export async function getStaticProps(context) {
    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)
    const randomPost = await getRandomPost(posts)
    const { params } = context
    const slug = params.slug
    let post = await getPostBySlug(slug)
    return {
        props: { posts, post, categories, randomPost },
        revalidate: 60
    }
}

export async function getStaticPaths() {
    const posts = await getPostData()
    const filteredPosts = posts.filter(post => 
        post.node.slug !== ('news') && 
        post.node.slug !== ('bio') && 
        post.node.slug !== ('contact') &&
        post.node.slug !== ('mailing-list'))
    const paths = filteredPosts.map(post => ({ params: { slug: post.node.slug } }))
    return {
      paths: paths,
      fallback: false
    }
  }