import classes from './outputs.module.scss';
import { checkPoemStyles, checkStyles } from '@tg/utils/utils';
import { useState, useEffect } from 'react';

const ShowAsLoop = (props) => {
    const { baseFont, outputPoemColour, onChangeOutputPoemColour, outputTitleColour, onChangeOutputTitleColour, outputBgColour, poem, poemTitle, onLeaveOutputMode, onChangeOutputBgColour } = props;

    const [slideIndex, setSlideIndex] = useState(0);
    const [sliderValue, setSliderValue] = useState(1000);

    const onChangeBgColour = (e) => {
      onChangeOutputBgColour(e.target.value);
    }

    const onChangeTitleColour = (e) => {
      onChangeOutputTitleColour(e.target.value);
    }

    const onChangePoemColour = (e) => {
      onChangeOutputPoemColour(e.target.value);
    }

    const thePoemJSX = poem.map((t, i) => {
      return (
        <div key={i} id={i} style={checkPoemStyles(t)} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>
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
          <div className={classes.poemContainer} style={{backgroundColor: outputBgColour, color: outputPoemColour, fontFamily: `var(${baseFont})`}}>
          {poemTitle !== '' && <div style={{color: outputTitleColour}} className={classes.poemTitle}>{poemTitle}</div> }
              <div className={classes.mainTextLoop}>
              {thePoemJSX[slideIndex]}
              </div>
          </div>
          <div className={classes.panel}>
          <div className={classes.colourContainer}>
            <label htmlFor="colour-bg">bg:</label>
            <input type="color" id="colour-bg" name="colour-bg" onChange={onChangeBgColour} value={outputBgColour}/>
            </div>
            <div className={classes.colourContainer}>
            <label htmlFor="colour-title">title:</label>
            <input type="color" id="colour-title" name="colour-title" onChange={onChangeTitleColour} value={outputTitleColour}/>
            </div>
            <div className={classes.colourContainer}>
            <label htmlFor="colour-poem">poem:</label>
            <input type="color" id="colour-poem" name="colour-poem" onChange={onChangePoemColour} value={outputPoemColour}/>
            </div>
            <div className={classes.sliderContainer}>
              <label htmlFor="seconds">speed:</label>
              <input type="range" min="100" max="5000" step="100" onChange={onChangeSlider} value={sliderValue} className={classes.slider} id="seconds"/>
            </div>
            <button className={classes.button}>export as .gif</button>
            <button onClick={onLeaveOutputMode} className={classes.button}>back</button>
          </div>
        </div>
    )
}

export default ShowAsLoop;