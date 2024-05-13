import classes from './pads.module.scss';

const SaveStanzaToPad = (props) => {

    const { onSaveStanzaToPad, onUpdateStanzaToPad, editExistingStanzaMode } = props;

    return (
        <button className={classes.button} onClick={editExistingStanzaMode ? onUpdateStanzaToPad : onSaveStanzaToPad}>{editExistingStanzaMode ? "UPDATE STANZA" : "SAVE STANZA" }</button>
    )
}

export default SaveStanzaToPad;