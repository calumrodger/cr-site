import classes from '../tg-styles.module.scss';

import { useState, useEffect } from 'react';
import { checkStyles, checkPoemStyles } from '@tg/utils/utils';
import SaveOutputToTxt from '@tg/output/save-to-txt';

const PoemPad = (props) => {

    const { baseFont, poem, onEditStanza, onUpdatePoem } = props;

    const [stanzaArray, setStanzaArray] = useState(poem);

    const [noneSelected, setNoneSelected] = useState(true);
    const [moreThanOneSelected, setMoreThanOneSelected] = useState(false);

    const onSelectStanza = (e) => {
      let newArray = stanzaArray.map((item, index) => {
        if (index == e.target.id) {
          return { id: item.id, stanza: item.stanza, style: item?.style, selected: item.selected ? false : true}
        } else {
          return item;
        }
      });
      setStanzaArray(newArray);
      onUpdatePoem(newArray);
    }

    const isMoreThanOneStanzaSelected = () => {
      const quantity = stanzaArray.filter((item) => item.selected).length;
      if (quantity > 1) {
        return true;
      }
    }

    const areZeroStanzasSelected = () => {
      const quantity = stanzaArray.filter((item) => item.selected).length;
      if (quantity === 0) {
        return true;
      }
    }

    useEffect(() => {
      const zero = areZeroStanzasSelected();
      const moreThanOne = isMoreThanOneStanzaSelected();
      setNoneSelected(zero);
      setMoreThanOneSelected(moreThanOne);
    }, [stanzaArray])

    
    
    function arraymove(arr, fromIndex, toIndex) {
      const newArray = [...arr];
      var element = arr[fromIndex];
      newArray.splice(fromIndex, 1);
      newArray.splice(toIndex, 0, element);
      return newArray;
    }

    function shiftStanzasUp() {
      // copy stanzaArray and replace unselected stanzas with null
      const newArray = stanzaArray.map(stanza => stanza.selected ? stanza : null);
  
      // rotate left to place selected stanzas in correct position
      newArray.push(newArray.shift());
  
      // etc...
      stanzaArray.forEach((stanza, index) => {
          if (!stanza.selected) {
              const offsetIndex = newArray.indexOf(null, index);
              const newIndex = offsetIndex !== -1
                  ? offsetIndex
                  : newArray.indexOf(null);
              newArray[newIndex] = stanza;
          }
      });
  
      setStanzaArray(newArray);
      onUpdatePoem(newArray);
  }

    function shiftStanzasDown() {
      const newArray = stanzaArray.map(stanza => stanza.selected ? stanza : null);
      newArray.unshift(newArray.pop());
      stanzaArray.forEach((stanza, index) => {
          if (!stanza.selected) {
              const offsetIndex = newArray.lastIndexOf(null, index);
              const newIndex = offsetIndex !== -1
                  ? offsetIndex
                  : newArray.lastIndexOf(null);
              newArray[newIndex] = stanza;
          }
      });
      setStanzaArray(newArray);
      onUpdatePoem(newArray);
  }

    const editStanza = (e) => {
      let stanzaIndex = stanzaArray.findIndex((item) => item.selected === true);
      let stanza = stanzaArray[stanzaIndex].stanza;
      let stanzaStyles = stanzaArray[stanzaIndex]?.style ? stanzaArray[stanzaIndex].style : null;
      onEditStanza(stanza, stanzaIndex, stanzaStyles);
    }

    const deleteStanza = () => {
      let newObjArray = [];
      for (let i = 0; i < stanzaArray.length; i++) {
        if (!stanzaArray[i].selected) {
          newObjArray.push(stanzaArray[i]);
        }
      }
      setStanzaArray(newObjArray);
      onUpdatePoem(newObjArray);
    }

    const duplicateStanza = () => {
      let newObjArray = [];
      for (let i = 0; i < stanzaArray.length; i++) {
        if (stanzaArray[i].selected) {
          newObjArray.push(stanzaArray[i]);
          newObjArray.push({ id: stanzaArray.length + 1, stanza: stanzaArray[i].stanza, style: stanzaArray[i]?.style, selected: false })
        } else {
          newObjArray.push(stanzaArray[i]);
        }
      }
      setStanzaArray(newObjArray);
      onUpdatePoem(newObjArray);
    }

    const selectAll = () => {
      let newObjArray = stanzaArray.map((item) => {
        return { id: item.id, stanza: item.stanza, style: item?.style, selected: true }
      });
      setStanzaArray(newObjArray);
      onUpdatePoem(newObjArray);
    }

    const unselectAll = () => {
      let newObjArray = stanzaArray.map((item) => {
        return { id: item.id, stanza: item.stanza, style: item?.style, selected: false }
      });
      setStanzaArray(newObjArray);
      onUpdatePoem(newObjArray);
    }


    return (
      <>
        <div className={classes.poemBox}>
          {poem.map((t, i) => {
              return (
              <div key={t.id} className={classes.poemContainer} style={{fontFamily: baseFont}}>
                <div className={classes.controlsContainer}>
                <span>{i + 1}</span>
                <button id={i} className={`${classes.button} ${classes.ppButton}`} onClick={onSelectStanza}>select</button>
                </div>
                <div id={i} style={checkPoemStyles(t)} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>
                {t.stanza.map((j, f) => {
                  if (j.text === '\n') {
                    return <br key={j.id} className={classes.lineBreak}/>
                  } else {
                    return <div key={j.id} style={checkStyles(j)} className={`${classes.word}`}>{j.text} </div>
                  }
                })}
                </div>
              </div>
          )}
          )}
        </div>
        <div className={classes.poemPadButtonOuterContainer}>
        <div className={classes.poemPadButtonContainer}>
        <SaveOutputToTxt poem={poem} /> 
          <button className={`${classes.button}`} onClick={selectAll}>select all</button>
          <button className={`${classes.button}`} onClick={unselectAll}>unselect all</button>
          <button className={`${classes.button} ${noneSelected ? classes.disabled : null}`} onClick={shiftStanzasUp}>up</button>
          <button className={`${classes.button} ${noneSelected ? classes.disabled : null}`} onClick={shiftStanzasDown}>down</button>
          <button className={`${classes.button} ${noneSelected ? classes.disabled : null}`} onClick={duplicateStanza}>dupe</button>
          <button className={`${classes.button} ${noneSelected ? classes.disabled : null}`} onClick={deleteStanza}>delete</button>
          <button className={`${classes.button} ${noneSelected ? classes.disabled : null}`} >shuffle</button>
          <button className={`${classes.button} ${noneSelected || moreThanOneSelected ? classes.disabled : null}`} onClick={editStanza}>edit</button>
        </div>
        </div>
        </>
    )
}

export default PoemPad;