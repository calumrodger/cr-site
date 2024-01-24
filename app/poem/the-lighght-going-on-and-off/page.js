import Layout from "../../../components/layout"
import { getPostData, postDataSorter, getCategoryData, categoryDataSorter } from "../../../helpers/api-utils"
import '../../styles/globals.scss'
import Lighght from "./the-lighght-going-on-and-off"

export const metadata = {
    title: "the 'lighght' going on and off"
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
        <Lighght/>
        </Layout>
        </body>
    </html>
  )
}