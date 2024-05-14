import classes from './pads.module.scss';
import { useState } from 'react';

const PopulateWordBank = (props) => {

    const {onPopulateWordBank} = props;

    const [quant, setQuant] = useState(10);

    const onChangeQuant = (e) => {
        setQuant(e.target.value);
    }

    const demoArrayOfArrays = [{name: 'basically-empty', words: ['only']}, {name: 'basic1', words: ['hello', 'world', 'hi', 'bye', 'eat', 'fish', 'go', 'bum', 'deal', 'gimp', 'legend', 'fruit', 'potion', 'belt', 'mane', 'transcend', 'glimpse', 'fisherman', 'spoke', 'gun', 'easy', 'fourteen', 'blend']}];

    const [allWordLists, setAllWordLists] = useState(demoArrayOfArrays);
    const [selectedWordList, setSelectedWordList] = useState(allWordLists[0]);

    const onClickPopulate = () => {
        onPopulateWordBank(selectedWordList.words, quant);
    }

    const handleSelectChange = (e) => {
        console.log(e.target.value);
        const selectedList = allWordLists.find(list => list.name === e.target.value);
        setSelectedWordList(selectedList);
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
            <button className={`${classes.button}`} onClick={onClickPopulate}>POPULATE</button>
        </div>
    )
}

export default PopulateWordBank;