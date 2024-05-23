import classes from '../../tg-styles.module.scss';
import { useEffect, useState } from 'react';

const LLMFX = (props) => {

    const { stanza, onUpdate } = props;

    const [promptValue, setPromptValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedWords, setSelectedWords] = useState([]);
    const [rawOutput, setRawOutput] = useState('');
    // const [treatedOutput, setTreatedOutput] = useState('');

    const emojiPrompt = 
    `Give me a list of ${selectedWords.length} emojis that represent the following words:
    
    ${selectedWords.join(", ")}
    
    Return the list of emojis in the same order as the words, in the format:
    
    ['emoji1', 'emoji2', 'emoji3', ...].`

    useEffect(() => {
      setSelectedWords(getSelectedWords(stanza));
      console.log(selectedWords)
    }, [stanza])

    const getSelectedWords = (stanza) => {
        let selectedWords = [];
        stanza.forEach((word) => {
                if (word.selected) {
                    selectedWords.push(word);
                }
            });
        const justTheWords = selectedWords.map((word) => word.text);
        return justTheWords;
    }
   
    const handleChange = (e) => {
      setPromptValue(e.target.value);
    };
   
    const handlePromptClick = async (e) => {
      e.preventDefault();
      setLoading(true);
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          prompt: emojiPrompt,
        }),
      });
      const data = await response.json()
      setRawOutput(data.join(""));
      setLoading(false);
      console.log(rawOutput)
    };

    const processLlmOutput = () => {

      if (rawOutput.includes('[') === false || rawOutput.includes(']') === false) {
        return 'error';
      } else {
        const words = rawOutput.split('[')[1].split(']')[0].split(',');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].replace(/"/g, "").replace(/'/g, "").trim();
        }
        return words;
      }
  }

    const onClickEmojify = (e) => {
      handlePromptClick(e, emojiPrompt);
    }

    useEffect(() => {
      if (typeof rawOutput === 'string' && rawOutput !== '') {
          let treatedOutput = processLlmOutput(rawOutput);
          console.log(treatedOutput)
          if (typeof treatedOutput === "object") {
              onUpdate(getNewStanza(treatedOutput), stanza)
          } else {
              console.log('ERROR' + treatedOutput)
          }
      }
    }, [rawOutput])

    const getNewStanza = (treatedOutput) => {
        let newArray = stanza.map((word) => {
            if (word.selected) {
                return { id: word.id, type: "text", text: null, selected: true }
            } else {
                return word;
            }
        });
        let replacementCount = 0;
        for (let i = 0; i < newArray.length; i++) {
            if ((newArray[i].type === 'text') && (newArray[i].text === null)) {
                newArray[i].text = treatedOutput[replacementCount];
                replacementCount++;
            }
        }
        return newArray;
    }

    return (
        <div className={classes.llmContainer}>
            <div className={classes.buttonsContainer}>
                <button className={classes.button} onClick={(e) => onClickEmojify(e)}>EMOJIFY</button>
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