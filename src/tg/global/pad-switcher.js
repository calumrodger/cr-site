import classes from '../pads.module.scss';

const PadSwitcher = (props) => {

    const { onSwitchPad } = props;

    return (
        <div className={classes.switcherContainer}>
            <button className={classes.button} onClick={onSwitchPad}>SWITCH PAD</button>
        </div>
    )
}

export default PadSwitcher;