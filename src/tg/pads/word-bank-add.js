import classes from './pads.module.scss';
import { useState } from 'react';

const WordBankAdd = (props) => {

    const {onOpenWordBankAdd, onAddWordBankEdit} = props;

    const [name, setName] = useState('');
    const [words, setWords] = useState([]);
    console.log(words)

    const onSaveWordBankEdit = () => {
        onAddWordBankEdit(name, words);
        onOpenWordBankAdd();
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeWords = (e) => {
        setWords(e.target.value.split(', '));
    }

    return (
        <>
        <input type="text" value={name} onChange={onChangeName}/>
        <textarea value={words.map((word, i) => i === 0 ? word : ' ' + word)} onChange={onChangeWords}/>
        <button className={classes.button} onClick={onSaveWordBankEdit}>SAVE</button>
        </>
    )
}

export default WordBankAdd;