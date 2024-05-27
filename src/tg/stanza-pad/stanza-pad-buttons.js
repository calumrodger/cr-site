import classes from '../tg-styles.module.scss';
import StanzaUndoRedo from './undo-redo-stanza';
import { useState, useEffect } from 'react';

const StanzaPadButtons = (props) => {

    const { onAddPunct, onStripPunct, onConfirmEditWord, onSetWordBeingEdited, onSetWordEditMode, wordEditMode, onShuffleStanza, onUndoRedoStanza, stanza, oldStanza, onSaveToWordBank, onSelectAllWords, onUnselectAllWords, onDeleteSelectedWords, onDuplicateSelectedWords, onEditWord } = props;

    const backText = "<-";

    const [noneSelected, setNoneSelected] = useState(true);
    const [moreThanOneSelected, setMoreThanOneSelected] = useState(false);

    
    const isMoreThanOneWordSelected = () => {
        const quantity = stanza.filter((item) => item.selected).length;
        if (quantity > 1) {
          return true;
        }
      }
  
      const areZeroWordsSelected = () => {
        const quantity = stanza.filter((item) => item.selected).length;
        if (quantity === 0) {
          return true;
        }
      }
  
      useEffect(() => {
        const zero = areZeroWordsSelected();
        const moreThanOne = isMoreThanOneWordSelected();
        setNoneSelected(zero);
        setMoreThanOneSelected(moreThanOne);
      }, [stanza])

    const onClickEditWord = () => {
        if (noneSelected || moreThanOneSelected) {
            return;
        } else {
            if (!wordEditMode) {
            const word = stanza.find((item) => item.selected).text;
            onSetWordBeingEdited(word);
            onSetWordEditMode();
            } else {
                onConfirmEditWord();
                onSetWordEditMode();
            }
        }
    }
    
    const onClickStripPunct = () => {
        onStripPunct();
    }

    const onClickAddPunct = () => { 
        onAddPunct(false);
    }

    const onClickAddPunctReverse = () => {
        onAddPunct(true);
    }

    return (
        <div className={classes.stanzaPadButtonsContainer}>
            <div>
            <button className={classes.button} onClick={onSelectAllWords}>select all</button>
            </div>
            <div>
            <button className={classes.button} onClick={onUnselectAllWords}>unselect all</button>
            </div>
            <div>
            <button className={classes.button} onClick={onDeleteSelectedWords}>delete</button>
            </div>
            <div>
            <button className={classes.button} onClick={onDuplicateSelectedWords}>duplicate</button>
            </div>
            <div>
            <button className={classes.button} onClick={onSaveToWordBank}>save to bank</button>
            </div>
            <div>
            <button className={classes.button} onClick={onClickStripPunct}>strip punct</button>
            </div>
            <div>
            <button onClick={onClickAddPunctReverse} className={`${classes.button} ${classes.backButton}`}><span>{backText}</span></button>
            <button onClick={onClickAddPunct} className={classes.button}>add punct</button>
            </div>
            <div>
            <button className={classes.button} onClick={onShuffleStanza}>shuffle</button>
            </div>
            <div>
            <button onClick={onClickEditWord} className={`${classes.button} ${noneSelected || moreThanOneSelected ? classes.disabled : null}`}>edit word</button>
            </div>
            <div>
            <StanzaUndoRedo onUndoRedoStanza={onUndoRedoStanza} stanza={stanza} oldStanza={oldStanza} />
            </div>
        </div>
    )
}

export default StanzaPadButtons;