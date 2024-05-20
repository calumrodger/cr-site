import classes from '../../fx.module.scss';
import { useState } from 'react';

const FontStyle = (props) => {

    const { onChangeTextOpacity } = props;

    const [quant, setQuant] = useState(0);

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
        onChangeTextOpacity(e.target.value);
    }

    return (
    <div className={classes.formSliderContainer}>
    <label htmlFor="style-quant">rotate:</label>
    <input className={classes.slider} type="range" min="0" max="36" id="style-quant" name="style-quant" onChange={onChangeQuant} value={quant}/>
    </div>
 )
}

export default FontStyle;