import classes from '../tg-styles.module.scss';
import { useState, useEffect } from 'react';

const WordBank = (props) => {

    const { onShuffleWordBank, baseFont, baseFontSize, onSaveWordBankAsList, wordBank, onWordBankClick, deleteSelectedWordBank, selectAllWordBank, unselectAllWordBank } = props;

    const [noneSelected, setNoneSelected] = useState(true);
    const [moreThanOneSelected, setMoreThanOneSelected] = useState(false);
    const [allSelected, setAllSelected] = useState(false);

    const isMoreThanOneWordSelected = () => {
        const quantity = wordBank.filter((item) => item.selected).length;
        if (quantity > 1) {
          return true;
        }
      }
  
      const areZeroWordsSelected = () => {
        const quantity = wordBank.filter((item) => item.selected).length;
        if (quantity === 0) {
          return true;
        }
      }
  
      const areAllWordsSelected = () => {
        const quantityWords = wordBank.length;
        const quantitySelected = wordBank.filter((item) => item.selected).length;
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
        setAllSelected(all)
      }, [wordBank])

    return (
        <div className={classes.wordBankSection}>
            <div className={classes.wordBank} style={{fontFamily: baseFont, fontSize: baseFontSize + 'rem'}}>
            {wordBank.map((word, i) => {
                return (
                    <span key={i} id={i} onClick={onWordBankClick} className={`${classes.word} ${word.selected ? classes.selected : null}`}>{word.text}</span>
                )
            })}
            </div>
            <div className={classes.wordBankButtons}>
              <button className={`${classes.button} ${classes.wordBankButton} ${noneSelected ? classes.disabled : null}`} onClick={onSaveWordBankAsList}>SAVE LIST</button>
              <button className={`${classes.button} ${classes.wordBankButton} ${noneSelected ? classes.disabled : null}`} onClick={deleteSelectedWordBank}>DELETE</button>
                <button className={`${classes.button} ${classes.wordBankButton} ${allSelected ? classes.disabled : null}`} onClick={selectAllWordBank}>select all</button>
                <button className={`${classes.button} ${classes.wordBankButton} ${noneSelected ? classes.disabled : null}`} onClick={unselectAllWordBank}>unselect all</button>
                <button className={`${classes.button} ${classes.wordBankButton}`} onClick={onShuffleWordBank}>shuffle</button>
            </div>
        </div>
    )
}

export default WordBank;