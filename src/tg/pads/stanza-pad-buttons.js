import classes from './pads.module.scss';

const StanzaPadButtons = (props) => {

    const { onSaveToWordBank, onSelectAllWords, onUnselectAllWords, onDeleteSelectedWords, onDuplicateSelectedWords, onEditWord } = props;

    return (
        <>
            <button className={classes.button} onClick={onSelectAllWords}>SELECT ALL</button>
            <button className={classes.button} onClick={onUnselectAllWords}>UNSELECT ALL</button>
            <button className={classes.button} onClick={onDeleteSelectedWords}>DELETE SELECTED</button>
            <button className={classes.button} onClick={onDuplicateSelectedWords}>DUPLICATE SELECTED</button>
            <button className={classes.button} onClick={onSaveToWordBank}>SAVE TO BANK</button>
            <button className={classes.button}>EDIT WORD</button>
        </>
    )
}

export default StanzaPadButtons;