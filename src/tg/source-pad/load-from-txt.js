import classes from '../input.module.scss';
import { useState, useEffect } from 'react';

const LoadFromTxt = (props) => {

    const { onPopulateWithTxt } = props;
    const [finalString, setFinalString] = useState('');
    const [fileName, setFileName] = useState('');
    
    const onChangeHandler = (e) => {
        const file = e.target.files[0];
        setFileName(file.name);
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
        onPopulateWithTxt(fileName, finalString);
    }, [finalString])

    return (
        <>
        <label className={classes.fileLoad} htmlFor="txt-src">load a .txt file
        <input className={classes.fileLoad} type="file" accept=".txt" id="txt-src" name="txt-src" onChange={onChangeHandler}  />
        </label>
        </>
    )
}

export default LoadFromTxt;