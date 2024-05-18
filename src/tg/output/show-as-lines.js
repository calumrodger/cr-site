import classes from '../output.module.scss';
import { checkStyles } from '@tg/utils/utils';
import { useState } from 'react';

const ShowAsLines = (props) => {
    const { poem, poemTitle, onLeaveOutputMode, onChangeOutputBgColour } = props;

    const [sliderValue, setSliderValue] = useState(0);
    const [colour, setColour] = useState('#000000');

    const onChangeColour = (e) => {
      console.log(e.target.value)
        setColour(e.target.value);
        console.log(colour)
        onChangeOutputBgColour(colour);
    }

    const onChangeSlider = (e) => {
        setSliderValue(e.target.value);
    }

    return (
        <div className={classes.pageContainer}>
          <div className={classes.poemContainer} >
              <div className={classes.poemTitle}>{poemTitle}</div>
              <div className={classes.mainText}>
              {poem.map((t, i) => {
                return (
                  <div key={i} id={i} style={{lineHeight: "1." + sliderValue + "rem"}} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>
                  {t.stanza.map((j, i) => {
                    if (j.text === '\n') {
                      return <br id={i} key={i} className={classes.lineBreak}/>
                    } else {
                      return <span id={i} key={i} style={checkStyles(j)} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{j.text} </span>
                    }
                  })}
                  <br/>
                  </div>
            )}
            )}
              </div>
          </div>
          <div className={classes.showAsLinesPanel}>
          <button onClick={onLeaveOutputMode} className={classes.button}>BACK</button>
          <input type="range" min="0" max="9" step="1" onChange={onChangeSlider} value={sliderValue} className={classes.slider} id="myRange"/>
          <input type="color" id="colour" name="colour" onChange={onChangeColour} value={colour}/>
          </div>
          </div>
    )
}

export default ShowAsLines;