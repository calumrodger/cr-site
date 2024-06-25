import Link from 'next/link';
import classes from '../tg-styles.module.scss';
import exportFromJSON from 'export-from-json';
import { useEffect, useState } from 'react';

const SaveLoad = (props) => {

    const { onSetDocsMode, onLoadState, poem, poemTitle, oldStanza, wordBank, allWordLists, selectedWordList, presetArray, currentPreset, stanza, form, formStyle, genType, nLevel, outputCheckbox, updateStanzaStyles, outputBgColour, outputTitleColour, outputPoemColour, baseFont, baseFontSize, punctCounter, injectSetting } = props;
    // const [loadedJSON, setLoadedJSON] = useState({});

    // useEffect(() => {
    //     onLoadState(loadedJSON);
    // }, [loadedJSON])

    const onLoadHandler = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        if (!file) {
            return;
        }
        reader.readAsText(file)
        reader.onload = function() {
            onLoadState(JSON.parse(reader.result)[0]);
        };
    }

    const date = new Date().toISOString().slice(0, 16);

    let theTitle;
    if (poemTitle !== '') {
        theTitle = poemTitle;
    } else {
        theTitle = 'untitled';
    }

    const onSavePoem = () => {
        const getNewPresets = presetArray.filter((preset) => preset.id > 4);
        const data = [{poem: poem, poemTitle: poemTitle, oldStanza: oldStanza, wordBank: wordBank, allWordLists: allWordLists, selectedWordList: selectedWordList, presetArray: getNewPresets, currentPreset: currentPreset, stanza: stanza, form: form, formStyle: formStyle, genType: genType, nLevel: nLevel, outputCheckbox: outputCheckbox, updateStanzaStyles: updateStanzaStyles, outputBgColour: outputBgColour, outputTitleColour: outputTitleColour, outputPoemColour: outputPoemColour, baseFont: baseFont, baseFontSize: baseFontSize + 'rem', punctCounter: punctCounter, injectSetting: injectSetting}];
        const fileName = `${theTitle}-${date}`;
        const exportType = exportFromJSON.types.json;
        exportFromJSON({data, fileName, exportType});
    }
    
        return (
            <div className={classes.saveLoadContainer}>
                <button onClick={onSavePoem} className={classes.button}>SAVE STATE</button>
                <label className={`${classes.fileLoad} ${classes.button}`} htmlFor="txt-src">LOAD STATE
                <input className={classes.fileLoad} type="file" accept=".json" id="txt-src" name="txt-src" onChange={onLoadHandler}  />
                </label>
                <button className={classes.button} onClick={onSetDocsMode}>HELP/ DOCS</button>
            </div>
        )
}

export default SaveLoad;