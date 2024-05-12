import classes from './input.module.scss';

import { getYouTubeComments } from '@tg/server-actions/actions';

import { useState, useEffect, useLayoutEffect } from 'react';

const PopulateFromYouTubeComments = (props) => {

    const { onPopulateWithYouTubeComments } = props;
    const [YTUrl, setYTUrl] = useState('');
    const [commentsData, setCommentsData] = useState({items: []});
    const [oldCommentsData, setOldCommentsData] = useState({items: []});
    const [finalString, setFinalString] = useState('');

    const onChangeUrlField = (e) => {
        setYTUrl(e.target.value);
    }

    const onFetchYTComments = async () => {
        const videoId = YTUrl;
        var video_id = YTUrl.split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if(ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
        }
        console.log(video_id);
        const comments = await getYouTubeComments(video_id);
        setOldCommentsData(commentsData);
        setCommentsData(comments);
    }

    const treatData = (data) => {
        const items = data.items;
        const justTheText = items.map((item) => {
            return item.snippet.topLevelComment.snippet.textOriginal
          })
        const justTheTextString = justTheText.join(" ").replace(/(?:\r\n|\r|\n)/g, ' ');
        return justTheTextString;
    }

    const onClickButton = async () => {
        setFinalString('');
        await onFetchYTComments();
    }

    useEffect(() => {
        setFinalString(treatData(commentsData));
        onPopulateWithYouTubeComments(finalString);
    }, [onClickButton, commentsData, finalString, onPopulateWithYouTubeComments])

    return (
        <>
        <label htmlFor="yt-url">YouTube URL:</label>
        <input type="text" id="yt-url" name="yt-url" value={YTUrl} onChange={onChangeUrlField} className={classes.input} placeholder="YT URL" />
        <button className={classes.button} onClick={onClickButton}>Save to String</button>
        </>
    )
}

export default PopulateFromYouTubeComments;