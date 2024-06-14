import classes from '../tg-styles.module.scss';
import { useState, useEffect } from 'react';
import { syllable } from 'syllable';
import { buildNGrams } from 'word-ngrams';
import OnSaveStanzaToPad from '@tg/stanza-pad/save-stanza-to-pad';
import { get } from 'http';
import StanzaUndoRedo from '@tg/stanza-pad/undo-redo-stanza';

const GenerateControls = (props) => {

    const { onUndoRedoStanza, wordEditMode, oldStanza, stanza, onSetStatusMessage, editExistingStanzaMode, onSaveStanzaToPad, onUpdateStanzaToPad, onSelectPreset, currentPreset, presetArray, nLevel, onSetNLevel, formStyle, onSetFormStyle, treatString, onClickShowSrc, genType, onSetGenType, onUpdate , form, padToShow, getStress, statusMessage } = props;
    const [currentForm, setCurrentForm] = useState('5/7/5');
    const [loading, setLoading] = useState(false);
    const [currentNGrams, setCurrentNGrams] = useState({});
    const [disableGenButton, setDisableGenButton] = useState(false);
    const [keepPunct, setKeepPunct] = useState(true);
    const [keepCase, setKeepCase] = useState(true);

    useEffect(() => {
        if (currentForm === '') {
            onSetStatusMessage('enter form to generate', 10000, 'red');
            setDisableGenButton(true);
        }
        if (currentForm !== '' && statusMessage[0] === 'enter form to generate') {
            onSetStatusMessage('all systems good', 0, 'white');
            setDisableGenButton(false);
        }
    }, [currentForm])

    useEffect(() => {
        if (nLevel !== "10" && nLevel !== "1" && disableGenButton === false) {
            setCurrentNGrams(generateNGrams(currentPreset.text, nLevel));
        }
    }, [nLevel, currentPreset, disableGenButton, keepCase, keepPunct])
    
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
        let thePoem = [];
        for (let i = 0; i < form.length; i++) {
            let line = getRandomLineSyllable(text, form[i]);
            thePoem.push(line);
        }
        if (keepCase === false) {
            thePoem = thePoem.map((item) => item.toLowerCase());
        }
        if (keepPunct === false) {
            thePoem = thePoem.map((item) => item.replace(/[.,\/#!$%\^&\*;:{}‘’“”=\-_`~?!()]/g,""));
        }
        return thePoem;
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
        let thePoem = [];
        for (let i = 0; i < form.length; i++) {
            let line = getRandomLineStress(text, form[i]);
            thePoem.push(line);
        }
        if (keepCase === false) {
            thePoem = thePoem.map((item) => item.toLowerCase());
        }
        if (keepPunct === false) {
            thePoem = thePoem.map((item) => item.replace(/[.,\/#!$%\^&\*;:{}‘’“”=\-_`~?!()]/g,""));
        }
        return thePoem;
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
        let thePoem = [];
        const formArray = form.split("/").map(x => x && Number(x)).filter((item) => item !== "");
        let formIndex = 0;
        const stringArray = text.trim().split(/\s+/);
        const indexArray = [...Array(stringArray.length).keys()];
        const nextIndex = () => (currentIndex + 1) % stringArray.length;
        const initialize = () => {
            thePoem = [];
            formIndex = 0;
            currentIndex = indexArray.splice(Math.floor(indexArray.length * Math.random()), 1)[0];
            line = stringArray[currentIndex];
        };
        initialize();
    
        while (indexArray.length > 0 && thePoem.length < formArray.length) {
            currentIndex = nextIndex();
            if (getStress(line) < formArray[formIndex]) {
                line = `${line} ${stringArray[currentIndex]}`;
            }
            if (getStress(line) === formArray[formIndex]) {
                thePoem.push(line);
                formIndex += 1;
                currentIndex = nextIndex();
                line = stringArray[currentIndex];
                // while (formArray[formIndex] === "") {
                //     thePoem.push("");
                //     formIndex += 1;
                // }
            }
            if (getStress(line) > formArray[formIndex]) {
                initialize();
            }
        }
        if (thePoem.length === 0) {
            onSetStatusMessage("no poem found - try a bigger string or a different form", 3000, 'red');
        }
        if (keepCase === false) {
            thePoem = thePoem.map((item) => item.toLowerCase());
        }
        if (keepPunct === false) {
            thePoem = thePoem.map((item) => item.replace(/[.,\/#!$%\^&\*;:{}‘’“”=\-_`~?!()]/g,""));
        }
        return thePoem;
    };

    const getOriginalPoemSyllable = (text, form) => {
        let currentIndex, line;
        let thePoem = [];
        const formArray = form.split("/").map(x => x && Number(x)).filter((item) => item !== "");
        let formIndex = 0;
        const stringArray = text.trim().split(/\s+/);
        const indexArray = [...Array(stringArray.length).keys()];
        const nextIndex = () => (currentIndex + 1) % stringArray.length;
        const initialize = () => {
            thePoem = [];
            formIndex = 0;
            currentIndex = indexArray.splice(Math.floor(indexArray.length * Math.random()), 1)[0];
            line = stringArray[currentIndex];
        };
        initialize();
    
        while (indexArray.length > 0 && thePoem.length < formArray.length) {
            currentIndex = nextIndex();
            if (syllable(line) < formArray[formIndex]) {
                line = `${line} ${stringArray[currentIndex]}`;
            }
            if (syllable(line) === formArray[formIndex]) {
                thePoem.push(line);
                formIndex += 1;
                currentIndex = nextIndex();
                line = stringArray[currentIndex];
                // while (formArray[formIndex] === "") {
                //     thePoem.push("");
                //     formIndex += 1;
                // }
            }
            if (syllable(line) > formArray[formIndex]) {
                initialize();
            }
        }
        if (thePoem.length === 0) {
            onSetStatusMessage("no poem found - try a bigger string or a different form", 3000, 'red');
        }
        if (keepCase === false) {
            thePoem = thePoem.map((item) => item.toLowerCase());
        }
        if (keepPunct === false) {
            thePoem = thePoem.map((item) => item.replace(/[.,\/#!$%\^&\*;:{}‘’“”=\-_`~?!()]/g,""));
        }
        return thePoem;
    };

    const getOriginalLineStress = (text, form) => getOriginalPoemStress(text, `${form}`)[0];
    // returns undefined if no match found

    const getOriginalLineSyllable = (text, form) => getOriginalPoemSyllable(text, `${form}`)[0];
    // returns undefined if no match found

    const getNGramLineSyllable = (text, form) => getNGramPoemSyllableStanza(text, `${form}`)[0];

    const getNGramLineStress = (text, form) => getNGramPoemStressStanza(text, `${form}`)[0];

    const getRandomNGram = (text, nGrams) => {
        const randomIndex = Math.floor(Math.random() * Object.entries(nGrams).length);
        const randomNGram = Object.entries(nGrams)[randomIndex];
        return randomNGram;
    }

    const generateNGrams = (text, currentNLevel) => {
        return buildNGrams(text, +currentNLevel, {caseSensitive: keepCase, includePunctuation: keepPunct});
    }

    const addNGramToNGramForIndex = (nGram, nGrams) => {
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
        if (stringSelection === "!" || stringSelection === "?" || stringSelection === "." || stringSelection === ";") {
            const randomIndex = Math.floor(Math.random() * Object.entries(nGrams).length);
            let newRandomNGram = Object.entries(nGrams)[randomIndex];
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
            return null;
        }
        const finalGramSelection = newNGramOptions[Math.floor(Math.random() * newNGramOptions.length)];
        const newGramString = nGram[0] + ' ' + finalGramSelection[0];
        const newGramObject = [newGramString, finalGramSelection[1]];
        return newGramObject;
    }

    const getNGramPoemSyllableStanza = (text, form) => {
        const nGrams = currentNGrams;
        const indexArray = [...Array(Object.entries(nGrams).length).keys()];
        let line, nGram, stringArray;
        let currentIndex = 0;
        let poem = [];
        const formArray = form.split("/").map(x => x && Number(x)).filter((item) => item !== "");
        let formIndex = 0;
        let formSum = formArray.reduce((a, b) => a + b, 0);
        const nextIndex = () => (currentIndex + 1);
        const initialize = () => {
            let randomIndex = indexArray.splice(Math.floor(indexArray.length * Math.random()), 1)[0];
            let randomNGram = Object.entries(nGrams)[randomIndex];
            nGram = null;
            while (nGram === null) {
                randomIndex = indexArray.splice(Math.floor(indexArray.length * Math.random()), 1)[0];
                randomNGram = Object.entries(nGrams)[randomIndex];
                nGram = getNGramLineSyllableForIndex(nGrams, formSum, randomNGram);
            }
            stringArray = nGram.trim().split(/\s+/);
            line = stringArray[0];
            currentIndex = 0;
            formIndex = 0;
            poem = [];
        };
        initialize();
    
        while ( indexArray.length > 0 &&  poem.length < formArray.length) {
            currentIndex = nextIndex();
            if (syllable(line) < formArray[formIndex]) {
                line = `${line} ${stringArray[currentIndex]}`;
            }
            if (syllable(line) === formArray[formIndex]) {
                poem.push(line);
                formIndex += 1;
                currentIndex = nextIndex();
                line = stringArray[currentIndex];
                // while (formArray[formIndex] === "") {
                //     poem.push("");
                //     formIndex += 1;
                // }
            }
            if (syllable(line) > formArray[formIndex]) {
                initialize();
            }
        }
        if (poem.length === 0) {
            onSetStatusMessage("no poem found - try a bigger string or a different form", 3000, 'red');
        }
        return poem;
    };

    const getNGramPoemStressStanza = (text, form) => {
        const nGrams = currentNGrams;
        const indexArray = [...Array(Object.entries(nGrams).length).keys()];
        let line, nGram, stringArray;
        let currentIndex = 0;
        let poem = [];
        const formArray = form.split("/").map(x => x && Number(x)).filter((item) => item !== "");
        let formIndex = 0;
        let formSum = formArray.reduce((a, b) => a + b, 0);
        const nextIndex = () => (currentIndex + 1);
        const initialize = () => {
            let randomIndex = indexArray.splice(Math.floor(indexArray.length * Math.random()), 1)[0];
            let randomNGram = Object.entries(nGrams)[randomIndex];
            nGram = null;
            while (nGram === null) {
                randomIndex = indexArray.splice(Math.floor(indexArray.length * Math.random()), 1)[0];
                randomNGram = Object.entries(nGrams)[randomIndex];
                nGram = getNGramLineStressForIndex(nGrams, formSum, randomNGram);
            }
            stringArray = nGram.trim().split(/\s+/);
            line = stringArray[0];
            currentIndex = 0;
            formIndex = 0;
            poem = [];
        };
        initialize();
    
        while ( indexArray.length > 0 &&  poem.length < formArray.length) {
            currentIndex = nextIndex();
            if (getStress(line) < formArray[formIndex]) {
                line = `${line} ${stringArray[currentIndex]}`;
            }
            if (getStress(line) === formArray[formIndex]) {
                poem.push(line);
                formIndex += 1;
                currentIndex = nextIndex();
                line = stringArray[currentIndex];
                // while (formArray[formIndex] === "") {
                //     poem.push("");
                //     formIndex += 1;
                // }
            }
            if (getStress(line) > formArray[formIndex]) {
                initialize();
            }
        }
        if (poem.length === 0) {
            onSetStatusMessage("no poem found - try a bigger string or a different form", 3000, 'red');
        }
        return poem;
    };

    const getNGramLineSyllableForIndex = (nGrams, form, randomNGram) => {
        let theNGram = randomNGram;
        if (theNGram && theNGram[0] !== null) {
            while (syllable(theNGram[0]) < form) {
                let theNewNGram = addNGramToNGramForIndex(theNGram, nGrams);
                if (theNewNGram !== null) {
                    theNGram = theNewNGram;
                } else {
                    return null;
                }
            }
        } else {
            return null;
        }
        // trim the excess if poss 
        while (syllable(theNGram[0]) > form) {
            let gramStringArray = theNGram[0].split(' ');
            gramStringArray.pop();
            theNGram[0] = gramStringArray.join(' ');
        }
        return theNGram[0];
    }

    const getNGramLineStressForIndex = (nGrams, form, randomNGram) => {
        let theNGram = randomNGram;
        if (theNGram && theNGram[0] !== null) {
            while (getStress(theNGram[0]) < form) {
                let theNewNGram = addNGramToNGramForIndex(theNGram, nGrams);
                if (theNewNGram !== null) {
                    theNGram = theNewNGram;
                } else {
                    return null;
                }
            }
        } else {
            return null;
        }
        // trim the excess if poss 
        while (getStress(theNGram[0]) > form) {
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

    const submitSelection = (functionToPerform) => {
        setLoading(true)
        // onSetStatusMessage('processing', 10000, 'yellow');
        const thePoem = functionToPerform(currentPreset.text, currentForm);
        console.log(thePoem)
        if (thePoem.length === 0) {
            setLoading(false)
            onSetStatusMessage('no poem found - try a bigger string or a different form', 3000, 'red');
        } else {
            const formattedPoem = formatPoem(thePoem, currentForm);
            onUpdate(formattedPoem);
            setLoading(false)
            onSetStatusMessage('success!', 1000, 'green');
        }
    }

    const submitSelectionWithSansBreaks = (functionToPerform) => {
        setLoading(true)
        // onSetStatusMessage('processing', 10000, 'yellow');
        const thePoem = functionToPerform(currentPreset.text, getFormArraySansBreaks(currentForm));
        if (thePoem.length === 0) {
            setLoading(false)
            onSetStatusMessage('no poem found - try a bigger string or a different form', 3000, 'red');
        } else {
            const formattedPoem = formatPoem(thePoem, currentForm);
            onUpdate(formattedPoem);
            setLoading(false)
            onSetStatusMessage('success!', 1000, 'green');
        }
    }
    
    const onFormSubmit = () => {
        if (formStyle === 'syllable') {
            if (genType === 'stanza' && nLevel === "10") {
                submitSelection(getOriginalPoemSyllable);
            }
            if (genType === 'line' && nLevel === "10") {
                submitSelectionWithSansBreaks(getRandomLinePoemSyllable);
            }
            if (nLevel === "1") {
                submitSelectionWithSansBreaks(getRandomWordPoemSyllable);
            }
            if (genType === 'stanza' && nLevel !== "10" && nLevel !== "1") {
                submitSelection(getNGramPoemSyllableStanza);
            }
            if (genType === 'line' && nLevel !== "10" && nLevel !== "1") {
                submitSelectionWithSansBreaks(getNGramPoemSyllableLine);
            }
        }
        if (formStyle === 'stress') {
            if (genType === 'stanza' && nLevel === "10") {
                submitSelection(getOriginalPoemStress);
            }
            if (genType === 'line' && nLevel === "10") {
                submitSelectionWithSansBreaks(getRandomLinePoemStress);
            }
            if (nLevel === "1") {
                submitSelectionWithSansBreaks(getRandomWordPoemStress);
            }
            if (genType === 'stanza' && nLevel !== "10" && nLevel !== "1") {
                // onSetStatusMessage('processing');
                submitSelection(getNGramPoemStressStanza);
            }
            if (genType === 'line' && nLevel !== "10" && nLevel !== "1") {
                submitSelectionWithSansBreaks(getNGramPoemStressLine);
            }
        }
 
    }

    
    const onChangeForm = (e) => {
        const permittedCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/'];
        const formArray = e.target.value.split('');
        const newFormArray = formArray.filter((item) => permittedCharacters.includes(item));
        const finalString = newFormArray.join('');
        setCurrentForm(finalString)
    }

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

    const onChangePunctSetting = () => {
        if (keepPunct === true) {
            setKeepPunct(false);
        } else {
            setKeepPunct(true);
        }
    }

    const onChangeCaseSetting = () => {
        if (keepCase === true) {
            setKeepCase(false);
        } else {
            setKeepCase(true);
        }
    }

    return (
        <div className={classes.generatorGrid}>
            <div className={classes.showSrcButton}>
                <button onClick={onClickShowSrc} className={`${classes.button} ${classes.srcPadButton}`}>SOURCE PAD</button>
                <StanzaUndoRedo wordEditMode={wordEditMode} onUndoRedoStanza={onUndoRedoStanza} stanza={stanza} oldStanza={oldStanza} />
            </div>
            <div className={classes.preset}>
                    <span>preset: </span>
                    <select className={classes.select} name="presets" id="presets" defaultValue={currentPreset.name} onChange={(e) => onSelectPreset(presets.value)} placeholder="Select a preset...">
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
                <button className={`${classes.button} ${disableGenButton ? classes.disabled : null}`} onClick={!disableGenButton ? onFormSubmit : null}>GENERATE</button>
            </div>
            <div className={classes.formInput}>
                <label htmlFor="form">form:</label>
                <input type="text" id="form" name="form" value={currentForm} onChange={onChangeForm}></input>
            </div>
            <div className={classes.saveStanzaButton}>
                <OnSaveStanzaToPad editExistingStanzaMode={editExistingStanzaMode} onSaveStanzaToPad={onSaveStanzaToPad} onUpdateStanzaToPad={onUpdateStanzaToPad}/> 
            </div>
            <div className={classes.genSettingsBox}>
                <div className={classes.formStyleToggle}>
                    <span>measure:</span>
                    <div className={classes.toggleButtonsContainer}>
                        <div>
                            <input className={`${classes.radioInput} ${formStyle === 'syllable' ? classes.selected : null}`} type="radio" id="form-style" name="form-style" value="syllable" onClick={() => onChangeFormStyleCheckbox('syllable')} />
                            <label htmlFor="syllable">syllable</label>
                        </div>
                        <div>
                            <input className={`${classes.radioInput} ${formStyle === 'stress' ? classes.selected : null}`} type="radio" id="form-style" name="form-style" value="stress" onClick={() => onChangeFormStyleCheckbox('stress')} />
                            <label htmlFor="stress">stress</label>
                        </div>
                    </div>
                </div>
                <div className={classes.reseedToggle}>
                    <span>reseed by:</span>
                    <div className={classes.toggleButtonsContainer}>
                        <div>
                            <input className={`${classes.radioInput} ${reseedCheckbox === 'stanza' ? classes.selected : null}`} type="radio" id="reseed" name="reseed" value="stanza" onClick={() => onChangeReseedCheckbox('stanza')} />
                            <label htmlFor="stanza">stanza</label>
                        </div>
                        <div>
                            <input className={`${classes.radioInput} ${reseedCheckbox === 'line' ? classes.selected : null}`} type="radio" id="reseed" name="reseed" value="line" onClick={() => onChangeReseedCheckbox('line')} />
                            <label htmlFor="line">line</label>
                        </div>
                    </div>
                </div>
                <div className={classes.miscToggle}>
                    <span>keep:</span>
                    <div className={classes.toggleButtonsContainer}>
                        <div>
                            <input className={`${classes.radioInput} ${keepCase === true ? classes.selected : null}`} type="radio" id="case" name="case" value="case" onClick={() => onChangeCaseSetting()} />
                            <label htmlFor="case">case</label>
                        </div>
                        <div>
                            <input className={`${classes.radioInput} ${keepPunct ? classes.selected : null}`} type="radio" id="punct" name="punct" value="punct" onClick={() => onChangePunctSetting()} />
                            <label htmlFor="punct">punct</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default GenerateControls;