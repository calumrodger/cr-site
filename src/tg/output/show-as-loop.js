import classes from './show-as-loop.module.scss';
import { checkStyles } from '@tg/utils/utils';
import { useState, useEffect } from 'react';

const ShowAsLoop = (props) => {
    const { poem, poemTitle, onLeaveOutputMode, onChangeOutputBgColour } = props;

    const [colour, setColour] = useState('#000000');
    const [slideIndex, setSlideIndex] = useState(0);
    const [sliderValue, setSliderValue] = useState(1000);

    const onChangeColour = (e) => {
        setColour(e.target.value);
        onChangeOutputBgColour(colour);
    }

    const thePoemJSX = poem.map((t, i) => {
      return (
        <div key={i} id={i} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>
        {t.stanza.map((j, i) => {
          if (j.text === '\n') {
            return <br id={i} key={i} className={classes.lineBreak}/>
          } else {
            return <div id={i} key={i} style={checkStyles(j)} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{j.text} </div>
          }
        })}
      </div>
    )})

    useEffect(() => {
      const interval = setInterval(() => {
        if (slideIndex < thePoemJSX.length - 1) {
          setSlideIndex(slideIndex + 1);
        } else {
          setSlideIndex(0);
        }
      }, sliderValue);
      return () => clearInterval(interval);
    }, [slideIndex, sliderValue]);

    const onChangeSlider = (e) => {
        setSliderValue(e.target.value);
    }

    return (
        <div className={classes.pageContainer}>
          <div className={classes.poemContainer} >
              <div className={classes.poemTitle}>{poemTitle}</div>
              <div className={classes.mainText}>
              {thePoemJSX[slideIndex]}
              </div>
          </div>
          <div className={classes.panel}>
            <input type="color" id="colour" name="colour" onChange={onChangeColour} value={colour}/>
            <input type="range" min="100" max="5000" step="100" onChange={onChangeSlider} value={sliderValue} className={classes.slider} id="myRange"/>
            <button onClick={onLeaveOutputMode} className={classes.button}>BACK</button>
          </div>
        </div>
    )
}

export default ShowAsLoop;