import classes from '../input.module.scss';
import { useState, useEffect } from 'react';

const LoadFromTxt = (props) => {

    const { onPopulateWithTxt } = props;
    const [finalString, setFinalString] = useState('');
    
    const onChangeHandler = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        if (!file) {
            return;
        }
        reader.readAsText(file);
        reader.onload = function() {
            setFinalString(reader.result.replace(/(?:\r\n|\r|\n)/g, ' '));
        };
    }

    useEffect(() => {
        onPopulateWithTxt(finalString);
    }, [finalString, onPopulateWithTxt])

    return (
        <>
        <label className={classes.fileLoad} htmlFor="txt-src">load a .txt file
        <input className={classes.fileLoad} type="file" accept=".txt" id="txt-src" name="txt-src" onChange={onChangeHandler}  />
        </label>
        </>
    )
}

export default LoadFromTxt;