import Layout from "../../components/layout"
import { getPostData, postDataSorter, getCategoryData, categoryDataSorter } from "../../helpers/api-utils"
import '../styles/globals.scss'

export default async function PoemLayout({ children }) {

    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)
    const cat = 'web';

  return (
    <html lang="en">
      <body>
        <Layout cat={cat} posts={posts} categories={categories} />
        {children}
        {/* </Layout> */}
        </body>
    </html>
  )
}