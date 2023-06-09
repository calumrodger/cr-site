import PostPreview from '../../components/post-preview'
import { getCategoryIntroPost, getPostData, postDataSorter, getCategoryData, categoryDataSorter } from '../../helpers/api-utils'
import classes from './category.module.scss'
import Link from 'next/link'

const WebCategory = (props) => {

    // const posts = props.catPosts
    // const cat = props.cat
    const introPost = props.introPost

    const lighghtTitle = `the 'lighght' going on and off`

    return (
        <>
          <div className={classes.pageContent}>
        <div className={classes.intro} dangerouslySetInnerHTML={{__html: introPost.content}} />
        <div className={classes.poemsListContainer}>
        <h3>Original Poems</h3>
        <ul className={classes.poemsList}>
        <li><Link href='/poem/spring-poem'>spring poem</Link></li>
        </ul>
        <h3>Cover Versions</h3>
        <ul className={classes.poemsList}>
        <li><Link href='/poem/silence'>silence</Link></li>
        <p>Interactive remake of one of the earliest concrete poems, Eugen Gomringer&apos;s &apos;silence&apos; (1954). To play: touch the silence.</p>
        <li><Link href='/poem/the-lighght-going-on-and-off'>{lighghtTitle}</Link></li>
        <p>Animated homage to Aram Saroyan&apos;s iconic minimalist poem &apos;lighght&apos; (1966), by way of Martin Creed&apos;s Turner Prize-winning artwork &apos;Work No. 227: The Lights Going On and Off&apos; (2001). </p>
        </ul>
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
    const cat = 'web'
    return {
        props: { introPost, posts, categories, cat },
        revalidate: 600
    }
  }