import classes from '../pads.module.scss';
import { useState } from 'react';

const WordBankEdit = (props) => {

    const {onOpenWordBankEdit, selectedWordList, onUpdateWordBankEdit} = props;

    const [name, setName] = useState(selectedWordList.name);
    const [words, setWords] = useState(selectedWordList.words);
    console.log(words)

    const onSaveWordBankEdit = () => {
        onUpdateWordBankEdit(name, words);
        onOpenWordBankEdit();
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeWords = (e) => {
        setWords(e.target.value.split(','));
    }

    return (
        <>
        <input type="text" value={name} onChange={onChangeName}/>
        <textarea className={classes.editField} value={words.map((word, i) => i === 0 ? word : ' ' + word)} onChange={onChangeWords}/>
        <button className={classes.button} onClick={onSaveWordBankEdit}>SAVE</button>
        </>
    )
}

export default WordBankEdit;