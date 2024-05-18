import classes from './show-as-slides.module.scss';
import { checkStyles } from '@tg/utils/utils';
import { useState } from 'react';

const ShowAsSlides = (props) => {
    const { poem, poemTitle, onLeaveOutputMode, onChangeOutputBgColour } = props;

    const [colour, setColour] = useState('#000000');

    const onChangeColour = (e) => {
        setColour(e.target.value);
        onChangeOutputBgColour(colour);
    }

    return (
        <div className={classes.pageContainer}>
          <div className={classes.poemContainer} >
              <div className={classes.poemTitle}>{poemTitle}</div>
              <div className={classes.mainText}>
              
              </div>
          </div>
          <div className={classes.panel}>
            <input type="color" id="colour" name="colour" onChange={onChangeColour} value={colour}/>
            <button onClick={onLeaveOutputMode} className={classes.button}>BACK</button>
          </div>
        </div>
    )
}

export default ShowAsSlides;