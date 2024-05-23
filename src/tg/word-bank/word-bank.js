import classes from '../tg-styles.module.scss';

const WordBank = (props) => {

    const { onSaveWordBankAsList, wordBank, onWordBankClick, deleteSelectedWordBank, selectAllWordBank, unselectAllWordBank } = props;

    return (
        <div className={classes.wordBankSection}>
            <div className={classes.wordBank}>
            {wordBank.map((word, i) => {
                return (
                    <span key={i} id={i} onClick={onWordBankClick} className={`${classes.word} ${word.selected ? classes.selected : null}`}>{word.text}</span>
                )
            })}
            </div>
            <div className={classes.wordBankButtons}>
                <button className={`${classes.button} ${classes.wordBankButton}`} onClick={selectAllWordBank}>select all</button>
                <button className={`${classes.button} ${classes.wordBankButton}`} onClick={unselectAllWordBank}>unselect all</button>
                <button className={`${classes.button} ${classes.wordBankButton}`} >shuffle</button>
                <button className={`${classes.button} ${classes.wordBankButton}`} onClick={onSaveWordBankAsList}>save as list</button>
                <button className={`${classes.button} ${classes.wordBankButton}`} onClick={deleteSelectedWordBank}>delete</button>
            </div>
        </div>
    )
}

export default WordBank;