import classes from '../pads.module.scss';

const WordBank = (props) => {

    const { wordBank, onWordBankClick, deleteSelectedWordBank, selectAllWordBank, unselectAllWordBank } = props;

    return (
        <div className={classes.wordBankSection}>
            <div className={classes.wordBankButtons}>
                <button className={`${classes.button}`} onClick={deleteSelectedWordBank}>DEL</button>
                <button className={`${classes.button}`} onClick={selectAllWordBank}>SELECT ALL</button>
                <button className={`${classes.button}`} onClick={unselectAllWordBank}>UNSELECT ALL</button>
            </div>
            <div className={classes.wordBank}>
            {wordBank.map((word, i) => {
                return (
                    <span key={i} id={i} onClick={onWordBankClick} className={`${classes.word} ${word.selected ? classes.selected : null}`}>{word.text}</span>
                )
            })}
            </div>
        </div>
    )
}

export default WordBank;