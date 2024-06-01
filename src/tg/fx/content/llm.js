import classes from '../../tg-styles.module.scss';
import { useEffect, useState } from 'react';

const LLMFX = (props) => {

    const { stanza, onUpdate, onSetStatusMessage, treatString } = props;

    const [promptValue, setPromptValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedWords, setSelectedWords] = useState([]);
    const [rawEmojiOutput, setRawEmojiOutput] = useState('');
    const [rawIntensifyOutput, setRawIntensifyOutput] = useState('');
    const [rawNonsensifyOutput, setRawNonsensifyOutput] = useState('');
    const [rawRemixOutput, setRawRemixOutput] = useState('');
    const [stanzaAsString, setStanzaAsString] = useState('');

    useEffect(() => {
      if (loading === true) {
        onSetStatusMessage('awaiting LLM response...');
      } else {
        onSetStatusMessage('all systems good');
      }
    }, [loading])

    useEffect(() => {
      let stanzaString = stanza.map((word) => word.text).join(" ");
      setStanzaAsString(stanzaString);
    }, [stanza])
 

    const emojiPrompt = 
    `Give me a JavaScript array of ${selectedWords.length} emojis that represent the following words:
    
    ${selectedWords.join(", ")}
    
    Return the list of emojis in the same order as the words. Your complete response should be in the format below, enclosed by ::: - triple colons.
    
    :::
    ['emoji1', 'emoji2', 'emoji3', ...]
    :::
    
    Do not include anything else in your response.`

    const intensifyPrompt = 
    `For each of the following words, please add two or more intensifiers: 
    
    ${selectedWords.join(", ")}.
    
    Return the intensifiers in the same order as the original words, in the format of a JavaScript array:
    
    ['intensified string 1', 'intensified string 2', 'intensified string 3', ...].
    
    Do not give any additional information in your response, please.`;

    const nonsensifyPrompt = 
    `Give me a JavaScript array of ${selectedWords.length} nonsense syllables that represent the following words:
    
    ${selectedWords.join(", ")}
    
    Return the nonsense in the same order as the words. It should be complete gobbledygook. Your complete response should be in the format below, enclosed by ::: - triple colons.
    
    :::
    ['emoji1', 'emoji2', 'emoji3', ...]
    :::
    
    Do not include anything else in your response, please.`;

    const remixPrompt = 
    `Rewrite the text below in the triple quotes ("""). Rewrite it in the style of ${promptValue}.

    """${stanzaAsString}"""
    
    Keep the line breaks as close to the original as possible. Give me the poem with triple quotes either side e.g.
    
    """first line of the poem\nsecond line of the poem\nthird line of the poem\nfourth line of the poem\nfifth line of the poem\nsixth line of the poem\nseventh line of the poem\n"""
    `

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

    const handleRemixClick = async (e) => {
      e.preventDefault();
      setLoading(true);
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          prompt: remixPrompt,
        }),
      });
      const data = await response.json()
      console.log(data.join(""));
      setRawRemixOutput(data.join(""));
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

    const testText = 
    `"""Oh ho ho! The hours zoomed by, 
like runaway balloons in a circus sky! 
Clutched tight, just like a clown's 
favorite rubber chicken, by 
greedy little hands, oh my! 
So, the faces on the clock 
are all smiles, and the hands 
are waving goodbye, as we 
spin around in a whirlwind 
of joy and laughter, ha ha ha! 
"""`
    const processRemixOutput = (text) => {
      let firstIndex = text.search('"""');
      let startPoint = firstIndex + 3;
      let topTrimmed = text.slice(startPoint);
      let lastIndex = topTrimmed.search('"""');
      let endPoint = topTrimmed.substring(0, lastIndex);
      return endPoint;
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

    useEffect(() => {
      if (rawRemixOutput !== '') {
          let treatedOutput = processRemixOutput(rawRemixOutput);
          onUpdate(treatString(treatedOutput), stanza)
      }
    }, [rawRemixOutput])

    const getNewStanzaReplace = (treatedOutput) => {
        let newArray = stanza.map((word) => {
            if (word.selected) {
                return { id: word.id, type: "text", style: word?.style, text: null, selected: true }
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
          let replacements = treatedOutput[replacementCount]?.split(' ');
          if (replacements) {
            for (let j = 0; j < replacements.length; j++) {
            newArray.push({id: stanza.length + replacementCount + 1, type: 'text', text: replacements[j], selected: true})
            newArray.push(stanza[i]);
            replacementCount++;
            }
          } else {
            onSetStatusMessage('error: no replacements found')
          }
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
                <button className={classes.button} onClick={handleRemixClick}>GO</button>
            </div>
            <div>
        </div>
        </div>
    )
}

export default LLMFX;