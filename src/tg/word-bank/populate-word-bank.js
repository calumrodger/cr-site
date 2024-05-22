import classes from '../pads.module.scss';
import { useState } from 'react';

const PopulateWordBank = (props) => {

    const {onPopulateWordBank, onOpenWordBankEdit, onOpenWordBankAdd, allWordLists, selectedWordList, onSetSelectedWordList} = props;

    const [quant, setQuant] = useState(10);
    const [currentWordList, setCurrentWordList] = useState(selectedWordList.name);
    const [populateType, setPopulateType] = useState('list');

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
    }

    const onClickPopulate = () => {
        onPopulateWordBank(selectedWordList.words, quant);
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
        console.log(populateType)
    }

    return (
        <div className={classes.populateContainer}>
            <button className={`${classes.button} ${classes.populateButton}`} onClick={onClickPopulate}>POPULATE</button>
            <div className={classes.settingsContainer}>
            <div className={classes.extraSettingsContainer}>
                <div className={classes.numberInput}>
                    <label htmlFor="populate-quant">#: </label>
                    <input type="number" id="populate-quant" name="populate-quant" onChange={onChangeQuant} value={quant}/>
                </div>
                <button className={`${classes.button}`} onClick={onClickAddWordBank}>new list</button>
                <button className={`${classes.button}`} onClick={onClickEditWordBank}>edit list</button>
            </div>
            <div className={classes.srcInput}>
            <input type="radio" id="list" name="list" value="list" readOnly checked={populateType === 'list'} onClick={(e) => onSetPopulateType(e.target.value)}/>
                <label htmlFor="populate-source">list: </label>
                <select value={currentWordList} name="populate-source" id="populate-source" onChange={handleSelectChange}>
                    {allWordLists.map((list, i) => {
                        return (
                            <option key={i} value={list.name}>{list.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className={classes.promptInput}>
                <input type="radio" id="ai" name="ai" value="ai" readOnly checked={populateType === 'ai'} onClick={(e) => onSetPopulateType(e.target.value)}/>
                <label htmlFor="populate-prompt">llm: </label>
                <input type="text" id="populate-prompt" name="populate-prompt"/>
            </div>
            
            </div>
        </div>
    )
}

export default PopulateWordBank;