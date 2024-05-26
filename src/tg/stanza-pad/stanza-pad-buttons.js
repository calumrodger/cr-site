import classes from '../tg-styles.module.scss';
import StanzaUndoRedo from './undo-redo-stanza';

const StanzaPadButtons = (props) => {

    const { onShuffleStanza, setStanza, setOldStanza, stanza, oldStanza, onSaveToWordBank, onSelectAllWords, onUnselectAllWords, onDeleteSelectedWords, onDuplicateSelectedWords, onEditWord } = props;

    const backText = "<-";
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
            <button className={classes.button}>strip punct</button>
            </div>
            <div>
            <button className={`${classes.button} ${classes.backButton}`}><span>{backText}</span></button>
            <button className={classes.button}>add punct</button>
            </div>
            <div>
            <button className={classes.button} onClick={onShuffleStanza}>shuffle</button>
            </div>
            <div>
            <button className={classes.button}>edit word</button>
            </div>
            <div>
            <StanzaUndoRedo setStanza={setStanza} setOldStanza={setOldStanza} stanza={stanza} oldStanza={oldStanza} />
            </div>
        </div>
    )
}

export default StanzaPadButtons;