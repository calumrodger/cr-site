import classes from './llm.module.scss';
import { useState } from 'react';

const LLMFX = (props) => {

    const [inputValue, setInputValue] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
   
    const handleChange = (e) => {
      setInputValue(e.target.value);
    };
   
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          prompt: inputValue,
        }),
      });
      const data = await response.json();
      console.log(data.join(""));
      setImage(data);
      setLoading(false);
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
            <div>
          <form onSubmit={handleSubmit} >
            <label >
              Enter your prompt
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
            />
            <button
              disabled={loading}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        </div>
    )
}

export default LLMFX;