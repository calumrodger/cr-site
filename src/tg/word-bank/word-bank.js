import classes from '../pads.module.scss';

const WordBank = (props) => {

    const { wordBank, onWordBankClick, deleteSelectedWordBank, selectAllWordBank, unselectAllWordBank } = props;

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
                <button className={`${classes.button}`} onClick={selectAllWordBank}>select all</button>
                <button className={`${classes.button}`} onClick={unselectAllWordBank}>unselect all</button>
                <button className={`${classes.button}`} >shuffle</button>
                <button className={`${classes.button}`} >save as list</button>
                <button className={`${classes.button}`} onClick={deleteSelectedWordBank}>delete</button>
            </div>
        </div>
    )
}

export default WordBank;