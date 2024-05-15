import classes from './pads.module.scss';

const StanzaPad = (props) => {

    const { stanza, onWordClick } = props;

    return (
        <div className={classes.stanzaBox}>
        <div className={classes.text}>
          {stanza.map((t, i) => {
            if (t.text === '\n') {
              return <br id={i} key={i} className={classes.lineBreak}/>
            } else {
              return <span id={i} key={i} onClick={onWordClick} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{t.text}</span>
            }
          })}
        </div>
      </div>
    )
}

export default StanzaPad;