import classes from './pads.module.scss';

const PadSwitcher = (props) => {

    const { onSwitchPad } = props;

    return (
            <button className={classes.button} onClick={onSwitchPad}>SWITCH PAD</button>
    )
}

export default PadSwitcher;