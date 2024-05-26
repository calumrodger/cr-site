import classes from './outputs.module.scss';
import { checkPoemStyles, checkStyles } from '@tg/utils/utils';
import { useState } from 'react';

const ShowAsSlides = (props) => {
    const { poem, poemTitle, onLeaveOutputMode, onChangeOutputBgColour } = props;

    const [colour, setColour] = useState('#000000');
    const [slideIndex, setSlideIndex] = useState(0);

    const onChangeColour = (e) => {
        setColour(e.target.value);
        onChangeOutputBgColour(colour);
    }

    const thePoemJSX = poem.map((t, i) => {
      return (
        <div key={i} id={i} style={checkPoemStyles(t)} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>
        {t.stanza.map((j, i) => {
          if (j.text === '\n') {
            return <br id={i} key={i} className={classes.lineBreak}/>
          } else {
            return <span id={i} key={i} style={checkStyles(j)} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{j.text} </span>
          }
        })}
      </div>
    )})

    const onClickLeft = () => {
      if (slideIndex > 0) {
        setSlideIndex(slideIndex - 1);
      }
    }

    const onClickRight = () => {
      if (slideIndex < thePoemJSX.length - 1) {
        setSlideIndex(slideIndex + 1);
      }
    }

    return (
        <div className={classes.pageContainer}>
          <div className={classes.poemContainer} >
              <div className={classes.poemTitle}>{poemTitle}</div>
              <div className={classes.mainTextSlides}>
              {thePoemJSX[slideIndex]}
              </div>
          </div>
          <div className={classes.panel}>
          <div className={classes.colourContainer}>
          <label htmlFor="colour">bg colour:</label>
            <input type="color" id="colour" name="colour" onChange={onChangeColour} value={colour}/>
            </div>
            <button className={`${classes.button} ${slideIndex === 0 ? classes.greyed : null}`} onClick={onClickLeft}>previous</button>
            <button className={`${classes.button} ${slideIndex === (thePoemJSX.length - 1) ? classes.greyed : null}`} onClick={onClickRight}>next</button>
            <button className={classes.button}>export as .pdf</button>
            <button onClick={onLeaveOutputMode} className={classes.button}>back</button>
          </div>
        </div>
    )
}

export default ShowAsSlides;