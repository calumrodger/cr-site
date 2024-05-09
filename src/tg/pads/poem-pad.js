import classes from './pads.module.scss';

const PoemPad = (props) => {

    const { poem } = props;

    return (
        <div className={classes.poemBox}>
          {poem.map((t, i) => {
              return <p key={i} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>{t}</p>
            }
          )}
      </div>
    )
}

export default PoemPad;