import classes from '../../fx.module.scss';
import { useState } from 'react';

const ResizeText = (props) => {

    const { onResizeText } = props;

    const [quant, setQuant] = useState(0);

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
        onResizeText(e.target.value);
    }

    return (
    <>
    <label htmlFor="resize-quant">size:</label>
    <input className={classes.slider} type="range" min="-9" max="9" id="resize-quant" name="resize-quant" onChange={onChangeQuant} value={quant}/>
    </>
 )
}

export default ResizeText;