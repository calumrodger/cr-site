import classes from '../../tg-styles.module.scss';
import { useState } from 'react';

const FontText = (props) => {

    const { onChangeFont, areStanzaWordsSelected, arePoemStanzasSelected, padToShow } = props;

    const [quant, setQuant] = useState(2);

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
        onChangeFont(e.target.value);
    }

    return (
    <div className={`${classes.formSliderContainer}`}>
    <label htmlFor="font-quant">font:</label>
    <input className={`${classes.slider} ${(areStanzaWordsSelected && padToShow === 'stanza') || (arePoemStanzasSelected && padToShow === 'poem') ? null : classes.disabled}`} type="range" min="1" max="8" id="font-quant" name="font-quant" onChange={onChangeQuant} value={quant}/>
    </div>
 )
}

export default FontText;