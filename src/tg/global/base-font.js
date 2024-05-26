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
                <option value="league-spartan" >league spartan</option>
            </select>
        </div>
    )
}

export default BaseFont;