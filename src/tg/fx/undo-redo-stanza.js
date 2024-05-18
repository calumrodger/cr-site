import classes from './fx.module.scss';
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
        <div className={classes.pageContainer}>
        <button className={classes.button} onClick={undoRedo}>undo/redo</button>
        </div>
    )
}

export default StanzaUndoRedo;