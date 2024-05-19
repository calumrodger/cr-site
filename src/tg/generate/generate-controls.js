import classes from './generate-controls.module.scss';
import { useState } from 'react';
import { syllable } from 'syllable';

const GenerateControls = (props) => {

    const { nLevel, onSetNLevel, formStyle, onSetFormStyle, treatString, onClickShowSrc, genType, onSetGenType, onUpdate , form, string, padToShow, getStress } = props;
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
            if (genType === 'stanza' && nLevel === "-1") {
                onUpdate(formatPoem(getOriginalPoemSyllable(string, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (genType === 'line' && nLevel === "-1") {
                onUpdate(formatPoem(getRandomLinePoemSyllable(string, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (nLevel === "0") {
                onUpdate(formatPoem(getRandomWordPoemSyllable(string, getFormArraySansBreaks(currentForm)), currentForm));
            }
        }
        if (formStyle === 'stress') {
            if (genType === 'stanza' && nLevel === "-1") {
                onUpdate(formatPoem(getOriginalPoemStress(string, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (genType === 'line' && nLevel === "-1") {
                onUpdate(formatPoem(getRandomLinePoemStress(string, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (nLevel === "0") {
                onUpdate(formatPoem(getRandomWordPoemStress(string, getFormArraySansBreaks(currentForm)), currentForm));
            }
        }
 
    }

    
    const onChangeForm = (e) => {
        setCurrentForm(e.target.value)
    }

    const srcText = padToShow !== 'input' ? 'SHOW SRC' : 'HIDE SRC';
    const buttonText = formStyle === 'syllable' ? 'Switch to Stress' : 'Switch to Syllable';

    const [reseedCheckbox, setReseedCheckbox] = useState('stanza');
    const [formStyleCheckbox, setFormStyleCheckbox] = useState('syllable');

    const onChangeReseedCheckbox = (e) => {
        setReseedCheckbox(e);
        onSetGenType(e);
    }

    const onChangeFormStyleCheckbox = (e) => {
        setFormStyleCheckbox(e);
        onSetFormStyle();
    }

    const onChangeNLevelSlider = (e) => {
        onSetNLevel(e.target.value);
    }

    return (
        <div className={classes.generatorGrid}>
            <div className={classes.showSrcButton}>
                <button onClick={onClickShowSrc} className={classes.button}>{srcText}</button>
            </div>
            <div className={classes.nLevelSlider}>
                <label htmlFor="n-level-slider">n-level: {nLevel === "-1" ? 'OFF' : nLevel}</label>
                <input type="range" id="n-level-slider" name="n-level-slider" min="-1" max="0" step="1" value={nLevel} onChange={onChangeNLevelSlider}></input>
            </div>
            <div className={classes.genButtons}>
                <button className={classes.button} onClick={onFormSubmit}>GENERATE NEW</button>
                <button className={classes.button} onClick={onFormSubmit}>GENERATE SELECTED</button>
            </div>
            <div className={classes.formInput}>
                <label htmlFor="form">Form:</label>
                <input type="text" id="form" name="form" value={currentForm} onChange={onChangeForm}></input>
            </div>
            <div className={classes.formStyleToggle}>
                <span>Measure:</span>
                <div>
                <input type="radio" id="form-style" name="form-style" value="syllable" checked={formStyleCheckbox === 'syllable'} onChange={() => onChangeFormStyleCheckbox('syllable')} />
                <label htmlFor="syllable">syllable</label>
                </div>
                <div>
                <input type="radio" id="form-style" name="form-style" value="stress" checked={formStyleCheckbox === 'stress'} onChange={() => onChangeFormStyleCheckbox('stress')} />
                <label htmlFor="stress">stress</label>
                </div>
            </div>
            <div className={classes.reseedToggle}>
                <span>Reseed by:</span>
                <div>
                    <input type="radio" id="reseed" name="reseed" value="stanza" checked={reseedCheckbox === 'stanza'} onChange={() => onChangeReseedCheckbox('stanza')} />
                    <label htmlFor="stanza">stanza</label>
                </div>
                <div>
                    <input type="radio" id="reseed" name="reseed" value="line" checked={reseedCheckbox === 'line'} onChange={() => onChangeReseedCheckbox('line')} />
                    <label htmlFor="line">line</label>
                </div>
            </div>
        </div>
    )

}

export default GenerateControls;