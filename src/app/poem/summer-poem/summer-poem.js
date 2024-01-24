'use client';

import classes from './summer-poem.module.scss';

const FoliageComponent = () => {

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
