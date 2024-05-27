'use client';

import classes from '../tg-styles.module.scss';
import PopulateFromYouTubeComments from '@tg/source-pad/populate-from-yt-comments';

import { useState, useEffect } from 'react';
import LoadFromTxt from './load-from-txt';

  const SourcePad = (props) => {

    const { onSetStatusMessage, onSetCurrentPresetText, onSetCurrentPresetName, onOverwritePreset, onSelectPreset, presetArray, onSaveNewPreset, onChangeCurrentPreset, currentPreset, onClickShowSrc, onClickImportAsStanza } = props;
    
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

    const onClickSaveAsNewPreset = () => {
        onSaveNewPreset(editingPresetName, editingPresetText)
    }

    const onClickOverwritePreset = () => {
        onOverwritePreset(editingPresetName, editingPresetText)
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
                <button onClick={onClickSaveAsNewPreset} className={classes.button}>save as new preset</button>
                <button onClick={onClickOverwritePreset} className={classes.button}>overwrite current preset</button>
                <button onClick={onClickShowSrc} className={classes.button}>back</button>
            </div>
        </div>

        )
  }
  
export default SourcePad;