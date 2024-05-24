import classes from './show-as-grid.module.scss';
import { checkStyles, checkPoemStyles } from '@tg/utils/utils';
import { useState, useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';

const ShowAsGrid = (props) => {
    const refer = useRef(null);
    const { poem, poemTitle, onLeaveOutputMode, onChangeOutputBgColour } = props;

    const [colour, setColour] = useState('#fff');
    const [gridX, setGridX] = useState(1);
    const [gridY, setGridY] = useState(4);
    const [renderMode, setRenderMode] = useState(true);
    const [padding, setPadding] = useState(0);

    const onChangeColour = (e) => {
        setColour(e.target.value);
        onChangeOutputBgColour(colour);
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

    const renderModeButtonText = renderMode ? 'L-R' : 'N-S';

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
        <div className={classes.pageContainer}>
          <div className={classes.poemContainer} style={{backgroundColor: colour, padding: "1rem"}} ref={refer}>
              <div className={classes.poemTitle}>{poemTitle}</div>
              <div style={{...yValue, ...xValue, ...renderSetting}} className={classes.mainText}>
              {poem.map((t, i) => {
                const styleObject = {...checkPoemStyles(t), ...paddingValue};
                return (
                  <div key={i} id={i} style={styleObject} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>
                  {t.stanza.map((j, i) => {
                    if (j.text === '\n') {
                      return <br id={i} key={i} className={classes.lineBreak}/>
                    } else {
                      return <div id={i} key={i} style={checkStyles(j)} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{j.text} </div>
                    }
                  })}
                  <br/>
                  </div>
            )}
            )}
              </div>
          </div>
          <div className={classes.panel}>
            <input type="color" id="colour" name="colour" onChange={onChangeColour} value={colour}/>
            <input type="range" id="grid-x" name="grid-x" min="1" max="10" step="1" onChange={onChangeGridCoOrds} value={renderMode ? gridY : gridX}/>
            <input type="range" id="padding" name="padding" min="-9" max="9" step="1" onChange={onChangePadding} value={padding}/>
            <button onClick={switchRenderMode} className={classes.button}>{renderModeButtonText}</button>
            <button onClick={onLeaveOutputMode} className={classes.button}>BACK</button>
            <button onClick={exportAsImage} className={classes.button}>EXPORT</button>
          </div>
        </div>
    )
}

export default ShowAsGrid;