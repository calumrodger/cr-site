import Link from 'next/link'
import { getPostData, postDataSorter, getCategoryData, categoryDataSorter, getRandomPost } from '../helpers/api-utils'

export default function FiveOhOh(props) {
  return <>
    <h1>500 - Server error</h1>
    <Link href="/">
        Go back home
    </Link>
  </>
}

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