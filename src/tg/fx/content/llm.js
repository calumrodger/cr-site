import classes from './llm.module.scss';
import { useState } from 'react';

const LLMFX = (props) => {

    const [promptValue, setPromptValue] = useState('');
    const [loading, setLoading] = useState(false);
   
    const handleChange = (e) => {
      setPromptValue(e.target.value);
    };
   
    const handlePromptClick = async (e) => {
      e.preventDefault();
      setLoading(true);
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          prompt: `${promptValue}`,
        }),
      });
      const data = await response.json();
      console.log(data.join(""));
      setImage(data);
      setLoading(false);
    };

    const { onUpdate, stanza } = props;

    return (
        <div className={classes.container}>
            <div className={classes.buttonsContainer}>
                <button className={classes.button}>EMOJIFY</button>
                <button className={classes.button}>INTENSIFY</button>
                <button className={classes.button}>NONSENSIFY</button>
            </div>
            <div className={classes.promptContainer}>
                <label htmlFor="llm-prompt">global remix:</label>
                <input className={classes.prompt} value={promptValue} onChange={(e) => handleChange(e)} type="text" placeholder="enter text here" />
                <button className={classes.button} onClick={handlePromptClick}>GO</button>
            </div>
            <div>
        </div>
        </div>
    )
}

export default LLMFX;