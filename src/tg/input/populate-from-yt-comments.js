import classes from './input.module.scss';

import { getYouTubeComments } from '@tg/server-actions/actions';

import { useState, useEffect } from 'react';

const PopulateFromYouTubeComments = (props) => {

    const { onPopulateWithYouTubeComments } = props;
    const [YTUrl, setYTUrl] = useState('sUmiLwfBNaU');
    const [commentsData, setCommentsData] = useState('');
    const [finalString, setFinalString] = useState('');

    const onChangeUrlField = (e) => {
        setYTUrl(e.target.value);
    }

    const onFetchYTComments = async () => {
        const videoId = YTUrl;
        const comments = await getYouTubeComments(videoId);
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
        await onFetchYTComments();
        setFinalString(treatData(commentsData));
    }

    useEffect(() => {
        onPopulateWithYouTubeComments(finalString);
    }, [finalString, onPopulateWithYouTubeComments])

    useEffect(() => {
        if (commentsData) {
            setFinalString(treatData(commentsData));
        } else {
            return;
        }
    }, [commentsData])

    return (
        <>
        <input type="text" id="yt-url" name="yt-url" value={YTUrl} onChange={onChangeUrlField} className={classes.input} placeholder="YT URL" />
        <button onClick={onClickButton}>Save to String</button>
        </>
    )
}

export default PopulateFromYouTubeComments;