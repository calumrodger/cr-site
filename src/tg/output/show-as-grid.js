import classes from './outputs.module.scss';
import { checkStyles, checkPoemStyles } from '@tg/utils/utils';
import { useState, useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';

const ShowAsGrid = (props) => {
    const refer = useRef(null);
    const { baseFont, baseFontSize, outputPoemColour, onChangeOutputPoemColour, outputTitleColour, onChangeOutputTitleColour, poem, poemTitle, onLeaveOutputMode, onChangeOutputBgColour, outputBgColour } = props;

    const [gridX, setGridX] = useState(1);
    const [gridY, setGridY] = useState(4);
    const [renderMode, setRenderMode] = useState(true);
    const [padding, setPadding] = useState(0);

    const onChangeBgColour = (e) => {
      onChangeOutputBgColour(e.target.value);
    }

    const onChangeTitleColour = (e) => {
      onChangeOutputTitleColour(e.target.value);
    }

    const onChangePoemColour = (e) => {
      onChangeOutputPoemColour(e.target.value);
    }

    const switchRenderMode = () => {
        setRenderMode(!renderMode);
        if (renderMode) {
          setGridY(1);
          setGridX(4);
        } else {
          setGridX(1);
          setGridY(4);
        }
    }

    const renderModeButtonText = renderMode ? 'left-right' : 'top-bottom';

    const xValue = {gridTemplateRows: `repeat(${gridX}, 1fr)`};
    const yValue = {gridTemplateColumns: `repeat(${gridY}, 1fr)`};
    const paddingValue = {padding: Math.sign(padding) !== -1 ? '1.' + padding.toString() + 'rem' : `${1 - (( padding / 10) * -1)}rem`};
    const renderSetting = {gridAutoFlow: renderMode ? 'row' : 'column'}

    const onChangeGridCoOrds = (e) => {
      if (renderMode) {
        setGridY(e.target.value);
        setGridX(1);
      } else {
        setGridX(e.target.value);
        setGridY(1);
      }
    }

    const onChangePadding = (e) => {
        setPadding(e.target.value);
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

    return (
        <div className={classes.pageContainer} >
          <div className={classes.poemContainer} ref={refer} style={{backgroundColor: outputBgColour, color: outputPoemColour, fontFamily: baseFont, fontSize: baseFontSize + 'rem' }} >
          {poemTitle !== '' && <div style={{color: outputTitleColour}} className={classes.poemTitle}>{poemTitle}</div> }
              <div style={{...yValue, ...xValue, ...renderSetting}} className={classes.mainTextGrid}>
              {poem.map((t, i) => {
                const styleObject = {...checkPoemStyles(t, baseFontSize), ...paddingValue};
                return (
                  <div key={i} id={i} style={styleObject} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>
                  {t.stanza.map((j, i) => {
                    if (j.text === '\n') {
                      return <br id={i} key={i} className={classes.lineBreak}/>
                    } else {
                      return <div id={i} key={i} style={checkStyles(j, baseFontSize)} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{j.text} </div>
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
            <label htmlFor="grid-x">columns/rows:</label>
            <input className={classes.slider} type="range" id="grid-x" name="grid-x" min="1" max="10" step="1" onChange={onChangeGridCoOrds} value={renderMode ? gridY : gridX}/>
            </div>
            <div className={classes.sliderContainer}>
            <label htmlFor="spacing">spacing:</label>
            <input className={classes.slider} type="range" id="padding" name="padding" min="-9" max="9" step="1" onChange={onChangePadding} value={padding}/>
            </div>
            <button onClick={switchRenderMode} className={classes.button}>{renderModeButtonText}</button>
            <button onClick={exportAsImage} className={classes.button}>export as png</button>
            <button onClick={onLeaveOutputMode} className={classes.button}>back</button>
          </div>
        </div>
    )
}

export default ShowAsGrid;