import classes from './poem.module.scss';

import { leagueSpartan } from '../../fonts';

const Poem = () => {

  return (
    <div className={classes.pageContainer}>
    <div className={classes.pageContent}>
      <div className={`${classes.text} ${leagueSpartan.className}`}>
      ETERNAL<br/> 
      RECURRENCE<br/>
      IS NOT<br/>
      A JOKE<br/>
      </div>
    </div>
    </div>
  );
};

export default Poem;
