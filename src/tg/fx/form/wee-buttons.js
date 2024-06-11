import classes from '../../tg-styles.module.scss';

const TypographyButtons = (props) => {

    const { onSetCaps, onSetItalic, onSetMirror, onSetErasure, areStanzaWordsSelected, arePoemStanzasSelected, padToShow } = props;


    return (
        <div className={`${classes.weeButtons} ${(areStanzaWordsSelected && padToShow === 'stanza') || (arePoemStanzasSelected && padToShow === 'poem') ? null : classes.disabled}`}>
        <button onClick={areStanzaWordsSelected ? onSetItalic : null} className={`${classes.button} ${classes.italic} ${(areStanzaWordsSelected && padToShow === 'stanza') || (arePoemStanzasSelected && padToShow === 'poem') ? null : classes.disabled}`}>italic</button>
        <button onClick={areStanzaWordsSelected ? onSetCaps : null} className={`${classes.button} ${classes.caps} ${(areStanzaWordsSelected && padToShow === 'stanza') || (arePoemStanzasSelected && padToShow === 'poem') ? null : classes.disabled}`}>caps</button>
        <button onClick={areStanzaWordsSelected ? onSetMirror : null} className={`${classes.button} ${classes.mirror} ${(areStanzaWordsSelected && padToShow === 'stanza') || (arePoemStanzasSelected && padToShow === 'poem') ? null : classes.disabled}`}>mirror</button>
        <button onClick={areStanzaWordsSelected ? onSetErasure : null} className={`${classes.button} ${classes.erasure} ${(areStanzaWordsSelected && padToShow === 'stanza') || (arePoemStanzasSelected && padToShow === 'poem') ? null : classes.disabled}`}>erase</button>
        </div>
    );
    }

export default TypographyButtons;