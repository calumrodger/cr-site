import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './index.module.scss'
import parse from "html-react-parser";

const HomePage = (props) => {

  const { posts } = props

  let homePageContent = posts.find(item => item.slug === 'home')
  let homePageImage = homePageContent.image

  if (!homePageContent) {
    homePageContent = ''
  }
  console.log(homePageContent.content)

  const parsedContent = parse(homePageContent.content)
    let contentOutput = ''
  console.log(parsedContent)

    if (typeof parsedContent !== "string") {
    const filteredContent = parsedContent.filter(item => item !== '\n')
    console.log(filteredContent)

    let heading = filteredContent[0].props.children
    let bioBlurb = filteredContent[1].props.children
    let notProf = filteredContent[2].props.children
    let enjoy = filteredContent[3].props.children




  return (
    <>
    <div className={classes.bgImage} style={{backgroundImage: `url(${homePageImage})`}}>
      <div className={classes.pageContent} >
        <div className={classes.mainContent}>
        <div className={`${classes.contentBit} ${classes.heading}`}>{heading}</div>
        <div className={`${classes.contentBit} ${classes.bioBlurb}`}>{bioBlurb}</div>
        <div className={`${classes.contentBit} ${classes.notProf}`}>{notProf}</div>
        <div className={`${classes.contentBit} ${classes.enjoy}`}>{enjoy}</div>

        <div className={` ${classes.imageCredit}`}>Photo by <a href="https://www.katgollock.com">Kat Gollock</a> featuring detail by <a href="https://www.pucaprinthouse.com">Púca Printhouse</a>. Push the Boat Out 2022.</div>
        </div>
      </div>
    </div>
    </>
  )
}}


export async function getStaticProps() {
  const data = await getPostData()
  const posts = postDataSorter(data)
  const categoryData = await getCategoryData()
  const categories = categoryDataSorter(categoryData)

  return {
    props: { posts, categories },
    revalidate: 600
  }
}


export default HomePage;


