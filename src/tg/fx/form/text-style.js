import classes from '../../tg-styles.module.scss';
import { useState } from 'react';

const FontStyle = (props) => {

    const {  onChangeTextRotation, areStanzaWordsSelected, arePoemStanzasSelected, padToShow } = props;

    const [quant, setQuant] = useState(0);

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
        onChangeTextRotation (e.target.value);
    }

    return (
    <div className={`${classes.formSliderContainer}`}>
    <label htmlFor="style-quant">rotate:</label>
    <input className={`${classes.slider} ${classes.slider} ${(areStanzaWordsSelected && padToShow === 'stanza') || (arePoemStanzasSelected && padToShow === 'poem') ? null : classes.disabled}`} type="range" min="0" max="36" id="style-quant" name="style-quant" onChange={onChangeQuant} value={quant}/>
    </div>
 )
}

export default FontStyle;