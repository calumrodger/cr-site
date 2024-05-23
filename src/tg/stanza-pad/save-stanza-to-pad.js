import classes from '../tg-styles.module.scss';

const SaveStanzaToPad = (props) => {

    const { onSaveStanzaToPad, onUpdateStanzaToPad, editExistingStanzaMode } = props;

    return (
        <button className={classes.saveButton} onClick={editExistingStanzaMode ? onUpdateStanzaToPad : onSaveStanzaToPad}>{editExistingStanzaMode ? "UPDATE STANZA" : "SAVE STANZA" }</button>
    )
}

export default SaveStanzaToPad;