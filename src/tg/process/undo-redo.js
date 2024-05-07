import classes from '../styles.module.scss';

const UndoRedo = (props) => {

    const { poem, setPoem, oldPoem, setOldPoem } = props;

    const undoRedo = () => {
        setPoem(oldPoem);
        setOldPoem(poem);
    }

    return (
        <div className={classes.pageContainer}>
        <button onClick={undoRedo}>undo/redo</button>
        </div>
    )
}

export default UndoRedo;