import classes from '../pads.module.scss';
import { useState } from 'react';

const PopulateWordBank = (props) => {

    const {onPopulateWordBank, onOpenWordBankEdit, onOpenWordBankAdd, allWordLists, selectedWordList, onSetSelectedWordList} = props;

    const [quant, setQuant] = useState(10);
    const [currentWordList, setCurrentWordList] = useState(selectedWordList.name);

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

    return (
        <div className={classes.populateContainer}>
            <button className={`${classes.button} ${classes.populateButton}`} onClick={onClickPopulate}>POPULATE</button>
            <div className={classes.settingsContainer}>
            <div className={classes.srcInput}>
                <label htmlFor="populate-source">src:</label>
                <select value={currentWordList} name="populate-source" id="populate-source" onChange={handleSelectChange}>
                    {allWordLists.map((list, i) => {
                        return (
                            <option key={i} value={list.name}>{list.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className={classes.extraSettingsContainer}>
                <div className={classes.numberInput}>
                    <label htmlFor="populate-quant">#:</label>
                    <input type="number" id="populate-quant" name="populate-quant" onChange={onChangeQuant} value={quant}/>
                </div>
                <button className={`${classes.button}`} onClick={onClickAddWordBank}>new</button>
                <button className={`${classes.button}`} onClick={onClickEditWordBank}>edit</button>
                </div>
            </div>
        </div>
    )
}

export default PopulateWordBank;