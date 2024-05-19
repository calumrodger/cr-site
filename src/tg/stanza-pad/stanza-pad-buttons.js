import classes from '../pads.module.scss';

const StanzaPadButtons = (props) => {

    const { onSaveToWordBank, onSelectAllWords, onUnselectAllWords, onDeleteSelectedWords, onDuplicateSelectedWords, onEditWord } = props;

    return (
        <div className={classes.stanzaPadButtonsContainer}>
            <button className={classes.button} onClick={onSelectAllWords}>select all</button>
            <button className={classes.button} onClick={onUnselectAllWords}>unselect all</button>
            <button className={classes.button} onClick={onDeleteSelectedWords}>delete</button>
            <button className={classes.button} onClick={onDuplicateSelectedWords}>duplicate</button>
            <button className={classes.button} onClick={onSaveToWordBank}>save to bank</button>
            <button className={classes.button}>strip punc</button>
            <button className={classes.button}>edit word</button>
        </div>
    )
}

export default StanzaPadButtons;