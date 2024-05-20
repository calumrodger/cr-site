'use client';

import classes from '../input.module.scss';
import PopulateFromYouTubeComments from '@tg/source-pad/populate-from-yt-comments';

import { syllable } from 'syllable';

import { useState, useEffect } from 'react';
import LoadFromTxt from './load-from-txt';

  const SourcePad = (props) => {

    const { onSelectPreset, presetArray, onSavePreset, onChangeString, string, onClickShowSrc, onClickImportAsStanza } = props;

    const [youTubeString, setYouTubeString] = useState('');
    const [txtString, setTxtString] = useState('');
    const [youTubeActive, setYouTubeActive] = useState(false);
    const [sourceName, setSourceName] = useState('');
    const [selectedPreset, setSelectedPreset] = useState('');

    const onPopulateWithYouTubeComments = (comments) => {
        setYouTubeString(comments);
    }

    const onPopulateWithTxt = (txt) => {
        setTxtString(txt);
    }

    useEffect(() => {
        if (youTubeString !== '') {
        onChangeString({target: {value: youTubeString}})
        }
    }, [youTubeString])

    useEffect(() => {
        if (txtString !== '') {
        onChangeString({target: {value: txtString}})
        }
    }, [txtString])

    // useEffect(() => {
    //     onSelectPreset(selectedPreset);
    //     console.log(selectedPreset)
    // }, [selectedPreset])

    const onClickSaveAsPreset = () => {
        onSavePreset(sourceName);
    }

    const onCloseYouTubeSearch = () => {
        setYouTubeActive(!youTubeActive);
    }
   
    return (
        <div className={classes.inputPadSectionContainer}>
            <div className={classes.topButtons}>
                <span>Enter source text below or </span>
                <button className={classes.button} onClick={() => setYouTubeActive(!youTubeActive)}>get from YouTube</button>
                <span> , </span>
                <LoadFromTxt onPopulateWithTxt={onPopulateWithTxt}/>
                <span>. Or select a preset:</span>
                <select name="presets" id="presets" onChange={(e) => onSavePreset(presets.value)} placeholder="Select a preset...">
                     { presetArray.map((p, i) => {
                        return <option key={i} onClick={() => setSelectedPreset(p)}>{p.name}</option>
                    })}
                </select>
                
                
            </div>
                { youTubeActive && <PopulateFromYouTubeComments onCloseYouTubeSearch={onCloseYouTubeSearch} onPopulateWithYouTubeComments={onPopulateWithYouTubeComments}/> }
                <input type="text" placeholder="Name your source here..." value={sourceName} onChange={(e) => setSourceName(e.target.value)}/>
                <textarea className={classes.inputPad} type="textarea" id="article-name" name="article-name" value={string} onChange={onChangeString}/>
            <div className={classes.bottomButtons}>
                <button onClick={onClickSaveAsPreset} className={classes.button}>SAVE AS PRESET</button>
                <button onClick={onClickImportAsStanza} className={classes.button}>IMPORT AS STANZA</button>
                <button onClick={onClickShowSrc} className={classes.button}>SAVE & CLOSE</button>
            </div>
        </div>

        )
  }
  
export default SourcePad;