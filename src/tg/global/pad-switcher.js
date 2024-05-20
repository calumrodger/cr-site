import classes from '../pads.module.scss';

const PadSwitcher = (props) => {

    const { onSwitchPad, padToShow } = props;

    const buttonText = padToShow === 'stanza' ? 'GO TO POEM PAD' : 'GO TO STANZA PAD';

    return (
        <div className={classes.switcherContainer}>
            <button className={classes.button} onClick={onSwitchPad}>{buttonText}</button>
        </div>
    )
}

export default PadSwitcher;