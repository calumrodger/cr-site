import classes from '../tg-styles.module.scss';

const PoemUndoRedo = (props) => {

    const { onUndoRedoPoem, oldPoem } = props;

    const undoRedo = () => {
            onUndoRedoPoem();
    }

    return (
        <button className={`${classes.button}`} onClick={oldPoem.length === 0 ? null : undoRedo}>undo/redo</button>
    )
}

export default PoemUndoRedo;