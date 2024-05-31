import classes from '../tg-styles.module.scss';
import { useState } from 'react';

const BaseFont = (props) => {

    const { onSelectFont, baseFont, baseFontSize, onSetBaseFontSize } = props;

    const onClickFont = (font) => {
        onSelectFont(font);
    }

    return (
        <div className={classes.fontControlsContainer}>
            <div className={classes.baseFont}>
                <label htmlFor="base-font">base font:</label>
                <select onChange={((e) => onClickFont(e.target.value))} defaultValue={baseFont} className={classes.select} id="font" name="font">
                    <option value="lexend">default</option>
                    <option value="serif" >serif</option>
                    <option value="sans-serif" >sans serif</option>
                    <option value="monospace" >monospace</option>
                    <option value="cursive" >cursive</option>
                    <option value="fantasy" >fantasy</option>
                    <option value="math" >math</option>
                    <option value="system-ui" >system ui</option>
                </select>
            </div>
            <div className={classes.fontSizeSlider}>
                <label htmlFor="font-size">size:</label>
                <input className={classes.slider} type="range" id="font-size" name="font-size" min="0.3" max="2.3" step="0.1" value={baseFontSize} onChange={(e) => onSetBaseFontSize(e.target.value)}></input>
            </div>
        </div>
    )
}

export default BaseFont;