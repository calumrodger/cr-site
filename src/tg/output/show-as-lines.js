import classes from './show-as-lines.module.scss';
import { checkStyles, checkPoemStyles } from '@tg/utils/utils';
import { useState } from 'react';

const ShowAsLines = (props) => {
    const { stanza, padToShow, poem, poemTitle, onLeaveOutputMode, onChangeOutputBgColour } = props;

    const [sliderValue, setSliderValue] = useState(0);
    const [colour, setColour] = useState('#000000');
    const [poemToShow, setPoemToShow] = useState([]);

    console.log(poem)
    console.log(stanza)
    console.log(poemToShow)

    const thePoem = padToShow === 'stanza' ? [{id: 0, stanza: stanza, selected: false}] : poem;

    const onChangeColour = (e) => {
        setColour(e.target.value);
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
          <div className={classes.showAsLinesPanel}>
          <button onClick={onLeaveOutputMode} className={classes.button}>BACK</button>
          <input type="range" min="0" max="9" step="1" onChange={onChangeSlider} value={sliderValue} className={classes.slider} id="myRange"/>
          <input type="color" id="colour" name="colour" onChange={onChangeColour} value={colour}/>
          </div>
          </div>
    )
}

export default ShowAsLines;