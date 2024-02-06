import classes from './poem.module.scss';

import { leagueSpartan } from '../../fonts';

const Poem = () => {

  return (
    <div className={classes.pageContainer}>
    <div className={classes.pageContent}>
      <div className={`${classes.text} ${leagueSpartan.className}`}>
      <div>RIMBAUD CHOSE ABSINTHE AND VERSES</div> 
      <div>THEN HE CHOSE SILENCE AND GUNS</div>
      <div>THE WORLD IS PROBABLY REDUCIBLE</div>
      <div>TO A SERIES OF ZEROS AND ONES</div>
      <div>SO EXPERIENCE TEACHES US</div>
      <div>TO LEARN TO BE DOWN ON OUR LUCK</div>
      <div>THE BEST THING A POET CAN HOPE FOR</div>
      <div style={{color: "#fff"}}>IS TO ONE DAY SHUT THE FUCK UP</div>
      </div>
    </div>
    </div>
  );
};

export default Poem;
