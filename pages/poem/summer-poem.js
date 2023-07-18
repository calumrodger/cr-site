import React from 'react';
import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../../helpers/api-utils";
import classes from './summer-poem.module.scss';

const FoliageComponent = (props) => {
    const { titleSetter } = props
    
    titleSetter('summer poem')
  return (
    <div className={classes.pageContent}>
    <div className={classes.foliageContainer}>
        <div className={classes.foliageText}>
      <div className={classes.foliageText1}>
        the foliage of the park <br />
        </div>
        <div className={classes.foliageText2}>
        among <br />
        </div>
        <div className={classes.foliageText3}>
        the foliage of the room
        </div>
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