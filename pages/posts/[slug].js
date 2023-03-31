import PostSingle from '../../components/post-single'
import { getPostBySlug, getPostData, postDataSorter, getRandomPost } from '../../helpers/api-utils'
import classes from './slug.module.css'

const SinglePost = (props) => {

    const post = props.post

    return (
        <>
        <div className={classes.pageContainer}>
        <PostSingle
        title={post.title}
        author={post.author}
        image={post.image}
        content={post.content}
        tags={post.tags}
        slug={post.slug}
        />
        </div>
        </>
    )
}

export default SinglePost

export async function getStaticProps(context) {
    const data = await getPostData()
    const posts = postDataSorter(data)
    const randomPost = await getRandomPost(posts)
    const { params } = context
    const slug = params.slug
    let post = await getPostBySlug(slug)
    return {
        props: { posts, post, randomPost },
        revalidate: 60
    }
}

export async function getStaticPaths() {
    const posts = await getPostData()
    const paths = posts.map(post => ({ params: { slug: post.node.slug } }))
    return {
      paths: paths,
      fallback: false
    }
  }