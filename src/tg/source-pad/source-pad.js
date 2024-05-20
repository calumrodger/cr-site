'use client';

import classes from '../input.module.scss';
import PopulateFromYouTubeComments from '@tg/source-pad/populate-from-yt-comments';

import { syllable } from 'syllable';

import { useState, useEffect } from 'react';
import LoadFromTxt from './load-from-txt';

  const SourcePad = (props) => {

    const { onChangeString, string, onClickShowSrc, onClickImportAsStanza } = props;

    const [youTubeString, setYouTubeString] = useState('');
    const [txtString, setTxtString] = useState('');
    const [youTubeActive, setYouTubeActive] = useState(false);

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

    const onClickSaveAsPreset = () => {
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
                
                
            </div>
                { youTubeActive && <PopulateFromYouTubeComments onCloseYouTubeSearch={onCloseYouTubeSearch} onPopulateWithYouTubeComments={onPopulateWithYouTubeComments}/> }
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