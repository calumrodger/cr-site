import classes from '../../fx.module.scss';
import { useState } from 'react';

const FontStyle = (props) => {

    const { onChangeTextStyle } = props;

    const [quant, setQuant] = useState(0);

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
        onChangeTextStyle(e.target.value);
    }

    return (
        <div className={classes.formSliderContainer}>
    <label htmlFor="style-quant">style:</label>
    <input className={classes.slider} type="range" min="-9" max="9" id="style-quant" name="style-quant" onChange={onChangeQuant} value={quant}/>
    </div>
 )
}

export default FontStyle;