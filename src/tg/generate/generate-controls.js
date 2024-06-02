import classes from '../tg-styles.module.scss';
import { useState } from 'react';
import { syllable } from 'syllable';
import { buildNGrams } from 'word-ngrams';
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

    const getOriginalPoemStress = (text, form) => {
        let currentIndex, line;
        const poem = [];
        const formArray = form.split("/").map(x => x && Number(x));
        let formIndex = 0;
        const stringArray = text.trim().split(/\s+/);
        const indexArray = [...Array(stringArray.length).keys()];
        const nextIndex = () => (currentIndex + 1) % stringArray.length;
        const initialize = () => {
            currentIndex = indexArray.splice(Math.floor(indexArray.length * Math.random()), 1)[0];
            line = stringArray[currentIndex];
        };
        initialize();
    
        while (indexArray.length > 0 && poem.length < formArray.length) {
            currentIndex = nextIndex();
            if (getStress(line) < formArray[formIndex]) {
                line = `${line} ${stringArray[currentIndex]}`;
            }
            if (getStress(line) === formArray[formIndex]) {
                poem.push(line);
                formIndex += 1;
                currentIndex = nextIndex();
                line = stringArray[currentIndex];
                while (formArray[formIndex] === "") {
                    poem.push("");
                    formIndex += 1;
                }
            }
            if (getStress(line) > formArray[formIndex]) {
                initialize();
            }
        }
        if (poem.length === 0) {
            onSetStatusMessage("no poem found - try a bigger string or a different form");
        }
        return poem;
    };

    const getOriginalPoemSyllable = (text, form) => {
        let currentIndex, line;
        const poem = [];
        const formArray = form.split("/").map(x => x && Number(x));
        let formIndex = 0;
        const stringArray = text.trim().split(/\s+/);
        const indexArray = [...Array(stringArray.length).keys()];
        console.log(indexArray.length)
        const nextIndex = () => (currentIndex + 1) % stringArray.length;
        const initialize = () => {
            currentIndex = indexArray.splice(Math.floor(indexArray.length * Math.random()), 1)[0];
            line = stringArray[currentIndex];
        };
        initialize();
    
        while (indexArray.length > 0 && poem.length < formArray.length) {
            currentIndex = nextIndex();
            if (syllable(line) < formArray[formIndex]) {
                line = `${line} ${stringArray[currentIndex]}`;
            }
            if (syllable(line) === formArray[formIndex]) {
                poem.push(line);
                formIndex += 1;
                currentIndex = nextIndex();
                line = stringArray[currentIndex];
                while (formArray[formIndex] === "") {
                    poem.push("");
                    formIndex += 1;
                }
            }
            if (syllable(line) > formArray[formIndex]) {
                initialize();
            }
        }
        if (poem.length === 0) {
            onSetStatusMessage("no poem found - try a bigger string or a different form");
        }
        return poem;
    };

    const getOriginalLineStress = (text, form) => getOriginalPoemStress(text, `${form}`)[0];
    // returns undefined if no match found

    const getOriginalLineSyllable = (text, form) => getOriginalPoemSyllable(text, `${form}`)[0];
    // returns undefined if no match found

    const getRandomNGram = (text, nGrams) => {
        const randomIndex = Math.floor(Math.random() * Object.entries(nGrams).length);
        const randomNGram = Object.entries(nGrams)[randomIndex];
        return randomNGram;
    }

    const generateNGrams = (text, nLevel) => {
        return buildNGrams(text, +nLevel, {caseSensitive: true, includePunctuation: true});
    }

    // Returns n-gram object [string, {n-gram-pivot: frequency, ...}]
    const addNGramToNGram = (nGram, nGrams, text) => {
        // console.log(nGram)
        const nGramsArray = Object.entries(nGrams);
        const nGramsLength = nGramsArray.length;
        const optionsArray = Object.entries(nGram[1]);
        const stringOptions = [];
        for (let i = 0; i < optionsArray.length; i++) {
            let numberToPush = optionsArray[i][1];
            for (let j = 0; j < numberToPush; j++) {
                stringOptions.push(optionsArray[i][0]);
            }
        }
        const stringSelection = stringOptions[Math.floor(Math.random() * stringOptions.length)];
        // console.log(stringSelection)
        if (stringSelection === "!" || stringSelection === "?" || stringSelection === "." || stringSelection === ";") {
            let newRandomNGram = getRandomNGram(text, nGrams);
            const newSentenceGramString = nGram[0] + stringSelection + ' ' + newRandomNGram[0];
            const newSentenceGramObject = [newSentenceGramString, newRandomNGram[1]];
            return newSentenceGramObject;
        }
        let newNGramOptions = [];
        for (let i = 0; i < nGramsLength; i++) {
            let stringArray = nGramsArray[i][0].split(' ');
            if (stringArray[0] === stringSelection) {
                newNGramOptions.push(nGramsArray[i]);
            }
        }
        if (newNGramOptions.length === 0) {
            let newRandomNGram = getRandomNGram(text, nGrams);
            const newSentenceGramString = nGram[0] + ' ' + stringSelection + ' ' + newRandomNGram[0];
            const newSentenceGramObject = [newSentenceGramString, newRandomNGram[1]];
            return newSentenceGramObject;
        }
        const finalGramSelection = newNGramOptions[Math.floor(Math.random() * newNGramOptions.length)];
        const newGramString = nGram[0] + ' ' + finalGramSelection[0];
        const newGramObject = [newGramString, finalGramSelection[1]];
        // console.log(newGramObject);
        return newGramObject;
    }

    const getNGramPoemStressStanza = (text, form) => {
        const nGrams = generateNGrams(text, nLevel);
        const indexArray = [...Array(Object.entries(nGrams).length).keys()];
        console.log(indexArray)
        let line, nGram, stringArray, indexToSearchNGramsOn;
        let currentIndex = 0;
        let poem = [];
        const formArray = form.split("/").map(x => x && Number(x));
        let formIndex = 0;
        let formSum = formArray.reduce((a, b) => a + b, 0);
        const nextIndex = () => (currentIndex + 1);
        const initialize = () => {;
            indexToSearchNGramsOn = indexArray.splice(Math.floor(indexArray.length * Math.random()), 1)[0];
            console.log(indexToSearchNGramsOn)
            nGram = getNGramLineStressWithIndex(text, formSum, indexToSearchNGramsOn);
            console.log(nGram[0], getStress(nGram[0]))
            stringArray = nGram[0].trim().split(/\s+/);
            console.log(stringArray)
            let indexesArray = nGram[1];
            for (let i = 0; i < indexesArray.length; i++) {
                indexArray.splice(indexArray.indexOf(indexesArray[i]), 1);
            }
            line = stringArray[0];
            currentIndex = 0;
            formIndex = 0;
            poem = [];
        };
        initialize();
    
        while ( indexArray.length > 0 &&  poem.length < formArray.length) {
            console.log(line, getStress(line), formArray[formIndex])
            currentIndex = nextIndex();
            console.log(currentIndex)
            if (getStress(line) < formArray[formIndex]) {
                line = `${line} ${stringArray[currentIndex]}`;
            }
            if (getStress(line) === formArray[formIndex]) {
                poem.push(line);
                formIndex += 1;
                currentIndex = nextIndex();
                line = stringArray[currentIndex];
                while (formArray[formIndex] === "") {
                    console.log('in this bit')
                    poem.push("");
                    formIndex += 1;
                }
            }
            if (getStress(line) > formArray[formIndex]) {
                console.log(line, getStress(line), formArray[formIndex])
                console.log('init')
                initialize();
            }
        }
        if (poem.length === 0) {
            onSetStatusMessage("no poem found - try a bigger string or a different form");
        }
        console.log(poem)
        return poem;
    };

    const getNGramLineStress = (text, form) => {
        const nGrams = generateNGrams(text, nLevel);
        const randomNGram = getRandomNGram(text, nGrams);
        let theNGram = randomNGram;
        while (getStress(theNGram[0]) < form) {
            let theNewNGram = addNGramToNGram(theNGram, nGrams);
            theNGram = theNewNGram;
        }
        // trim the excess words if poss
        while (getStress(theNGram[0]) > form) {
            let gramStringArray = theNGram[0].split(' ');
            gramStringArray.pop();
            theNGram[0] = gramStringArray.join(' ');
        }
        return theNGram[0];
    }

    const getNGramLineStressWithIndex = (text, form, index) => {
        const indexesArray = [index]
        const nGrams = generateNGrams(text, nLevel);
        const randomNGram = Object.entries(nGrams)[index];
        let theNGram = randomNGram;
        while (getStress(theNGram[0]) < form) {
            let theNewNGram = addNGramToNGramReturningIndexes(theNGram, nGrams, index);
            console.log(theNewNGram)
            theNGram = theNewNGram[0];
            for (let i = 0; i < theNewNGram[1].length; i++) {
                indexesArray.push(theNewNGram[1][i]);
            }
        }
        // trim the excess words if poss
        while (getStress(theNGram[0]) > form) {
            let gramStringArray = theNGram[0].split(' ');
            gramStringArray.pop();
            theNGram[0] = gramStringArray.join(' ');
        }
        return [theNGram[0], indexesArray];
    }

    const addNGramToNGramReturningIndexes = (nGram, nGrams, firstIndex) => {
        console.log(firstIndex)
            // console.log(nGram)
            const indexesArray = [firstIndex]
            const nGramsArray = Object.entries(nGrams);
            const nGramsLength = nGramsArray.length;
            console.log(nGram)
            const optionsArray = Object.entries(nGram[1]);
            const stringOptions = [];
            for (let i = 0; i < optionsArray.length; i++) {
                let numberToPush = optionsArray[i][1];
                for (let j = 0; j < numberToPush; j++) {
                    stringOptions.push(optionsArray[i][0]);
                }
            }
            const stringSelection = stringOptions[Math.floor(Math.random() * stringOptions.length)];
            // console.log(stringSelection)
            if (stringSelection === "!" || stringSelection === "?" || stringSelection === "." || stringSelection === ";") {
                let newRandomIndex = Math.floor(Math.random() * nGramsLength);
                let newRandomNGram = Object.entries(nGrams)[newRandomIndex];
                const newSentenceGramString = nGram[0] + stringSelection + ' ' + newRandomNGram[0];
                const newSentenceGramObject = [newSentenceGramString, newRandomNGram[1]];
                return newSentenceGramObject;
            }
            let newNGramOptions = [];
            for (let i = 0; i < nGramsLength; i++) {
                let stringArray = nGramsArray[i][0].split(' ');
                if (stringArray[0] === stringSelection) {
                    newNGramOptions.push(nGramsArray[i]);
                }
            }
            if (newNGramOptions.length === 0) {
                let newRandomIndex = Math.floor(Math.random() * nGramsLength);
                let newRandomNGram = Object.entries(nGrams)[newRandomIndex];
                indexesArray.push(newRandomIndex)
                const newSentenceGramString = nGram[0] + ' ' + stringSelection + ' ' + newRandomNGram[0];
                const newSentenceGramObject = [newSentenceGramString, newRandomNGram[1]];
                return newSentenceGramObject;
            }
            const finalGramSelection = newNGramOptions[Math.floor(Math.random() * newNGramOptions.length)];
            const newGramString = nGram[0] + ' ' + finalGramSelection[0];
            const newGramObject = [newGramString, finalGramSelection[1]];
            // console.log(newGramObject);
            return [newGramObject, indexesArray];
    }


    const getNGramLineSyllable = (text, form) => {
        const nGrams = generateNGrams(text, nLevel);
        const randomNGram = getRandomNGram(text, nGrams);
        let theNGram = randomNGram;
        while (syllable(theNGram[0]) < form) {
            let theNewNGram = addNGramToNGram(theNGram, nGrams);
            theNGram = theNewNGram;
        }
        // trim the excess if poss 
        while (syllable(theNGram[0]) > form) {
            let gramStringArray = theNGram[0].split(' ');
            gramStringArray.pop();
            theNGram[0] = gramStringArray.join(' ');
        }
        return theNGram[0];
    }

    const getNGramPoemStressLine = (text, form) => {
        let poem = [];
        for (let i = 0; i < form.length; i++) {
            let line = getNGramLineStress(text, form[i]);
            poem.push(line);
        }
        return poem;
    }

    const getNGramPoemSyllableLine = (text, form) => {
        let poem = [];
        for (let i = 0; i < form.length; i++) {
            let line = getNGramLineSyllable(text, form[i]);
            poem.push(line);
        }
        return poem;
    }

    const getNGramPoemSyllableStanza = (text, form) => {
        console.log(buildNGrams(text, nLevel, {includePunctuation: true}));
        return 'ngram syllable stanza' + nLevel;
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
                onUpdate(formatPoem(getOriginalPoemSyllable(currentPreset.text, currentForm), currentForm));
            }
            if (genType === 'line' && nLevel === "10") {
                onUpdate(formatPoem(getRandomLinePoemSyllable(currentPreset.text, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (nLevel === "1") {
                onUpdate(formatPoem(getRandomWordPoemSyllable(currentPreset.text, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (genType === 'stanza' && nLevel !== "10" && nLevel !== "1") {
                console.log(getNGramPoemSyllableStanza(currentPreset.text, getFormArraySansBreaks(currentForm)));
            }
            if (genType === 'line' && nLevel !== "10" && nLevel !== "1") {
                onUpdate(formatPoem(getNGramPoemSyllableLine(currentPreset.text, getFormArraySansBreaks(currentForm)), currentForm));
            }
        }
        if (formStyle === 'stress') {
            if (genType === 'stanza' && nLevel === "10") {
                onUpdate(formatPoem(getOriginalPoemStress(currentPreset.text, currentForm), currentForm));
            }
            if (genType === 'line' && nLevel === "10") {
                onUpdate(formatPoem(getRandomLinePoemStress(currentPreset.text, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (nLevel === "1") {
                onUpdate(formatPoem(getRandomWordPoemStress(currentPreset.text, getFormArraySansBreaks(currentForm)), currentForm));
            }
            if (genType === 'stanza' && nLevel !== "10" && nLevel !== "1") {
                onUpdate(formatPoem(getNGramPoemStressStanza(currentPreset.text, currentForm), currentForm));
            }
            if (genType === 'line' && nLevel !== "10" && nLevel !== "1") {
                onUpdate(formatPoem(getNGramPoemStressLine(currentPreset.text, getFormArraySansBreaks(currentForm)), currentForm));
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
                <input className={classes.slider} type="range" id="n-level-slider" name="n-level-slider" min="1" max="10" step="1" value={nLevel} onChange={onChangeNLevelSlider}></input>
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