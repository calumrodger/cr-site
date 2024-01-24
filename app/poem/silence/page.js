import Layout from "../../../components/layout"
import { getPostData, postDataSorter, getCategoryData, categoryDataSorter } from "../../../helpers/api-utils"
import '../../styles/globals.scss'
import Silence from "./poem"

export const metadata = {
    title: 'silence'
  }

export default async function PoemLayout({ children }) {

    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)
    const cat = '';

  return (
    <html lang="en">
      <body>
        <Layout cat={cat} posts={posts} categories={categories} >
        <Silence />
        </Layout>
        </body>
    </html>
  )
}