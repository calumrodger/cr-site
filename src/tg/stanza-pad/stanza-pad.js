import classes from '../tg-styles.module.scss';
import { useState } from 'react';
import { checkStyles, checkPoemStyles } from '@tg/utils/utils';

const StanzaPad = (props) => {

    const { updatePoemStyles, wordBeingEdited, onSetWordBeingEdited, wordEditMode, baseFont, baseFontSize, stanza, onWordClick, updateStanzaStyles } = props;


    let stanzaStyles = {};
    if (updateStanzaStyles !== null) {
      stanzaStyles = updateStanzaStyles;
    }

    let poemStyles = {};
    if (updatePoemStyles !== null) {
      poemStyles = {style: updatePoemStyles};
    }

    const onEditingWord = (e) => {
      onSetWordBeingEdited(e.target.value);
      // onChangeWordWhileEditing(e.target.value);
    }

    return (
        <div className={classes.stanzaBox} style={{fontFamily: baseFont, fontSize: baseFontSize + 'rem'}}>
        <div style={checkPoemStyles(poemStyles, baseFontSize)} className={classes.textContainer}>
          {stanza.map((t, i) => {
            if (t.text === '\n') {
              return <br id={i} key={i} className={classes.lineBreak}/>
            } else {
              if (wordEditMode && t.selected) {
                return <input id={i} key={i} type="text" value={wordBeingEdited} onChange={(e) => onEditingWord(e)} style={checkStyles(t)} className={`${classes.wordInputField} ${classes.word} ${t.selected ? classes.selected : null}`}></input>
              } else {
              return <span id={i} key={i} onClick={onWordClick} style={checkStyles(t, baseFontSize)} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{t.text}</span>
              }
            }
          })}
        </div>
      </div>
    )
}

export default StanzaPad;