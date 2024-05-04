import classes from './poem.module.scss';

const Poem = () => {

  return (
    <div className={classes.pageContainer}>
    <div className={classes.pageContent}>
      <div className={classes.poemContainer}>
      <p>spawned the mornin</p>
      <p>couldnae WASD!</p>
      <p className={classes.italicise}>sum bug eh</p>
      </div>
    </div>
    </div>
  );
};

export default Poem;
