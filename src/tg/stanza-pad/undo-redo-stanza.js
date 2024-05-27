import classes from '../tg-styles.module.scss';

const StanzaUndoRedo = (props) => {

    const { onUndoRedoStanza } = props;

    const undoRedo = () => {
            onUndoRedoStanza();
    }

    return (
        <button className={classes.button} onClick={undoRedo}>undo/redo</button>
    )
}

export default StanzaUndoRedo;