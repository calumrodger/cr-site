import classes from '../tg-styles.module.scss';

const SaveStanzaToPad = (props) => {

    const { onSaveStanzaToPad, onUpdateStanzaToPad, editExistingStanzaMode } = props;

    return (
        <button className={`${classes.saveButton} ${classes.button}`} style={editExistingStanzaMode ? {fontSize: ".85rem"} : null} onClick={editExistingStanzaMode ? onUpdateStanzaToPad : onSaveStanzaToPad}>{editExistingStanzaMode ? "UPDATE STANZA" : "SAVE STANZA" }</button>
    )
}

export default SaveStanzaToPad;