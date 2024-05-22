import classes from './n-plus-x.module.scss';
import { useState } from 'react';

const NPlusX = (props) => {

    const [wordClass, setWordClass] = useState(true);
    const [measure, setMeasure] = useState(true);
    const [rhyme, setRhyme] = useState(true);

    const handleReplaceClick = () => {
        console.log(wordClass, measure, rhyme)
    }

    return (
        <div className={classes.container}>
        <div className={classes.radioButtons}>
            <span>PRESERVE:</span>
            <div className={classes.buttonsContainer}>
                <div className={classes.buttonContainer}>
                    <label htmlFor="class">class: </label>
                    <input type="radio" id="class" name="class" value="class" readOnly checked={wordClass === true} onClick={(e) => setWordClass(!wordClass)}/>
                </div>
                <div className={classes.buttonContainer}>
                    <label htmlFor="measure">measure: </label>
                    <input type="radio" id="measure" name="measure" value="measure" readOnly checked={measure === true} onClick={(e) => setMeasure(!measure)}/>
                </div>
                <div className={classes.buttonContainer}>
                    <label htmlFor="rhyme">rhyme: </label>
                    <input type="radio" id="rhyme" name="rhyme" value="rhyme" readOnly checked={rhyme === true} onClick={(e) => setRhyme(!rhyme)}/>
                </div>
            </div>
        </div>
        <button onClick={handleReplaceClick} className={classes.button}>REPLACE</button>
        </div>
    )
}

export default NPlusX;