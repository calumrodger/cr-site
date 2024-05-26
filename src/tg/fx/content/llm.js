import classes from '../../tg-styles.module.scss';
import { useEffect, useState } from 'react';

const LLMFX = (props) => {

    const { stanza, onUpdate, onSetStatusMessage } = props;

    const [promptValue, setPromptValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedWords, setSelectedWords] = useState([]);
    const [rawEmojiOutput, setRawEmojiOutput] = useState('');
    const [rawIntensifyOutput, setRawIntensifyOutput] = useState('');
    const [rawNonsensifyOutput, setRawNonsensifyOutput] = useState('');

    useEffect(() => {
      if (loading === true) {
        onSetStatusMessage('awaiting LLM response...');
      } else {
        onSetStatusMessage('all systems good');
      }
    }, [loading])
 

    const emojiPrompt = 
    `Give me a JavaScript array of ${selectedWords.length} emojis that represent the following words:
    
    ${selectedWords.join(", ")}
    
    Return the list of emojis in the same order as the words. Your complete response should be in the format below, enclosed by ::: - triple colons.
    
    :::
    ['emoji1', 'emoji2', 'emoji3', ...]
    :::
    
    Do not include anything else in your response.`

    const intensifyPrompt = 
    `For each of the following words in the list, please add two or more intensifiers: 
    
    ${selectedWords.join(", ")}.
    
    Return the list of intensified words in the same order as the original words, in the format:
    
    ['intensified string 1', 'intensified string 2', 'intensified string 3', ...].`;

    const nonsensifyPrompt = 
    `Give me a JavaScript array of ${selectedWords.length} nonsense syllables that represent the following words:
    
    ${selectedWords.join(", ")}
    
    Return the nonsense in the same order as the words. It should be complete gobbledygook. Your complete response should be in the format below, enclosed by ::: - triple colons.
    
    :::
    ['emoji1', 'emoji2', 'emoji3', ...]
    :::
    
    Do not include anything else in your response, please.`;

    useEffect(() => {
      setSelectedWords(getSelectedWords(stanza));
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
   
    const handlePromptClick = async (e, thePrompt, mode) => {
      e.preventDefault();
      setLoading(true);
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          prompt: thePrompt,
        }),
      });
      const data = await response.json()
      console.log(data.join(""));
      if (mode === 'emoji') {
        setRawEmojiOutput(data.join(""));
      }
      if (mode === 'intensify') {
        setRawIntensifyOutput(data.join(""));
      }
      if (mode === 'nonsensify') {
        setRawNonsensifyOutput(data.join(""));
      }
      setLoading(false);
    };

    const processLlmOutput = (text) => {
      if (text.includes('[') === false || text.includes(']') === false) {
        return 'error';
      } else {
        const words = text.split('[')[1].split(']')[0].split(',');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].replace(/"/g, "").replace(/'/g, "").trim();
        }
        return words;
      }
  }

    const onClickEmojify = (e) => {
      handlePromptClick(e, emojiPrompt, 'emoji');
    }

    const onClickIntensify = (e) => {
      handlePromptClick(e, intensifyPrompt, 'intensify');
    }

    const onClickNonsensify = (e) => {
      handlePromptClick(e, nonsensifyPrompt, 'nonsensify');
    }

    useEffect(() => {
      if (typeof rawEmojiOutput === 'string' && rawEmojiOutput !== '') {
          let treatedOutput = processLlmOutput(rawEmojiOutput);
          if (typeof treatedOutput === "object") {
              onUpdate(getNewStanzaReplace(treatedOutput), stanza)
          } else {
              console.log('ERROR' + treatedOutput)
          }
      }
    }, [rawEmojiOutput])

    useEffect(() => {
      if (typeof rawIntensifyOutput === 'string' && rawIntensifyOutput !== '') {
          let treatedOutput = processLlmOutput(rawIntensifyOutput);
          if (typeof treatedOutput === "object") {
              onUpdate(getNewStanzaAddBefore(treatedOutput), stanza)
          } else {
              console.log('ERROR' + treatedOutput)
          }
      }
    }, [rawIntensifyOutput])

    useEffect(() => {
      if (typeof rawNonsensifyOutput === 'string' && rawNonsensifyOutput !== '') {
          let treatedOutput = processLlmOutput(rawNonsensifyOutput);
          if (typeof treatedOutput === "object") {
              onUpdate(getNewStanzaReplace(treatedOutput), stanza)
          } else {
              console.log('ERROR' + treatedOutput)
          }
      }
    }, [rawNonsensifyOutput])

    const getNewStanzaReplace = (treatedOutput) => {
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

    const getNewStanzaAddBefore = (treatedOutput) => {
      let newArray = [];
      let replacementCount = 0;
      for (let i = 0; i < stanza.length; i++) {
        if (stanza[i].selected) {
          newArray.push({id: stanza.length + replacementCount + 1, type: 'text', text: treatedOutput[replacementCount], selected: false})
          newArray.push(stanza[i]);
        } else {
          newArray.push(stanza[i]);
        }
      }
      return newArray;
  }

    return (
        <div className={classes.llmContainer}>
            <div className={classes.buttonsContainer}>
                <button className={classes.button} onClick={(e) => onClickEmojify(e)}>EMOJIFY</button>
                <button className={classes.button} onClick={(e) => onClickIntensify(e)}>INTENSIFY</button>
                <button className={classes.button} onClick={(e) => onClickNonsensify(e)}>NONSENSIFY</button>
            </div>
            <div className={classes.promptContainer}>
                <label htmlFor="llm-prompt">global remix:</label>
                <input className={classes.textInput} value={promptValue} onChange={(e) => handleChange(e)} type="text"  />
                <button className={classes.button} onClick={handlePromptClick}>GO</button>
            </div>
            <div>
        </div>
        </div>
    )
}

export default LLMFX;