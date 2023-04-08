import SearchForm from '../components/search'
import { getPostData, postDataSorter, getRandomPost, getCategoryData, categoryDataSorter } from '../helpers/api-utils'


const SearchPage = (props) => {

    return (
        <>
        <p>Search Page</p>
        <SearchForm posts={props.posts}/>
        </>
    )
}

export default SearchPage

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