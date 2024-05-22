import classes from './llm.module.scss';
import { useState } from 'react';
import Replicate from 'replicate';

const LLMFX = (props) => {

    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });

    const input = {
    top_p: 0.9,
    prompt: "Story title: 3 llamas go for a walk\nSummary: The 3 llamas crossed a bridge and something unexpected happened\n\nOnce upon a time",
    max_tokens: 512,
    min_tokens: 0,
    temperature: 0.6,
    prompt_template: "{prompt}",
    presence_penalty: 1.15,
    frequency_penalty: 0.2
    };

    

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