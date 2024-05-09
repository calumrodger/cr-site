import classes from './pads.module.scss';

const PoemPad = (props) => {

    const { poem, shiftStanzaUp, shiftStanzaDown, deleteStanza } = props;

    return (
        <div className={classes.poemBox}>
          {poem.map((t, i) => {
              return (
              <div key={i} className={classes.stanzaContainer}>
                <div className={classes.buttonContainer}>
                    <button id={t.id} className={classes.button} onClick={shiftStanzaUp}>UP</button>
                    <button id={t.id} className={classes.button} onClick={shiftStanzaDown}>DOWN</button>
                    <button id={t.id} className={classes.button} onClick={deleteStanza}>DEL</button>
                </div>
                <p id={i} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>{t.text}</p>
              </div>
          )}
          )}
      </div>
    )
}

export default PoemPad;