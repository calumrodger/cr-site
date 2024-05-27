import classes from '../tg-styles.module.scss';
import { useState, useEffect } from 'react';

const PopulateWordBank = (props) => {

    const {onPopulateWordBank, onOpenWordBankEdit, onOpenWordBankAdd, allWordLists, selectedWordList, onSetSelectedWordList} = props;

    const [quant, setQuant] = useState(10);
    const [currentWordList, setCurrentWordList] = useState(selectedWordList.name);
    const [populateType, setPopulateType] = useState('list');
    const [loading, setLoading] = useState(false);
    const [llmOutput, setLlmOutput] = useState('');
    const [currentPrompt, setCurrentPrompt] = useState('');

    const fullPrompt = 
    `Give me a list of ${quant < 21 ? quant : 20} words that are related to ${currentPrompt}.
    
    The words should be related to ${currentPrompt} in some way, but they don't have to be synonyms.
    
    Your answer should comprise a JavaScript array of strings, like this:
    
    ['word1', 'word2', 'word3', 'word4', 'word5', 'word6', 'word7', 'word8', 'word9', 'word10']
    
    All the words should be lower case, unless they are proper nouns. Do not include anything else in your response.`;

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
    }

    const handlePromptClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch("/api/ai", {
          method: "POST",
          body: JSON.stringify({
            prompt: fullPrompt,
          }),
        });
        const data = await response.json();
        setLlmOutput(data.join(""));
        setLoading(false);
    };

    const processLlmOutput = (output) => {
        // const trimmedOutput = output.replace(/[^\w\s\']|_/g, "").trim();
        const words = output.split('[')[1].split(']')[0].split(',');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].replace(/"/g, "").replace(/'/g, "").trim();
        }
        return words;
    }

    useEffect(() => {
        if (llmOutput !== '') {
            let treatedOutput = processLlmOutput(llmOutput);
            if (typeof treatedOutput === "object") {
                onPopulateWordBank(treatedOutput, quant)
            } else {
                console.log('error')
            }
        }
    }, [llmOutput])

    const onClickPopulate = (e) => {
        if (populateType === 'list') {
        onPopulateWordBank(selectedWordList.words, quant);
        }
        if (populateType === 'ai') {
            handlePromptClick(e)
        }
    }

    const handleSelectChange = (e) => {
        setCurrentWordList(e.target.value);
        onSetSelectedWordList(e.target.value)
    }

    const onClickAddWordBank = () => {
        onOpenWordBankAdd();
    }

    const onClickEditWordBank = () => {
        onOpenWordBankEdit();
    }

    const onSetPopulateType = (type) => {
        setPopulateType(type);
    }

    const changePromptHandler = (e) => {
        setCurrentPrompt(e.target.value);
    }

    return (
        <div className={classes.populateContainer}>
            <button className={`${classes.button} ${classes.populateButton}`} onClick={(e) => onClickPopulate(e)}>POPULATE</button>
            <div className={classes.settingsContainer}>
                <div className={classes.extraSettingsContainer}>
                    <div className={classes.numberInputContainer}>
                        <label htmlFor="populate-quant">#: </label>
                        <input className={classes.numberInput} type="number" id="populate-quant" name="populate-quant" onChange={onChangeQuant} value={quant}/>
                    </div>
                    <button className={`${classes.button}`} onClick={onClickAddWordBank}>new list</button>
                    <button className={`${classes.button}`} onClick={onClickEditWordBank}>edit list</button>
                </div>
                <div className={classes.srcInput}>
                    <input className={`${classes.radioInput} ${populateType === 'list' ? classes.selected : null}`} type="radio" id="list" name="list" value="list" readOnly checked={populateType === 'list'} onClick={(e) => onSetPopulateType(e.target.value)}/>
                    <label htmlFor="populate-source">list: </label>
                    <select className={classes.select} value={currentWordList} name="populate-source" id="populate-source" onChange={handleSelectChange}>
                        {allWordLists.map((list, i) => {
                            return (
                                <option key={i} value={list.name}>{list.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className={classes.promptInput}>
                    <input className={`${classes.radioInput} ${populateType === 'ai' ? classes.selected : null}`} type="radio" id="ai" name="ai" value="ai" readOnly checked={populateType === 'ai'} onClick={(e) => onSetPopulateType(e.target.value)}/>
                    <label htmlFor="populate-prompt">llm: </label>
                    <input className={classes.textInput} type="text" id="populate-prompt" name="populate-prompt" value={currentPrompt} onChange={(e) => changePromptHandler(e)}/>
                </div>
            </div>
        </div>
    )
}

export default PopulateWordBank;