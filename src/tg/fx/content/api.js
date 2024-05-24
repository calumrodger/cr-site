import classes from '../../tg-styles.module.scss';
import { useState } from 'react';
import { getFilmData, getGuardianData, getWeatherData } from '@tg/server-actions/actions';

const APIFX = (props) => {

    const { onSetStatusMessage, onUpdate, stanza } = props;

    const [promptValue, setPromptValue] = useState('');
    const [volumeValue, setVolumeValue] = useState(3);
    const [apiType, setApiType] = useState('news');

    const handleClick = () => {
        if (apiType === 'news') {
            onGetGuardianData();
        }
        if (apiType === 'weather') {
            onGetWeatherData();
        }
        if (apiType === 'film') {
            onGetFilmData();
        }
    }

    const onGetFilmData = async () => {
        const treatedPrompt = promptValue.replace(' ', '_');
        const data = await getFilmData(treatedPrompt);
        const plot = data.Plot;
        let newStanzaArray = [];
        let textArray = plot.split(' ');
        for (let i = 0; i < stanza.length; i++) {
            if (stanza[i].selected) {
                let randomIndex = Math.floor(Math.random() * textArray.length);
                let wordsToAddArray = textArray.filter((word, index) => (index >= randomIndex) && (index < (randomIndex + +volumeValue)));
                newStanzaArray.push(stanza[i]);
                for (let j = 0; j < wordsToAddArray.length; j++) {
                    newStanzaArray.push({id: stanza.length + j, type: 'text', text: wordsToAddArray[j], selected: false})
                }
            } else {
                newStanzaArray.push(stanza[i]);
            }
        }
        onUpdate(newStanzaArray, stanza);
    }

    const onGetGuardianData = async () => {
        const treatedPrompt = promptValue.replace(' ', '-');
        const data = await getGuardianData(treatedPrompt);
        const headlines = data.response.results.map((article) => article.webTitle).join(' ');
        console.log(headlines)
        let newStanzaArray = [];
        let textArray = headlines.split(' ');
        for (let i = 0; i < stanza.length; i++) {
            if (stanza[i].selected) {
                let randomIndex = Math.floor(Math.random() * textArray.length);
                let wordsToAddArray = textArray.filter((word, index) => (index >= randomIndex) && (index < (randomIndex + +volumeValue)));
                newStanzaArray.push(stanza[i]);
                for (let j = 0; j < wordsToAddArray.length; j++) {
                    newStanzaArray.push({id: stanza.length + j, type: 'text', text: wordsToAddArray[j], selected: false})
                }
            } else {
                newStanzaArray.push(stanza[i]);
            }
        }
        onUpdate(newStanzaArray, stanza);
    }

    const onGetWeatherData = async () => {
        const treatedPrompt = promptValue.replace(' ', '_');
        const data = await getWeatherData(treatedPrompt);
        const description = data.description;
        let newStanzaArray = [];
        let textArray = description.split(' ');
        for (let i = 0; i < stanza.length; i++) {
            if (stanza[i].selected) {
                let wordsToAddArray = textArray.filter((word, index) => index < +volumeValue);
                newStanzaArray.push(stanza[i]);
                for (let j = 0; j < wordsToAddArray.length; j++) {
                    newStanzaArray.push({id: stanza.length + j, type: 'text', text: wordsToAddArray[j], selected: false})
                }
            } else {
                newStanzaArray.push(stanza[i]);
            }
        }
        onUpdate(newStanzaArray, stanza);
    }

    return (
        <div className={classes.apiContainer}>
            <div className={classes.radioContainer}>
                <div className={classes.paramContainer}>
                    <div className={classes.param}>
                        <label htmlFor="news">news: </label>
                        <input type="radio" id="news" name="news" value="news" readOnly checked={apiType === 'news'} onClick={(e) => setApiType('news')}/>
                    </div>
                    <div className={classes.param}>
                        <label htmlFor="weather">weather: </label>
                        <input type="radio" id="weather" name="weather" value="weather" readOnly checked={apiType === 'weather'} onClick={(e) => setApiType('weather')}/>
                    </div>
                    <div className={classes.param}>
                        <label htmlFor="film">film: </label>
                        <input type="radio" id="film" name="film" value="film" readOnly checked={apiType === 'film'} onClick={(e) => setApiType('film')}/>
                    </div>
                </div>
            </div>
            <div className={classes.inputsContainer}>
                    <div className={classes.inputKey}>
                        <label htmlFor="key">key:</label>
                        <input className={classes.textInput} value={promptValue} onChange={(e) => setPromptValue(e.target.value)} type="text" />
                    </div>
                    <div className={classes.input}>
                        <label htmlFor="vol">vol:</label>
                        <input className={classes.textInput} value={volumeValue} onChange={(e) => setVolumeValue(e.target.value)} type="number" />
                    </div>
            </div>
            <div className={classes.buttonContainer}>
                <button className={classes.button} onClick={handleClick}>GO</button>
            </div>
        </div>
    )
}

export default APIFX;