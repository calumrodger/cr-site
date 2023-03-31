import Page from '../components/page'
import SearchForm from '../components/search'
import { getPageBySlug, getPageData, getPostData, postDataSorter, getRandomPost } from '../helpers/api-utils'


const SinglePage = (props) => {
    const { page } = props
    const { posts } = props

    return (
        <>
        <Page
        title={page.title}
        author={page.author}
        image={page.image}
        content={page.content}
        slug={page.slug}
        posts={posts}
        />
        </>
    )
}

export default SinglePage

export async function getStaticProps(context) {

    const data = await getPostData()
    const posts = postDataSorter(data)

    const randomPost = await getRandomPost(posts)

    const { params } = context
    const slug = params.slug
    const page = await getPageBySlug(slug)
    return {
        props: { posts, page, randomPost },
        revalidate: 60
    }
}


export async function getStaticPaths() {
    const pages = await getPageData()
    const paths = pages.map(page => ({ params: { slug: page.slug } }))
    return {
      paths: paths,
      fallback: 'blocking'
    }
  }