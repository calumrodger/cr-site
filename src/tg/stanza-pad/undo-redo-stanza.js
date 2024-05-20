import classes from '../pads.module.scss';
import { useState } from 'react';

const StanzaUndoRedo = (props) => {

    const { stanza, setStanza, oldStanza, setOldStanza } = props;

    const [undone, setUndone] = useState(false);

    const undoRedo = () => {
        if (!undone) {
            setOldStanza(stanza);
            setStanza(oldStanza);
            setUndone(true);
        } else {
            setStanza(oldStanza);
            setUndone(false);
        }
    }

    return (
        <button className={classes.button} onClick={undoRedo}>undo/redo</button>
    )
}

export default StanzaUndoRedo;