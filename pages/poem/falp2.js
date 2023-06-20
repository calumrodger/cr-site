import React from 'react';
import styles from './falp2.module.scss';
import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../../helpers/api-utils";

const WebPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.topLeft}>FULLY</div>
        <div className={styles.topRight}>AUTOMATED</div>
        <div className={styles.bottomLeft}>
          <span className={styles.luxuryL}>L</span>
          <span className={styles.luxuryU}>U</span>
          <span className={styles.luxuryX}>X</span>
          <span className={styles.luxuryU}>U</span>
          <span className={styles.luxuryR}>R</span>
          <span className={styles.luxuryY}>Y</span>
        </div>
        <div className={styles.bottomRight}>POETRY</div>
      </div>
    </div>
  );
};

export default WebPage;


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