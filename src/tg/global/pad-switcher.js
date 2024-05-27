import classes from '../tg-styles.module.scss';

const PadSwitcher = (props) => {

    const { onSwitchPad, padToShow } = props;

    const buttonText = padToShow === 'stanza' ? 'POEM PAD' : 'STANZA PAD';

    return (
        <div className={classes.switcherContainer}>
            <button className={classes.button} onClick={onSwitchPad}>{buttonText}</button>
        </div>
    )
}

export default PadSwitcher;