import classes from './process.module.scss';

const UndoRedo = (props) => {

    const { stanza, setStanza, oldStanza, setOldStanza } = props;

    const undoRedo = () => {
        setStanza(oldStanza);
        setOldStanza(stanza);
    }

    return (
        <div className={classes.pageContainer}>
        <button className={classes.button} onClick={undoRedo}>undo/redo</button>
        </div>
    )
}

export default UndoRedo;