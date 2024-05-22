import classes from './llm.module.scss';
import { useState } from 'react';

const LLMFX = (props) => {

    const { onUpdate, stanza } = props;

    const [promptValue, setPromptValue] = useState('');

    const handlePromptClick = () => {
        console.log(promptValue)
    }

    return (
        <div className={classes.container}>
            <div className={classes.buttonsContainer}>
                <button className={classes.button}>EMOJIFY</button>
                <button className={classes.button}>INTENSIFY</button>
                <button className={classes.button}>NONSENSIFY</button>
            </div>
            <div className={classes.promptContainer}>
                <label htmlFor="llm-prompt">global remix:</label>
                <input className={classes.prompt} value={promptValue} onChange={(e) => setPromptValue(e.target.value)} type="text" placeholder="enter text here" />
                <button className={classes.button} onClick={handlePromptClick}>GO</button>
            </div>
        </div>
    )
}

export default LLMFX;