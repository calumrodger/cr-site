import Layout from "../../../components/layout"
import { getPostData, postDataSorter, getCategoryData, categoryDataSorter } from "../../../helpers/api-utils"
import '../../styles/globals.scss'
import SpringPoem from "./spring-poem"

export const metadata = {
    title: 'spring poem'
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
        <SpringPoem />
        </Layout>
        </body>
    </html>
  )
}