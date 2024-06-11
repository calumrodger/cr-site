import classes from '../../tg-styles.module.scss';
import { useState } from 'react';

const ReweightText = (props) => {

    const { onReweightText, areStanzaWordsSelected, arePoemStanzasSelected, padToShow } = props;

    const [quant, setQuant] = useState(4);

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
        onReweightText(e.target.value);
    }

    return (
        <div className={`${classes.formSliderContainer}`}>
    <label htmlFor="reweight-quant">weight:</label>
    <input className={`${classes.slider} ${(areStanzaWordsSelected && padToShow === 'stanza') || (arePoemStanzasSelected && padToShow === 'poem') ? null : classes.disabled}`} type="range" min="1" max="10" id="reweight-quant" name="reweight-quant" onChange={onChangeQuant} value={quant}/>
    </div>
 )
}

export default ReweightText;