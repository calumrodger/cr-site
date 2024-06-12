import classes from '../tg-styles.module.scss';
import StanzaUndoRedo from './undo-redo-stanza';
import { useState, useEffect } from 'react';

const StanzaPadButtons = (props) => {

    const { onStripCaps, shiftWordsUp, shiftWordsDown, addLineBreakAfterSelected, onAddPunct, onStripPunct, onConfirmEditWord, onSetWordBeingEdited, onSetWordEditMode, wordEditMode, onShuffleStanza, onUndoRedoStanza, stanza, oldStanza, onSaveToWordBank, onSelectAllWords, onUnselectAllWords, onDeleteSelectedWords, onDuplicateSelectedWords, onEditWord } = props;

    const backText = "<-";

    const [noneSelected, setNoneSelected] = useState(true);
    const [moreThanOneSelected, setMoreThanOneSelected] = useState(false);
    const [allSelected, setAllSelected] = useState(false);

    
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

      const areAllWordsSelected = () => {
        const quantityWords = stanza.filter((item) => item.type === 'text').length;
        const quantitySelected = stanza.filter((item) => item.selected && item.type === 'text').length;
        if (quantitySelected === quantityWords) {
            return true;
        }
      }

  
      useEffect(() => {
        const zero = areZeroWordsSelected();
        const moreThanOne = isMoreThanOneWordSelected();
        const all = areAllWordsSelected();
        setNoneSelected(zero);
        setMoreThanOneSelected(moreThanOne);
        setAllSelected(all);
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

    const onClickStripCaps = () => {
      onStripCaps();
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
            <button className={`${classes.button} ${noneSelected || wordEditMode ? classes.disabled : null}`} onClick={noneSelected || wordEditMode ? null : onSaveToWordBank}>SAVE TO BANK</button>
            </div>
            <div>
            <button onClick={noneSelected || moreThanOneSelected ? null : onClickEditWord} className={`${classes.button} ${noneSelected || moreThanOneSelected ? classes.disabled : null}`}>{wordEditMode ? 'DONE' : 'EDIT WORD'}</button>
            </div>
            <div>
            <button className={`${classes.button} ${allSelected || wordEditMode ? classes.disabled : null}`} onClick={allSelected || wordEditMode ? null : onSelectAllWords}>select all</button>
            </div>
            <div>
            <button className={`${classes.button} ${noneSelected || wordEditMode ? classes.disabled : null}`} onClick={noneSelected || wordEditMode ? null : onUnselectAllWords}>unselect all</button>
            </div>
            <div>
            <button onClick={noneSelected || wordEditMode ? null : shiftWordsUp} className={`${classes.button} ${noneSelected || wordEditMode ? classes.disabled : null}`}>◀ move</button>
            </div>
            <div>
            <button onClick={noneSelected || wordEditMode ? null : shiftWordsDown} className={`${classes.button} ${noneSelected || wordEditMode ? classes.disabled : null}`}>move ▶</button>
            </div>
            <div>
            <button className={`${classes.button} ${noneSelected || wordEditMode ? classes.disabled : null}`} onClick={noneSelected || wordEditMode ? null : onDuplicateSelectedWords}>duplicate</button>
            </div>
            <div>
            <button className={`${classes.button} ${noneSelected || wordEditMode ? classes.disabled : null}`} onClick={noneSelected || wordEditMode ? null : onDeleteSelectedWords}>delete</button>
            </div>
            <div>
            <button className={`${classes.button} ${!moreThanOneSelected || wordEditMode ? classes.disabled : null}`} onClick={!moreThanOneSelected || wordEditMode ? null : onShuffleStanza}>shuffle</button>
            </div>
            
            
            
            <div>
            <button className={`${classes.button} ${noneSelected || wordEditMode ? classes.disabled : null}`} onClick={noneSelected || wordEditMode ? null : onClickStripCaps}>strip caps</button>
            </div>
            <div>
            <button className={`${classes.button} ${noneSelected || wordEditMode ? classes.disabled : null}`} onClick={noneSelected || wordEditMode ? null : onClickStripPunct}>strip punct</button>
            </div>
            <div>
            <button onClick={noneSelected || wordEditMode ? null : onClickAddPunctReverse} className={`${classes.button} ${classes.backButton} ${noneSelected || wordEditMode ? classes.disabled : null}`}><span>◀</span></button>
            <button onClick={noneSelected || wordEditMode ? null : onClickAddPunct} className={`${classes.button} ${noneSelected || wordEditMode ? classes.disabled : null}`}>add punct</button>
            </div>
            <div>
            <button onClick={noneSelected || wordEditMode ? null : addLineBreakAfterSelected} className={`${classes.button} ${noneSelected || wordEditMode ? classes.disabled : null}`}>line break</button>
            </div>

            <div>
            </div>
        </div>
    )
}

export default StanzaPadButtons;