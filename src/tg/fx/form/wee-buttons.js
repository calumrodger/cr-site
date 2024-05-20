import classes from '../../fx.module.scss';

const TypographyButtons = (props) => {

    const { onSetItalic, onSetMirror } = props;


    return (
        <>
        <button onClick={onSetItalic} className={`${classes.button} ${classes.italic}`}>italic</button>
        <button onClick={onSetMirror} className={`${classes.button} ${classes.mirror}`}>mirror</button>
        </>
    );
    }

export default TypographyButtons;