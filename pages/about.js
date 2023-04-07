import Page from '../components/page'
import SearchForm from '../components/search'
import { getPostData, postDataSorter, getRandomPost, getCategoryData, categoryDataSorter } from '../helpers/api-utils'


const AboutPage = (props) => {

    return (
        <>
        <p>About Page</p>
        </>
    )
}

export default AboutPage

export async function getStaticProps() {
    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)
    const randomPost = await getRandomPost(posts)
  
    return {
      props: { posts, randomPost, categories },
      revalidate: 600
    }
}