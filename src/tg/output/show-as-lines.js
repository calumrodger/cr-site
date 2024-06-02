import classes from './outputs.module.scss';
import { checkStyles, checkPoemStyles } from '@tg/utils/utils';
import { useState, useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';

const ShowAsLines = (props) => {

    const refer = useRef(null);

    const { baseFont, baseFontSize, outputPoemColour, onChangeOutputPoemColour, outputTitleColour, onChangeOutputTitleColour,  outputBgColour, stanza, padToShow, poem, poemTitle, onLeaveOutputMode, onChangeOutputBgColour } = props;

    const [sliderValue, setSliderValue] = useState(0);

    const thePoem = padToShow === 'stanza' ? [{id: 0, stanza: stanza, selected: false}] : poem;

    const onChangeBgColour = (e) => {
        onChangeOutputBgColour(e.target.value);
    }

    const onChangeTitleColour = (e) => {
      onChangeOutputTitleColour(e.target.value);
    }

    const onChangePoemColour = (e) => {
      onChangeOutputPoemColour(e.target.value);
    }

    const onChangeSlider = (e) => {
        setSliderValue(e.target.value);
    }

    const exportAsImage = useCallback(() => {
      if (refer.current === null) {
        return
      }
      toPng(refer.current, { cacheBust: true})
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${poemTitle}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      })
    }, [refer])

    return (
      <div className={classes.pageContainer}  >
          <div className={classes.poemContainer} ref={refer} style={{backgroundColor: outputBgColour, color: outputPoemColour, fontFamily: baseFont, fontSize: baseFontSize + 'rem'}} >
          <div className={classes.smallContainerFlex}>
          {poemTitle !== '' && <div style={{color: outputTitleColour}} className={classes.poemTitle}>{poemTitle}</div> }
              <div className={classes.mainTextLines}>
              {thePoem.map((t, i) => {
                const styleObject = {...checkPoemStyles(t, baseFontSize), ...{lineHeight: "1." + sliderValue + "rem"}};
                return (
                  <div key={i} id={i} style={{...styleObject, padding: baseFontSize + 'rem'}} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>
                  {t.stanza.map((j, i) => {
                    if (j.text === '\n') {
                      return <br id={i} key={i} className={classes.lineBreak}/>
                    } else {
                      const theText = j.text + " ";
                      return <div id={i} key={i} style={checkStyles(j, baseFontSize)} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{theText}</div>
                    }
                  })}
                  <br/>
                </div>
            )}
            )}
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
          <div className={classes.sliderContainer}>
          <label htmlFor="spacing">spacing:</label>
          <input type="range" min="0" max="9" step="1" onChange={onChangeSlider} value={sliderValue} className={classes.slider} id="spacing"/>
          </div>
          
          <button onClick={exportAsImage} className={classes.button}>export as .png</button>
          <button onClick={onLeaveOutputMode} className={classes.button}>back</button>
          </div>
        </div>
    )
}

export default ShowAsLines;