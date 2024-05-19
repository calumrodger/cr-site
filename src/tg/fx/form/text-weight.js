import classes from '../../fx.module.scss';
import { useState } from 'react';

const ReweightText = (props) => {

    const { onReweightText } = props;

    const [quant, setQuant] = useState(4);

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
        onReweightText(e.target.value);
    }

    return (
    <>
    <label htmlFor="reweight-quant">weight:</label>
    <input className={classes.slider} type="range" min="1" max="10" id="reweight-quant" name="reweight-quant" onChange={onChangeQuant} value={quant}/>
    </>
 )
}

export default ReweightText;