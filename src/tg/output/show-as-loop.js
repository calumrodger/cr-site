import classes from './show-as-loop.module.scss';
import { checkStyles } from '@tg/utils/utils';
import { useState, useEffect } from 'react';

const ShowAsLoop = (props) => {
    const { poem, poemTitle, onLeaveOutputMode, onChangeOutputBgColour } = props;

    const [colour, setColour] = useState('#000000');

    const onChangeColour = (e) => {
        setColour(e.target.value);
        onChangeOutputBgColour(colour);
    }

    const theThing = poem.map((t, i) => {
      return (
        <div key={i} id={i} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>
        {t.stanza.map((j, i) => {
          if (j.text === '\n') {
            return <br id={i} key={i} className={classes.lineBreak}/>
          } else {
            return <span id={i} key={i} style={checkStyles(j)} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{j.text} </span>
          }
        })}
      </div>
    )})

    let slideIndex = 0;

    // function carousel() {
    //   var i;
    //   var x = document.getElementsByClassName("mainText");
    //   for (i = 0; i < x.length; i++) {
    //     x[i].style.display = "none";
    //   }
    //   slideIndex++;
    //   if (slideIndex > x.length) {slideIndex = 1}
    //   x[slideIndex-1].style.display = "block";
    //   setTimeout(carousel, 2000); // Change image every 2 seconds
    // }

    // useEffect(() => {
    //   carousel();
    // }, []);

    return (
        <div className={classes.pageContainer}>
          <div className={classes.poemContainer} >
              <div className={classes.poemTitle}>{poemTitle}</div>
              <div className={classes.mainText}>
              {theThing}
              </div>
          </div>
          <div className={classes.panel}>
            <input type="color" id="colour" name="colour" onChange={onChangeColour} value={colour}/>
            <button onClick={onLeaveOutputMode} className={classes.button}>BACK</button>
          </div>
        </div>
    )
}

export default ShowAsLoop;