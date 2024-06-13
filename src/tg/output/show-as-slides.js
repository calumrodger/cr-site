import classes from './outputs.module.scss';
import { checkPoemStyles, checkStyles } from '@tg/utils/utils';
import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';

const ShowAsSlides = (props) => {
    const { baseFont, baseFontSize, outputPoemColour, onChangeOutputPoemColour, outputTitleColour, onChangeOutputTitleColour, outputBgColour, poem, poemTitle, onLeaveOutputMode, onChangeOutputBgColour } = props;

    const refer = useRef(null);

    const [slideIndex, setSlideIndex] = useState(0);

    const onChangeBgColour = (e) => {
      onChangeOutputBgColour(e.target.value);
    }

    const onChangeTitleColour = (e) => {
      onChangeOutputTitleColour(e.target.value);
    }

    const onChangePoemColour = (e) => {
      onChangeOutputPoemColour(e.target.value);
    }

    const date = new Date().toISOString().slice(0, 16);

    let theTitle;
    if (poemTitle !== '') {
        theTitle = poemTitle;
    } else {
        theTitle = 'untitled';
    }

    const exportAsImage = useCallback(() => {
      if (refer.current === null) {
        return
      }
      toPng(refer.current, { cacheBust: true})
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${theTitle}-${date}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      })
    }, [refer])

    const thePoemJSX = poem.map((t, i) => {
      return (
        <div key={i} id={i} style={checkPoemStyles(t, baseFontSize)} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>
        {t.stanza.map((j, i) => {
          if (j.text === '\n') {
            return <br id={i} key={i} className={classes.lineBreak}/>
          } else {
            return <span id={i} key={i} style={checkStyles(j, baseFontSize)} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{j.text} </span>
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
        <div className={classes.pageContainer} >
          <div className={classes.poemContainer} style={{backgroundColor: outputBgColour, color: outputPoemColour, fontFamily: baseFont, fontSize: baseFontSize + 'rem'}} >
          <div className={classes.bigContainerFlex}>
            <div className={classes.smallContainerFlex} ref={refer} style={{backgroundColor: outputBgColour, color: outputPoemColour, fontFamily: baseFont, fontSize: baseFontSize + 'rem'}}>
                <div style={{color: slideIndex === 0 ? outputTitleColour : "transparent"}} className={classes.poemTitle}>{poemTitle}</div>
                <div className={classes.mainTextSlides}>
                {thePoemJSX[slideIndex]}
                </div>
            </div>
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
            <button className={`${classes.button} ${slideIndex === 0 ? classes.greyed : null}`} onClick={onClickLeft}>previous</button>
            <button className={`${classes.button} ${slideIndex === (thePoemJSX.length - 1) ? classes.greyed : null}`} onClick={onClickRight}>next</button>
            <button onClick={exportAsImage}className={classes.button}>export page as .png</button>
            <button onClick={onLeaveOutputMode} className={classes.button}>back</button>
          </div>
        </div>
    )
}

export default ShowAsSlides;