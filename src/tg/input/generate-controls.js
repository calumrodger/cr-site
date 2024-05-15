import classes from './input.module.scss'

import { useState } from 'react';
import { syllable } from 'syllable';

const GenerateControls = (props) => {

    const { formStyle, treatString, onClickShowSrc, genType, onSetGenType, onUpdate , form, string, padToShow, getStress } = props;
    const [currentForm, setCurrentForm] = useState(form);
    
    const getFormArray = (form) => {
        const splitForm = form.split('/').map((item) => parseInt(item));
        for (let i = 0; i < splitForm.length; i++) {
            if (isNaN(splitForm[i])) {
                splitForm[i] = '/';
            }
        }
        return splitForm
    }

    const getFormArraySansBreaks = (form) => { 
        let newForm = getFormArray(form);
        return newForm.filter((item) => item !== '/');
    }
    

    //DEP: npm i syllable
    //PARAMS: demoString - string of any length (longer is better)
    //FORM: array of numbers, each number is the number of syllables in a line
    //INDEX: starting index to check string on
    //RETURNS array of two elements, first is the line, second is the index to start from next time
    const getOriginalLineWithIndexSyllable = (text, form, index) => {
        const treatedText = text.replace(/(?:\r\n|\r|\n)/g, ' ');
        const stringArray = treatedText.split(' ');
        let startPosition = stringArray[index];
        let line = startPosition;
        let newIndex = index + 1;
        while (syllable(line) < form) {
            line = line + ' ' + stringArray[newIndex];
            newIndex++;
        }
        if (syllable(line) > form) {
            return [null, newIndex];
        }
        if (syllable(line) === form) {
            return [line, newIndex];
        }
    }

    const getOriginalLineSyllable = (text, form) => {
        let line = '';
        const treatedText = text.replace(/(?:\r\n|\r|\n)/g, ' ');
        const stringArray = treatedText.split(' ');
        let currentIndex = Math.floor(Math.random() * stringArray.length);
        let startPosition = stringArray[currentIndex];
        line = startPosition;
        let newIndex = currentIndex + 1;
        while (syllable(line) !== form) {
            if (syllable(line) < form) {
                line = line + ' ' + stringArray[newIndex];
                newIndex++
            }
            if (syllable(line) > form) {
                line = '';
                newIndex = Math.floor(Math.random() * stringArray.length);
            }
        }
        return line;
    }

    
    const getRandomLineSyllable = (text, form) => {
        let line = '';
        const treatedText = text.replace(/(?:\r\n|\r|\n)/g, ' ');
        const stringArray = treatedText.split(' ');
        line = stringArray[Math.floor(Math.random() * stringArray.length)];
        while (syllable(line) !== form) {
            if (syllable(line) < form) {
                line = line + ' ' + stringArray[Math.floor(Math.random() * stringArray.length)];
            }
            if (syllable(line) > form) {
                line = '';
            }
        }
        return line;
    }

    const getOriginalLineWithIndexStress = (text, form, index) => {
        const treatedText = text.replace(/(?:\r\n|\r|\n)/g, ' ');
        const stringArray = treatedText.split(' ');
        let startPosition = stringArray[index];
        let line = startPosition;
        let newIndex = index + 1;
        while (getStress(line) < form) {
            console.log(line)
            line = line + ' ' + stringArray[newIndex];
            newIndex++;
        }
        if (getStress(line) > form) {
            return ['', newIndex];
        }
        if (getStress(line) === form) {
            return [line, newIndex];
        }
    }

    const getOriginalLineStress = (text, form) => {
        let line = '';
        const treatedText = text.replace(/(?:\r\n|\r|\n)/g, ' ');
        const stringArray = treatedText.split(' ');
        let currentIndex = Math.floor(Math.random() * stringArray.length);
        let startPosition = stringArray[currentIndex];
        line = startPosition;
        let newIndex = currentIndex + 1;
        while (getStress(line) !== form) {
            if (getStress(line) < form) {
                line = line + ' ' + stringArray[newIndex];
                newIndex++
            }
            if (getStress(line) > form) {
                line = '';
                newIndex = Math.floor(Math.random() * stringArray.length);
            }
        }
        return line;
    }

    
    const getRandomLineStress = (text, form) => {
        let line = '';
        const treatedText = text.replace(/(?:\r\n|\r|\n)/g, ' ');
        const stringArray = treatedText.split(' ');
        line = stringArray[Math.floor(Math.random() * stringArray.length)];
        while (getStress(line) !== form) {
            if (getStress(line) < form) {
                line = line + ' ' + stringArray[Math.floor(Math.random() * stringArray.length)];
            }
            if (getStress(line) > form) {
                line = '';
            }
        }
        return line;
    }

    const getOriginalPoemSyllable = (text, form) => {
        let poem = [];
        let currentIndex = Math.floor(Math.random() * text.length);
        let globalCount = 0;
        for (let i = 0; i < form.length; i++) {
            if (globalCount > 10000) {
                alert("no poem found - try a bigger string or a different form");
                return [];
            }
        let line = getOriginalLineWithIndexSyllable(text, form[i], currentIndex);
        if (line[0] === null) {
            i = -1;
            poem = [];
            globalCount++;
            currentIndex = Math.floor(Math.random() * text.length);
        } else {
            poem.push(line[0]);
            currentIndex = line[1];
        }
        }
        return poem;
    }

    const getRandomWordPoemSyllable = (text, form) => {
        let poem = [];
        for (let i = 0; i < form.length; i++) {
            let line = getRandomLineSyllable(text, form[i]);
            poem.push(line);
        }
        return poem;
    }

    const getRandomLinePoemSyllable = (text, form) => {
        let poem = [];
        for (let i = 0; i < form.length; i++) {
            let line = getOriginalLineSyllable(text, form[i]);
            poem.push(line);
        }
        return poem;
    }

    const getOriginalPoemStress = (text, form) => {
        let poem = [];
        let currentIndex = Math.floor(Math.random() * text.length);
        let globalCount = 0;
        for (let i = 0; i < form.length; i++) {
            if (globalCount > 10000) {
                alert("no poem found - try a bigger string or a different form");
                return [];
            }
        let line = getOriginalLineWithIndexStress(text, form[i], currentIndex);
        if (!line || !line[0]) {
            i = -1;
            poem = [];
            globalCount++;
            currentIndex = Math.floor(Math.random() * text.length);
        } else {
            poem.push(line[0]);
            currentIndex = line[1];
        }
        }
        return poem;
    }

    
    const getRandomWordPoemStress = (text, form) => {
        let poem = [];
        for (let i = 0; i < form.length; i++) {
            let line = getRandomLineStress(text, form[i]);
            poem.push(line);
        }
        return poem;
    }

    const getRandomLinePoemStress = (text, form) => {
        let poem = [];
        for (let i = 0; i < form.length; i++) {
            let line = getOriginalLineStress(text, form[i]);
            poem.push(line);
        }
        return poem;
    }




    const formatPoem = (poem, form) => {

        const formArray = getFormArray(form);

        for (let i = 0; i < formArray.length; i++) {
            if (formArray[i] === '/') {
                poem.splice(i, 0, '\n');
            }
        }
            const formattedPoem = poem.map((item) => {
              return item + ' \n'
            }).join(' ');

            const theThing = treatString(formattedPoem)
            return theThing;
    }

    
    const onFormSubmit = () => {
        if (formStyle === 'syllable') {
            if (genType === 'original') {
                onUpdate(formatPoem(getOriginalPoemSyllable(string, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (genType === 'random-line') {
                onUpdate(formatPoem(getRandomLinePoemSyllable(string, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (genType === 'random-word') {
                onUpdate(formatPoem(getRandomWordPoemSyllable(string, getFormArraySansBreaks(currentForm)), currentForm));
            }
        }
        if (formStyle === 'stress') {
            console.log('fire')
            if (genType === 'original') {
                onUpdate(formatPoem(getOriginalPoemStress(string, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (genType === 'random-line') {
                onUpdate(formatPoem(getRandomLinePoemStress(string, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (genType === 'random-word') {
                console.log(getRandomWordPoemStress(string, getFormArraySansBreaks(currentForm)))
                onUpdate(formatPoem(getRandomWordPoemStress(string, getFormArraySansBreaks(currentForm)), currentForm));
            }
        }
 
    }

    
    const onChangeForm = (e) => {
        setCurrentForm(e.target.value)
    }

    const srcText = padToShow !== 'input' ? 'SHOW SRC' : 'HIDE SRC';

    return (
        <>
        <div className={classes.checkboxContainer}>
            <button className={`${classes.button} ${genType === 'original' ? classes.selected : null}`} value="original" onClick={onSetGenType}>Original Sequence</button>
            <button className={`${classes.button} ${genType === 'random-line' ? classes.selected : null}`} value="random-line" onClick={onSetGenType}>Random by line</button>
            <button className={`${classes.button} ${genType === 'random-word' ? classes.selected : null}`} value="random-word" onClick={onSetGenType}>Random by word</button>
        </div>
        <label htmlFor="form">Form:</label>
        <input type="text" id="form" name="form" value={currentForm} onChange={onChangeForm}></input>
        <button onClick={onClickShowSrc} className={classes.button}>{srcText}</button>
        <button className={classes.button} onClick={onFormSubmit}>GENERATE!</button>
        </>
    )

}

export default GenerateControls;