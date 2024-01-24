import Layout from "../../../components/layout"
import { getPostData, postDataSorter, getCategoryData, categoryDataSorter } from "../../../helpers/api-utils"
import '../../styles/globals.scss'
import FoliageComponent from "./summer-poem"

export const metadata = {
    title: 'summer poem'
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
        <FoliageComponent/>
        </Layout>
        </body>
    </html>
  )
}