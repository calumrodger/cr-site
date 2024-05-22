import classes from '../../fx.module.scss';

const TypographyButtons = (props) => {

    const { onSetCaps, onSetItalic, onSetMirror, onSetErasure } = props;


    return (
        <div className={classes.weeButtons}>
        <button onClick={onSetItalic} className={`${classes.button} ${classes.italic}`}>italic</button>
        <button onClick={onSetCaps} className={`${classes.button} ${classes.caps}`}>caps</button>
        <button onClick={onSetMirror} className={`${classes.button} ${classes.mirror}`}>mirror</button>
        <button onClick={onSetErasure} className={`${classes.button} ${classes.erasure}`}>erase</button>
        </div>
    );
    }

export default TypographyButtons;