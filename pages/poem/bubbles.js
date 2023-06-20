import React, { useEffect } from 'react';
import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../../helpers/api-utils";
import classes from './bubbles.module.scss';

const Bubbles = () => {
  useEffect(() => {
    // Generate bubbles
    const bubbleContainer = document.querySelector('.bubble-container');
    console.log(bubbleContainer)
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = classes.bubble;
      bubble.style.background = colors[Math.floor(Math.random() * colors.length)];

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      bubble.style.left = x + 'px';
      bubble.style.top = y + 'px';

      bubbleContainer.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 3000);
    };

    const intervalId = setInterval(createBubble, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
    <div className='bubble-container'>

    </div>
    </>
  );
};

export default Bubbles;


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