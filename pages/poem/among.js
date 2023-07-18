import React from 'react';
import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../../helpers/api-utils";
import classes from './among.module.scss';

const FoliageComponent = () => {
  return (
    <div className={classes.pageContent}>
    <div className={classes.foliageContainer}>
      <div className={classes.foliageText}>
        the foliage of the park <br />
        among <br />
        the foliage of the room
      </div>
    </div>
    </div>
  );
};

export default FoliageComponent;


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