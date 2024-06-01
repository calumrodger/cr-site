import classes from '../tg-styles.module.scss';
import { useState } from 'react';
import { syllable } from 'syllable';
import OnSaveStanzaToPad from '@tg/stanza-pad/save-stanza-to-pad';

const GenerateControls = (props) => {

    const { onSetStatusMessage, editExistingStanzaMode, onSaveStanzaToPad, onUpdateStanzaToPad, onSelectPreset, currentPreset, presetArray, nLevel, onSetNLevel, formStyle, onSetFormStyle, treatString, onClickShowSrc, genType, onSetGenType, onUpdate , form, padToShow, getStress } = props;
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
        // remove line breaks
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
        // remove line breaks
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
            return [null, newIndex];
        }
        if (getStress(line) === form) {
            return [line, newIndex];
        }
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

    const getOriginalLineStress = (text, form) => {
        let line = '';
        const treatedText = text.replace(/(?:\r\n|\r|\n)/g, ' ');
        const stringArray = treatedText.split(' ');
        let currentIndex = Math.floor(Math.random() * stringArray.length);
        let startPosition = stringArray[currentIndex];
        line = startPosition;
        let newIndex = currentIndex + 1;
        while (getStress(line) !== form) {
            if (stringArray[newIndex].trim() === '') {
                newIndex = Math.floor(Math.random() * stringArray.length);
            }
            if (getStress(line) < form) {
                console.log(stringArray[newIndex + 1])
                line = line + ' ' + stringArray[newIndex];
                newIndex++
            }
            if (getStress(line) > form) {
                line = '';
                newIndex = Math.floor(Math.random() * stringArray.length);
                console.log('no text')
            }
        }
        console.log(line)
        return line;
    }

    const getOriginalPoemStress = (text, form) => {
        let formSum = form.reduce((a, b) => a + b, 0);
        let poem = [];
        let currentIndex = Math.floor(Math.random() * text.length);
        let globalCount = 0;
        // for (let i = 0; i < form.length; i++) {
            if (globalCount === text.split(' ').length) {
                onSetStatusMessage("no poem found - try a bigger string or a different form");
                return [];
            }
        let line = getOriginalLineStress(text, formSum);
        console.log(line)
        const textArrayUntreated = line.split(' ');
        const stressArray = line.split(' ').map((item) => getStress(item));
        const textArray = textArrayUntreated.filter((item) => item !== '');
        console.log(textArray)
        console.log(stressArray)
        let position = 0;
        for (let i = 0; i < form.length; i++) {
            let lineStress = 0;
            let newLine = []; 
            for (let j = 0; lineStress < form[i];) {
                lineStress += stressArray[j];
                newLine.push(textArray[position]);
                j++;
                position = position + stressArray[j]
            }
            poem.push(newLine.join(' '));
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
            if (genType === 'stanza' && nLevel === "10") {
                onUpdate(formatPoem(getOriginalPoemSyllable(currentPreset.text, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (genType === 'line' && nLevel === "10") {
                onUpdate(formatPoem(getRandomLinePoemSyllable(currentPreset.text, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (nLevel === "0") {
                onUpdate(formatPoem(getRandomWordPoemSyllable(currentPreset.text, getFormArraySansBreaks(currentForm)), currentForm));
            }
        }
        if (formStyle === 'stress') {
            if (genType === 'stanza' && nLevel === "10") {
                onUpdate(formatPoem(getOriginalPoemStress(currentPreset.text, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (genType === 'line' && nLevel === "10") {
                onUpdate(formatPoem(getRandomLinePoemStress(currentPreset.text, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (nLevel === "0") {
                onUpdate(formatPoem(getRandomWordPoemStress(currentPreset.text, getFormArraySansBreaks(currentForm)), currentForm));
            }
        }
 
    }

    
    const onChangeForm = (e) => {
        setCurrentForm(e.target.value)
    }

    // const srcText = padToShow !== 'input' ? 'SHOW SRC' : 'HIDE SRC';
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
                
                <button onClick={onClickShowSrc} className={`${classes.button} ${classes.srcPadButton}`}>SOURCE PAD</button>
            </div>
            <div className={classes.preset}>
                    <span>preset: </span>
                    <select name="presets" id="presets" defaultValue={currentPreset.name} onChange={(e) => onSelectPreset(presets.value)} placeholder="Select a preset...">
                            { presetArray.map((p, i) => {
                            return <option key={i} onClick={() => setSelectedPreset(p)}>{p.name}</option>
                        })}
                    </select>
                </div>
            <div className={classes.nLevelSlider}>
                <label htmlFor="n-level-slider">n-level: <span>{nLevel === "10" ? 'OFF' : nLevel}</span></label>
                <input className={classes.slider} type="range" id="n-level-slider" name="n-level-slider" min="0" max="10" step="1" value={nLevel} onChange={onChangeNLevelSlider}></input>
            </div>
            <div className={classes.genButtons}>
                <button className={classes.button} onClick={onFormSubmit}>GENERATE</button>
            </div>
            <div className={classes.formInput}>
                <label htmlFor="form">form:</label>
                <input type="text" id="form" name="form" value={currentForm} onChange={onChangeForm}></input>
            </div>
            <div className={classes.saveStanzaButton}>
                <OnSaveStanzaToPad editExistingStanzaMode={editExistingStanzaMode} onSaveStanzaToPad={onSaveStanzaToPad} onUpdateStanzaToPad={onUpdateStanzaToPad}/> 
            </div>
            <div className={classes.formStyleToggle}>
                <span>measure:</span>
                <div className={classes.toggleButtonsContainer}>
                    <div>
                        <input className={`${classes.radioInput} ${formStyle === 'syllable' ? classes.selected : null}`} type="radio" id="form-style" name="form-style" value="syllable" checked={formStyleCheckbox === 'syllable'} onChange={() => onChangeFormStyleCheckbox('syllable')} />
                        <label htmlFor="syllable">syllable</label>
                    </div>
                    <div>
                        <input className={`${classes.radioInput} ${formStyle === 'stress' ? classes.selected : null}`} type="radio" id="form-style" name="form-style" value="stress" checked={formStyleCheckbox === 'stress'} onChange={() => onChangeFormStyleCheckbox('stress')} />
                        <label htmlFor="stress">stress</label>
                    </div>
                </div>
            </div>
            <div className={classes.reseedToggle}>
                <span>reseed by:</span>
                <div className={classes.toggleButtonsContainer}>
                    <div>
                        <input className={`${classes.radioInput} ${reseedCheckbox === 'stanza' ? classes.selected : null}`} type="radio" id="reseed" name="reseed" value="stanza" checked={reseedCheckbox === 'stanza'} onChange={() => onChangeReseedCheckbox('stanza')} />
                        <label htmlFor="stanza">stanza</label>
                    </div>
                    <div>
                        <input className={`${classes.radioInput} ${reseedCheckbox === 'line' ? classes.selected : null}`} type="radio" id="reseed" name="reseed" value="line" checked={reseedCheckbox === 'line'} onChange={() => onChangeReseedCheckbox('line')} />
                        <label htmlFor="line">line</label>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default GenerateControls;