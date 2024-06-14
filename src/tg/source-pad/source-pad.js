'use client';

import classes from '../tg-styles.module.scss';
import PopulateFromYouTubeComments from '@tg/source-pad/populate-from-yt-comments';
import { syllable } from 'syllable';
import { useState, useEffect } from 'react';
import LoadFromTxt from './load-from-txt';

  const SourcePad = (props) => {

    const { onDeletePreset, onCreateNewPreset, getStress, onSetStatusMessage, onSetCurrentPresetText, onSetCurrentPresetName, onOverwritePreset, onSelectPreset, presetArray, onSaveNewPreset, onChangeCurrentPreset, currentPreset, onClickShowSrc, onClickImportAsStanza } = props;
    
    const [youTubeString, setYouTubeString] = useState('');
    const [txtString, setTxtString] = useState('');
    const [youTubeActive, setYouTubeActive] = useState(false);
    const [presetName, setPresetName] = useState('');
    const [editingPresetName, setEditingPresetName] = useState(currentPreset?.name ? currentPreset.name : '');
    const [editingPresetText, setEditingPresetText] = useState(currentPreset?.text ? currentPreset.text : '');

    const onPopulateWithYouTubeComments = (name, comments) => {
        setEditingPresetName(name)
        setEditingPresetText(comments)
    }

    const onPopulateWithTxt = (name, text) => {
        setEditingPresetName(name)
        setEditingPresetText(text)
    }

    const onCloseYouTubeSearch = () => {
        setYouTubeActive(!youTubeActive);
    }

    const onClickBack = () => {
        if (editingPresetName === '') {
            onSetStatusMessage('source name cannot be empty', 10000, 'red');
        }
        if (editingPresetText === '') {
            onSetStatusMessage('source text cannot be empty', 10000, 'red');
        }
        const presetArrayMappedForStress = editingPresetText.split(' ').map((item) => getStress(item));
        const presetArrayMappedForSyllable = editingPresetText.split(' ').map((item) => syllable(item));
        if (presetArrayMappedForStress.length < 20) {
            onSetStatusMessage('input text must be more than 20 words', 10000, 'red');
        } else if (!presetArrayMappedForStress.includes(1)) {
            onSetStatusMessage('input text must contain at least one one-stress word', 10000, 'red');
        } else if (!presetArrayMappedForSyllable.includes(1)) {
            onSetStatusMessage('input text must contain at least one one-syllable word', 10000, 'red');
        } else {
            setYouTubeActive(!youTubeActive);
            onClickShowSrc();
        }
        
    }

    const onClickSaveAsNewPreset = () => {
        const presetArrayMappedForStress = editingPresetText.split(' ').map((item) => getStress(item));
        const presetArrayMappedForSyllable = editingPresetText.split(' ').map((item) => syllable(item));
        if (presetArrayMappedForStress.length < 20) {
            onSetStatusMessage('input text must be more than 20 words', 10000, 'red');
        } else if (!presetArrayMappedForStress.includes(1)) {
            onSetStatusMessage('input text must contain at least one one-stress word', 10000, 'red');
        } else if (!presetArrayMappedForSyllable.includes(1)) {
            onSetStatusMessage('input text must contain at least one one-syllable word', 10000, 'red');
        } else {
            onSetStatusMessage('new preset "' + editingPresetName + '" saved!', 1000, 'green');
            onSaveNewPreset(editingPresetName, editingPresetText);
        }
    }

    const onClickOverwritePreset = () => {
        const presetArrayMappedForStress = editingPresetText.split(' ').map((item) => getStress(item));
        const presetArrayMappedForSyllable = editingPresetText.split(' ').map((item) => syllable(item));
        if (presetArrayMappedForStress.length < 20) {
            onSetStatusMessage('input text must be more than 20 words', 10000, 'red');
        } else if (!presetArrayMappedForStress.includes(1)) {
            onSetStatusMessage('input text must contain at least one one-stress word', 10000, 'red');
        } else if (!presetArrayMappedForSyllable.includes(1)) {
            onSetStatusMessage('input text must contain at least one one-syllable word', 10000, 'red');
        } else {
            onSetStatusMessage('preset "' + editingPresetName + '" overwritten!', 1000, 'green');
            onOverwritePreset(editingPresetName, editingPresetText);
        }
    }

    const onChangeMenuPreset = () => {
        onSelectPreset(presets.value)
    }

    useEffect(() => {
        setEditingPresetName(currentPreset.name);
        setEditingPresetText(currentPreset.text);
    }, [currentPreset])

    const onFirstClickImportAsStanza = () => {
        onClickImportAsStanza(editingPresetText)
    }

    const onClickDeletePreset = () => {
        onDeletePreset()
    }

    const onClickCreateNewPreset = () => {
        onSetStatusMessage('new preset created!', 1000, 'green');
        onCreateNewPreset();
    }

    return (
        <div className={classes.inputPadSectionContainer}>
            <div className={classes.topButtons}>
                <span>enter source text below or: </span>
                <div className={classes.buttonOptions}>
                <button className={classes.button} onClick={() => setYouTubeActive(!youTubeActive)}>get from YouTube</button>
                <LoadFromTxt onPopulateWithTxt={onPopulateWithTxt}/>
                </div>
                <div className={classes.presetContainer}>
                <span>current preset:</span>
                <select className={classes.select} value={editingPresetName} name="presets" id="presets" onChange={() => onChangeMenuPreset(presets.value)} placeholder="Select a preset...">
                     { presetArray.map((p, i) => {
                        return <option key={i} onClick={() => setSelectedPreset(p)}>{p.name}</option>
                    })}
                </select>
                </div>
                
                
            </div>
                { youTubeActive && <PopulateFromYouTubeComments onSetStatusMessage={onSetStatusMessage} onCloseYouTubeSearch={onCloseYouTubeSearch} onPopulateWithYouTubeComments={onPopulateWithYouTubeComments}/> }
                <hr className={classes.line}/>
                <label htmlFor="title">source name: </label>
                <input id="title" type="text" className={classes.textInput} value={editingPresetName} onChange={(e) => setEditingPresetName(e.target.value)}/>
                <textarea className={classes.inputPad} type="textarea" id="article-name" name="article-name" value={editingPresetText} onChange={(e) => setEditingPresetText(e.target.value)}/>
            <div className={classes.bottomButtons}>
                <button onClick={onFirstClickImportAsStanza} className={classes.button}>import as stanza</button>
                <button onClick={onClickCreateNewPreset} className={classes.button}>new preset</button>
                <button onClick={onClickSaveAsNewPreset} className={classes.button}>save as new preset</button>
                <button onClick={onClickOverwritePreset} className={classes.button}>save as current preset</button>
                <button onClick={onClickDeletePreset} className={classes.button}>delete preset</button>
                <button onClick={onClickBack} className={classes.button}>back</button>
            </div>
        </div>

        )
  }
  
export default SourcePad;