import classes from '../tg-styles.module.scss';
import { useState } from 'react';
import { checkStyles } from '@tg/utils/utils';

const StanzaPad = (props) => {

    const { wordBeingEdited, onSetWordBeingEdited, onChangeWordWhileEditing, wordEditMode, baseFont, stanza, onWordClick, updateStanzaStyles } = props;


    let styles = {};
    if (updateStanzaStyles !== null) {
      styles = updateStanzaStyles;
    }

    const onEditingWord = (e) => {
      onSetWordBeingEdited(e.target.value);
      // onChangeWordWhileEditing(e.target.value);
    }

    return (
        <div className={classes.stanzaBox}>
        <div style={{fontFamily: baseFont}} className={classes.text}>
          {stanza.map((t, i) => {
            if (t.text === '\n') {
              return <br id={i} key={i} className={classes.lineBreak}/>
            } else {
              if (wordEditMode && t.selected) {
                return <input id={i} key={i} type="text" value={wordBeingEdited} onChange={(e) => onEditingWord(e)} style={checkStyles(t)} className={`${classes.wordInputField} ${classes.word} ${t.selected ? classes.selected : null}`}></input>
              } else {
              return <span id={i} key={i} onClick={onWordClick} style={checkStyles(t)} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{t.text}</span>
              }
            }
          })}
        </div>
      </div>
    )
}

export default StanzaPad;