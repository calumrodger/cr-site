import PostPreview from '../../components/post-preview'
import { getCategoryIntroPost, getPostData, postDataSorter, getRandomPost, getPostsByCategory, getCategoryData, categoryDataSorter } from '../../helpers/api-utils'
import classes from './category.module.scss'
import Link from 'next/link'

const WebCategory = (props) => {

    const posts = props.catPosts
    const cat = props.cat
    const introPost = props.introPost

    const lighghtTitle = `the 'lighght' going on and off`

    return (
        <>
        <div className={classes.pageContainer}>
          <div className={classes.pageContent}>
        <div className={classes.intro} dangerouslySetInnerHTML={{__html: introPost.content}} />
        <Link href='/spring-poem'>spring poem</Link>
        <Link href='/silence'>silence</Link>
        <Link href='/the-lighght-going-on-and-off'>{lighghtTitle}</Link>
      </div>
      </div>
        </>
    )
}

export default WebCategory

export async function getStaticProps(context) {
    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)
    const introPost = await getCategoryIntroPost('web')
    const randomPost = await getRandomPost(posts)
    return {
        props: { introPost, posts, categories, randomPost },
        revalidate: 600
    }
  }