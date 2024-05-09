import classes from './pads.module.scss';

const SaveStanzaToPad = (props) => {

    const { onSaveStanzaToPad } = props;

    return (
            <button className={classes.button} onClick={onSaveStanzaToPad}>SAVE STANZA</button>
    )
}

export default SaveStanzaToPad;