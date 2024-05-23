import classes from '../tg-styles.module.scss';
import StanzaUndoRedo from './undo-redo-stanza';

const StanzaPadButtons = (props) => {

    const { setStanza, setOldStanza, stanza, oldStanza, onSaveToWordBank, onSelectAllWords, onUnselectAllWords, onDeleteSelectedWords, onDuplicateSelectedWords, onEditWord } = props;

    return (
        <div className={classes.stanzaPadButtonsContainer}>
            <button className={classes.button} onClick={onSelectAllWords}>select all</button>
            <button className={classes.button} onClick={onUnselectAllWords}>unselect all</button>
            <button className={classes.button} onClick={onDeleteSelectedWords}>delete</button>
            <button className={classes.button} onClick={onDuplicateSelectedWords}>duplicate</button>
            <button className={classes.button} onClick={onSaveToWordBank}>save to bank</button>
            <button className={classes.button}>strip punct</button>
            <button className={classes.button}>add punct</button>
            <button className={classes.button}>shuffle</button>
            <button className={classes.button}>edit word</button>
            <StanzaUndoRedo setStanza={setStanza} setOldStanza={setOldStanza} stanza={stanza} oldStanza={oldStanza} />
        </div>
    )
}

export default StanzaPadButtons;