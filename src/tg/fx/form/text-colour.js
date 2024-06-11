import classes from '../../tg-styles.module.scss';
import { useState } from 'react';

const ColourText = (props) => {

    const { onChangeTextColour, areStanzaWordsSelected, arePoemStanzasSelected, padToShow } = props;

    const [quant, setQuant] = useState(1);

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
        onChangeTextColour(e.target.value);
    }

    return (
    <div className={`${classes.colourContainer} ${(areStanzaWordsSelected && padToShow === 'stanza') || (arePoemStanzasSelected && padToShow === 'poem') ? null : classes.disabled}`}>
    <label htmlFor="colour">colour:</label>
    <input type="color" id="colour" name="colour" onChange={onChangeQuant} value={quant}/>
    </div>
 )
}

export default ColourText;