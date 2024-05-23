import classes from '../tg-styles.module.scss';
import { useState } from 'react';

const WordBankAdd = (props) => {

    const {onOpenWordBankAdd, onAddWordBankEdit} = props;

    const [name, setName] = useState('');
    const [words, setWords] = useState([]);
    const [initialValue, setInitialValue] = useState('');

    const onSaveWordBankEdit = () => {
        onAddWordBankEdit(name, words);
        onOpenWordBankAdd();
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeWords = (e) => {
        setInitialValue(e.target.value);
        setWords(e.target.value.split(','))
    }

    return (
        <>
        <input type="text" value={name} onChange={onChangeName}/>
        <textarea value={initialValue} onChange={onChangeWords}/>
        <button className={classes.button} onClick={onSaveWordBankEdit}>SAVE</button>
        </>
    )
}

export default WordBankAdd;