import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../helpers/api-utils";
import classes from './index.module.scss'
import parse from "html-react-parser";
import Layout from "../components/layout";

export const metadata = {
  title: 'Calum Rodger'
}

const HomePage = async () => {

  const data = await getPostData()
  const posts = postDataSorter(data)
  const categoryData = await getCategoryData()
  const categories = categoryDataSorter(categoryData)

  let homePageContent = posts.find(item => item.slug === 'home')
  let homePageImage = homePageContent.image

  if (!homePageContent) {
    homePageContent = ''
  }

  const parsedContent = parse(homePageContent.content)

    if (typeof parsedContent !== "string") {
    const filteredContent = parsedContent.filter(item => item !== '\n')

    let heading = filteredContent[0].props.children
    let bioBlurb = filteredContent[1].props.children
    let highlights = filteredContent[2].props.children
    let notProf = filteredContent[3].props.children
    let enjoy = filteredContent[4].props.children




  return (
    <>
    <Layout posts={posts} categories={categories}>
    <div className={classes.bgImage} style={{backgroundImage: `url(${homePageImage})`}}>
      <div className={classes.pageContent} >
        <div className={classes.mainContent}>
        <div className={`${classes.contentBit} ${classes.heading}`}>{heading}</div>
        <div className={`${classes.contentBit} ${classes.bioBlurb}`}>{bioBlurb}</div>
        <div className={`${classes.contentBit} ${classes.highlights}`}>{highlights}</div>
        <div className={`${classes.contentBit} ${classes.notProf}`}>{notProf}</div>
        <div className={`${classes.contentBit} ${classes.enjoy}`}>{enjoy}</div>
        <div className={classes.star}>
    
        </div>

        <div className={` ${classes.imageCredit}`}>Photo by <a href="https://www.katgollock.com">Kat Gollock</a> featuring detail by <a href="https://www.pucaprinthouse.com">Púca Printhouse</a>.</div>
        </div>
      </div>
    </div>
    </Layout>
    </>
  )
}}


export default HomePage;
