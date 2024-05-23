import classes from '../tg-styles.module.scss';
import { useEffect } from 'react';
import { checkStyles } from '@tg/utils/utils';

const StanzaPad = (props) => {

    const { stanza, onWordClick, updateStanzaStyles } = props;

    let styles = {};
    if (updateStanzaStyles !== null) {
      styles = updateStanzaStyles;
    }

    return (
        <div className={classes.stanzaBox}>
        <div className={classes.text}>
          {stanza.map((t, i) => {
            if (t.text === '\n') {
              return <br id={i} key={i} className={classes.lineBreak}/>
            } else {
              return <span id={i} key={i} onClick={onWordClick} style={checkStyles(t)} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{t.text}</span>
            }
          })}
        </div>
      </div>
    )
}

export default StanzaPad;