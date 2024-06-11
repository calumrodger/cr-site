import classes from '../../tg-styles.module.scss';
import { useState } from 'react';

const ResizeText = (props) => {

    const { onResizeText, areStanzaWordsSelected, arePoemStanzasSelected, padToShow } = props;

    const [quant, setQuant] = useState(0);

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
        onResizeText(e.target.value);
    }

    return (
        <div className={`${classes.formSliderContainer}`}>
    <label htmlFor="resize-quant">size:</label>
    <input className={`${classes.slider} ${(areStanzaWordsSelected && padToShow === 'stanza') || (arePoemStanzasSelected && padToShow === 'poem') ? null : classes.disabled}`} type="range" min="-5" max="5" step=".1" id="resize-quant" name="resize-quant" onChange={onChangeQuant} value={quant}/>
    </div>
 )
}

export default ResizeText;