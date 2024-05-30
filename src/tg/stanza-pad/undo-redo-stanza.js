import classes from '../tg-styles.module.scss';

const StanzaUndoRedo = (props) => {

    const { onUndoRedoStanza, wordEditMode } = props;

    const undoRedo = () => {
            onUndoRedoStanza();
    }

    return (
        <button className={`${classes.button} ${wordEditMode ? classes.disabled : null}`} onClick={undoRedo}>undo/redo</button>
    )
}

export default StanzaUndoRedo;