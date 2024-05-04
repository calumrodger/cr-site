'use client';

import classes from './poem.module.scss';

const Poem = () => {

  return (
    <div className={classes.pageContainer}>
    <div className={classes.pageContent}>
      <div className={classes.box}>
        <span className={classes.text}>{props.source}</span>
      </div>
      </div>
    </div>
  );
};

export default Poem;
