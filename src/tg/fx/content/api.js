import classes from './api.module.scss';
import { useState } from 'react';

const APIFX = (props) => {

    const { onUpdate, stanza } = props;

    const [newsPromptValue, setNewsPromptValue] = useState('');
    const [newsVolumeValue, setNewsVolumeValue] = useState(3);
    const [weatherPromptValue, setWeatherPromptValue] = useState('');
    const [weatherVolumeValue, setWeatherVolumeValue] = useState(3);
    const [filmPromptValue, setFilmPromptValue] = useState('');
    const [filmVolumeValue, setFilmVolumeValue] = useState(3);

    const handleNewsClick = () => {
        console.log(newsPromptValue, newsVolumeValue)
    }

    const handleWeatherClick = () => {
        console.log(weatherPromptValue, weatherVolumeValue)
    }

    const handleFilmsClick = () => {
        console.log(filmPromptValue, filmVolumeValue)
    }

    return (
        <div className={classes.container}>
            <div className={classes.buttonContainer}>
                <button className={classes.button} onClick={handleNewsClick}>NEWS</button>
                <div className={classes.paramContainer}>
                    <div className={classes.param}>
                        <label htmlFor="news-key">key:</label>
                        <input className={classes.prompt} value={newsPromptValue} onChange={(e) => setNewsPromptValue(e.target.value)} type="text" />
                    </div>
                    <div className={classes.param}>
                        <label htmlFor="news-vol">vol:</label>
                        <input className={classes.prompt} value={newsVolumeValue} onChange={(e) => setNewsVolumeValue(e.target.value)} type="number" />
                    </div>
                </div>
            </div>
            <div className={classes.buttonContainer}>
                <button className={classes.button} onClick={handleWeatherClick}>WEATHER</button>
                <div className={classes.paramContainer}>
                    <div className={classes.param}>
                        <label htmlFor="weather-key">key:</label>
                        <input className={classes.prompt} value={weatherPromptValue} onChange={(e) => setWeatherPromptValue(e.target.value)} type="text" />
                    </div>
                    <div className={classes.param}>
                        <label htmlFor="weather-vol">vol:</label>
                        <input className={classes.prompt} value={weatherVolumeValue} onChange={(e) => setWeatherVolumeValue(e.target.value)} type="number" />
                    </div>
                </div>
            </div>
            <div className={classes.buttonContainer}>
                <button className={classes.button} onClick={handleFilmsClick}>FILMS</button>
                <div className={classes.paramContainer}>
                    <div className={classes.param}>
                        <label htmlFor="film-key">key:</label>
                        <input className={classes.prompt} value={filmPromptValue} onChange={(e) => setFilmPromptValue(e.target.value)} type="text" />
                    </div>
                    <div className={classes.param}></div>
                        <label htmlFor="film-vol">vol:</label>
                        <input className={classes.prompt} value={filmVolumeValue} onChange={(e) => setFilmVolumeValue(e.target.value)} type="number" />
                    </div>
                </div>
        </div>
    )
}

export default APIFX;