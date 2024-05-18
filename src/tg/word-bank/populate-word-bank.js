import classes from '../pads.module.scss';
import { useState } from 'react';

const PopulateWordBank = (props) => {

    const {onPopulateWordBank, onOpenWordBankEdit, onOpenWordBankAdd, allWordLists, selectedWordList, onSetSelectedWordList} = props;

    const [quant, setQuant] = useState(10);

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
    }

    const onClickPopulate = () => {
        onPopulateWordBank(selectedWordList.words, quant);
    }

    const handleSelectChange = (e) => {
        const selectedList = allWordLists.find(list => list.name === e.target.value);
        onSetSelectedWordList(selectedList);
    }

    const onClickAddWordBank = () => {
        onOpenWordBankAdd();
    }

    const onClickEditWordBank = () => {
        onOpenWordBankEdit();
    }

    return (
        <div className={classes.populateContainer}>
            <label htmlFor="populate-quant">#:</label>
            <input type="number" id="populate-quant" name="populate-quant" onChange={onChangeQuant} value={quant}/>
            <label htmlFor="populate-source">src:</label>
            <select name="populate-source" id="populate-source" onChange={handleSelectChange}>
                {allWordLists.map((list, i) => {
                    return (
                        <option key={i} value={list.name}>{list.name}</option>
                    )
                })}
            </select>
            <button className={`${classes.button}`} onClick={onClickAddWordBank}>ADD</button>
            <button className={`${classes.button}`} onClick={onClickEditWordBank}>EDIT</button>
            <button className={`${classes.button}`} onClick={onClickPopulate}>POPULATE</button>
        </div>
    )
}

export default PopulateWordBank;