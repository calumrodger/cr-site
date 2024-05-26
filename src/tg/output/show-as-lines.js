import classes from './outputs.module.scss';
import { checkStyles, checkPoemStyles } from '@tg/utils/utils';
import { useState, useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';

const ShowAsLines = (props) => {

    const refer = useRef(null);

    const { stanza, padToShow, poem, poemTitle, onLeaveOutputMode, onChangeOutputBgColour } = props;

    const [sliderValue, setSliderValue] = useState(0);
    const [colour, setColour] = useState('#fff');
    const [poemToShow, setPoemToShow] = useState([]);

    const thePoem = padToShow === 'stanza' ? [{id: 0, stanza: stanza, selected: false}] : poem;

    const onChangeColour = (e) => {
        setColour(e.target.value);
        onChangeOutputBgColour(colour);
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
        <div className={classes.pageContainer} >
          <div className={classes.poemContainer} ref={refer}>
              <div className={classes.poemTitle}>{poemTitle}</div>
              <div className={classes.mainTextLines}>
              {thePoem.map((t, i) => {
                const styleObject = {...checkPoemStyles(t), ...{lineHeight: "1." + sliderValue + "rem"}};
                return (
                  <div key={i} id={i} style={styleObject} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>
                  {t.stanza.map((j, i) => {
                    if (j.text === '\n') {
                      return <br id={i} key={i} className={classes.lineBreak}/>
                    } else {
                      const theText = j.text + " ";
                      return <div id={i} key={i} style={checkStyles(j)} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{theText}</div>
                    }
                  })}
                  <br/>
                </div>
            )}
            )}
              </div>
          </div>
          <div className={classes.panel}>
          <div className={classes.colourContainer}>
          <label htmlFor="colour">bg colour:</label>
          <input type="color" id="colour" name="colour" onChange={onChangeColour} value={colour}/>
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