import { getPostData, postDataSorter, getRandomPost, categoryDataSorter, getCategoryData } from "../../helpers/api-utils";
import { useState, useEffect } from "react";
import classes from './the-lighght-going-on-and-off.module.scss'

const Lighght = () => {

    return (
        <>
            <div className={classes.lighght}>
                lighght
            </div>
        </>
    )
}

export default Lighght

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