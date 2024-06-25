import classes from '../../tg-styles.module.scss';

const FormResetButton = (props) => {

    const { onResetTypography, areStanzaWordsSelected, arePoemStanzasSelected, padToShow } = props;

    return (
        <button className={`${classes.button} ${classes.resetButton} ${(areStanzaWordsSelected && padToShow === 'stanza') || (arePoemStanzasSelected && padToShow === 'poem') ? null : classes.disabled}`} onClick={(areStanzaWordsSelected && padToShow === 'stanza') || (arePoemStanzasSelected && padToShow === 'poem')  ? onResetTypography : null}>RESET</button>
    )
}

export default FormResetButton;