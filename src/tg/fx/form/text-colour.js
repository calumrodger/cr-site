import classes from '../fx.module.scss';
import { useState } from 'react';

const ColourText = (props) => {

    const { onChangeTextColour } = props;

    const [quant, setQuant] = useState(1);

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
        onChangeTextColour(e.target.value);
    }

    return (
    <>
    <label htmlFor="colour">colour:</label>
    <input type="color" id="colour" name="colour" onChange={onChangeQuant} value={quant}/>
    </>
 )
}

export default ColourText;