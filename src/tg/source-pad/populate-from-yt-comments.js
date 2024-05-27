import classes from '../tg-styles.module.scss';

import { getYouTubeComments } from '@tg/server-actions/actions';

import { useState, useEffect } from 'react';

const PopulateFromYouTubeComments = (props) => {

    const { onPopulateWithYouTubeComments, onCloseYouTubeSearch, onSetStatusMessage } = props;
    const [YTUrl, setYTUrl] = useState('');
    const [commentsData, setCommentsData] = useState({items: []});
    const [finalString, setFinalString] = useState('');
    const [finalName, setFinalName] = useState('video');

    const onChangeUrlField = (e) => {
        setYTUrl(e.target.value);
    }

    const onFetchYTComments = async () => {
        var video_id = YTUrl.split('v=')[1];
        var ampersandPosition = video_id?.indexOf('&');
        if(ampersandPosition != -1) {
        video_id = video_id?.substring(0, ampersandPosition);
        }
        const comments = await getYouTubeComments(video_id);
        if (comments === 'error') {
            onSetStatusMessage('failed :( try another url');
            return;
        }
        setCommentsData(comments);
    }

    const treatData = (data) => {
        const items = data.items;
        const justTheText = items.map((item) => {
            return item.snippet.topLevelComment.snippet.textOriginal
          })
        const justTheTextString = justTheText.join(" ").replace(/(?:\r\n|\r|\n)/g, ' ');
        // const theTitle = items[0].snippet.videoTitle;
        return justTheTextString;
    }

    const onClickButton = async () => {
        setFinalString('');
        await onFetchYTComments();
    }

    useEffect(() => {
        setFinalString(treatData(commentsData));
        onPopulateWithYouTubeComments(finalName, finalString);
    }, [commentsData, finalString])

    return (
        <div className={classes.urlFormContainer}>
            <button className={classes.button} onClick={onCloseYouTubeSearch}>x</button>
            <label className={classes.inputLabel} htmlFor="yt-url">YouTube URL: </label>
            <input className={classes.textInput} type="text" id="yt-url" name="yt-url" value={YTUrl} onChange={onChangeUrlField}/>
            <button className={classes.button} onClick={onClickButton}>GO</button>
        </div>
    )
}

export default PopulateFromYouTubeComments;