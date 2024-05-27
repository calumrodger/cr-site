import Link from 'next/link';
import classes from '../tg-styles.module.scss';
import exportFromJSON from 'export-from-json';
import { useEffect, useState } from 'react';

const SaveLoad = (props) => {

    const { onLoadState, poem, poemTitle, oldStanza, wordBank, allWordLists, selectedWordList, presetArray, currentPreset, stanza, form, formStyle, genType, nLevel, outputCheckbox, updateStanzaStyles, outputBgColour, outputTitleColour, outputPoemColour, baseFont, punctCounter, injectSetting } = props;
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

    const onSavePoem = () => {
        const data = [{poem: poem, poemTitle: poemTitle, oldStanza: oldStanza, wordBank: wordBank, allWordLists: allWordLists, selectedWordList: selectedWordList, presetArray: presetArray, currentPreset: currentPreset, stanza: stanza, form: form, formStyle: formStyle, genType: genType, nLevel: nLevel, outputCheckbox: outputCheckbox, updateStanzaStyles: updateStanzaStyles, outputBgColour: outputBgColour, outputTitleColour: outputTitleColour, outputPoemColour: outputPoemColour, baseFont: baseFont, punctCounter: punctCounter, injectSetting: injectSetting}];
        const fileName = poemTitle ? poemTitle + '-state' : 'untitled-state';
        const exportType = exportFromJSON.types.json;
        exportFromJSON({data, fileName, exportType});
    }
    
        return (
            <div className={classes.saveLoadContainer}>
                <button onClick={onSavePoem} className={classes.button}>SAVE STATE</button>
                <label className={`${classes.fileLoad} ${classes.button}`} htmlFor="txt-src">LOAD STATE
                <input className={classes.fileLoad} type="file" accept=".json" id="txt-src" name="txt-src" onChange={onLoadHandler}  />
                </label>
                <Link className={classes.button} href="/docs">HELP/ DOCS</Link>
            </div>
        )
}

export default SaveLoad;