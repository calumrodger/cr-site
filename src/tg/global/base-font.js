import classes from '../tg-styles.module.scss';
import { useState } from 'react';

const BaseFont = (props) => {

    const { onSelectFont } = props;

    const onClickFont = (font) => {
        onSelectFont(font);
    }



    const [selectedFont, setSelectedFont] = useState('lexend');

    return (
        <div className={classes.baseFont}>
            <label htmlFor="base-font">base face:</label>
            <select onChange={((e) => onClickFont(e.target.value))} className={classes.select} id="font" name="font">
                <option value="lexend" onClick={() => setSelectedFont('lexend')}>lexend</option>
                <option value="serif" >serif</option>
                <option value="sans-serif" >sans serif</option>
                <option value="monospace" >monospace</option>
                <option value="cursive" >cursive</option>
                <option value="fantasy" >fantasy</option>
                <option value="math" >math</option>
                <option value="system-ui" >system ui</option>
            </select>
        </div>
    )
}

export default BaseFont;