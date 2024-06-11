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
        onSetStatusMessage('fetching data...', 10000, 'yellow')
        const data = await getFilmData(treatedPrompt);
        console.log(data)
        if (data === 'error' || data.Response === 'False') {
            onSetStatusMessage('something went wrong! try another title', 3000, 'red');
            return;
        }
        const plot = data.Plot;
        let newStanzaArray = [];
        let textArray = plot.split(' ');
        for (let i = 0; i < stanza.length; i++) {
            if (stanza[i].selected) {
                let randomIndex = Math.floor(Math.random() * textArray.length);
                let wordsToAddArray = textArray.filter((word, index) => (index >= randomIndex) && (index < (randomIndex + +volumeValue)));
                newStanzaArray.push(stanza[i]);
                for (let j = 0; j < wordsToAddArray.length; j++) {
                    newStanzaArray.push({id: stanza.length + j, type: 'text', style: stanza[i]?.style, text: wordsToAddArray[j], selected: false})
                }
            } else {
                newStanzaArray.push(stanza[i]);
            }
        }
        onUpdate(newStanzaArray, stanza);
        onSetStatusMessage('success!', 1000, 'green');
    }

    const onGetGuardianData = async () => {
        const treatedPrompt = promptValue.replace(' ', '-');
        onSetStatusMessage('fetching data...', 10000, 'yellow')
        const data = await getGuardianData(treatedPrompt);
        console.log(data)
        if (data === 'error' || data.response.status !== 'ok' || data.response.results.length === 0) {
            onSetStatusMessage('something went wrong!', 3000, 'red');
            return;
        }
        const headlines = data.response.results.map((article) => article.webTitle).join(' ');
        let newStanzaArray = [];
        let textArray = headlines.split(' ');
        for (let i = 0; i < stanza.length; i++) {
            if (stanza[i].selected) {
                let randomIndex = Math.floor(Math.random() * textArray.length);
                let wordsToAddArray = textArray.filter((word, index) => (index >= randomIndex) && (index < (randomIndex + +volumeValue)));
                newStanzaArray.push(stanza[i]);
                for (let j = 0; j < wordsToAddArray.length; j++) {
                    newStanzaArray.push({id: stanza.length + j, type: 'text', style: stanza[i]?.style, text: wordsToAddArray[j], selected: false})
                }
            } else {
                newStanzaArray.push(stanza[i]);
            }
        }
        onUpdate(newStanzaArray, stanza);
        onSetStatusMessage('success!', 1000, 'green');
    }

    const onGetWeatherData = async () => {
        const treatedPrompt = promptValue.replace(' ', '_');
        onSetStatusMessage('fetching data...', 10000, 'yellow')
        const data = await getWeatherData(treatedPrompt);
        console.log(data)
        if (data === 'error') {
            onSetStatusMessage('something went wrong! try another location', 3000, 'red');
            return;
        }
        const description = data.description;
        let newStanzaArray = [];
        let textArray = description.split(' ');
        for (let i = 0; i < stanza.length; i++) {
            if (stanza[i].selected) {
                newStanzaArray.push(stanza[i]);
                for (let j = 0; j < textArray.length; j++) {
                    newStanzaArray.push({id: stanza.length + j, type: 'text', style: stanza[i].style, text: textArray[j], selected: false})
                }
            } else {
                newStanzaArray.push(stanza[i]);
            }
        }
        onUpdate(newStanzaArray, stanza);
        onSetStatusMessage('success!', 1000, 'green');
    }

    const keyText = apiType === 'film' ? 'title:' : apiType === 'news' ? 'topic:' : 'place:';

    const areAnyStanzaWordsSelected = () => {
        const quantity = stanza.filter((item) => item.selected).length;
        if (quantity > 0) {
          return true;
        } else {
          return false;
        }
      }
    
      const wordsSelected = areAnyStanzaWordsSelected();

    return (
        <div className={classes.apiContainer}>
            <div className={classes.radioContainer}>
                <div className={classes.paramContainer}>
                    <div className={classes.param}>
                        <label htmlFor="news">news: </label>
                        <input className={`${classes.radioInput} ${apiType === 'news' ? classes.selected : null}`} type="radio" id="news" name="news" value="news" readOnly checked={apiType === 'news'} onClick={(e) => setApiType('news')}/>
                    </div>
                    <div className={classes.param}>
                        <label htmlFor="weather">weather: </label>
                        <input className={`${classes.radioInput} ${apiType === 'weather' ? classes.selected : null}`} type="radio" id="weather" name="weather" value="weather" readOnly checked={apiType === 'weather'} onClick={(e) => setApiType('weather')}/>
                    </div>
                    <div className={classes.param}>
                        <label htmlFor="film">film: </label>
                        <input className={`${classes.radioInput} ${apiType === 'film' ? classes.selected : null}`} type="radio" id="film" name="film" value="film" readOnly checked={apiType === 'film'} onClick={(e) => setApiType('film')}/>
                    </div>
                </div>
            </div>
            <div className={classes.inputsContainer}>
                    <div className={classes.inputKey}>
                        <label htmlFor="key">{keyText}</label>
                        <input className={classes.textInput} value={promptValue} onChange={(e) => setPromptValue(e.target.value)} type="text" />
                    </div>
                    { apiType !== 'weather' && <div className={classes.input}>
                        <label htmlFor="vol">vol:</label>
                        <input className={classes.numberInput} value={volumeValue} onChange={(e) => setVolumeValue(e.target.value)} type="number" />
                    </div>
                    }
            </div>
            <div className={classes.buttonContainer}>
                <button className={`${classes.button} ${wordsSelected && promptValue !== '' ? null : classes.disabled}`} onClick={wordsSelected ? handleClick : null}>GO</button>
            </div>
        </div>
    )
}

export default APIFX;