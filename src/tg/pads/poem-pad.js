import classes from './pads.module.scss';

import { useState, useEffect } from 'react';
import { checkStyles } from '@tg/utils/utils';

const PoemPad = (props) => {

    const { poem, onEditStanza, onUpdatePoem } = props;

    const [stanzaArray, setStanzaArray] = useState(poem);

    const [noneSelected, setNoneSelected] = useState(true);
    const [moreThanOneSelected, setMoreThanOneSelected] = useState(false);

    const onSelectStanza = (e) => {
      let newArray = stanzaArray.map((item, index) => {
        if (index == e.target.id) {
          console.log(index, e.target.id)
          return { id: item.id, stanza: item.stanza, selected: item.selected ? false : true}
        } else {
          return item;
        }
      });
      setStanzaArray(newArray);
      // onUpdatePoem(newArray);
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

    function shiftStanzaUp() {
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

    const shiftStanzaDown = () => {
      let tempArray = [...stanzaArray];
      let endCondition = tempArray.length;
      for (let i = 0; i < endCondition; i++) {
        if (tempArray[i].selected) {
          if (i === endCondition - 1) {
            tempArray = arraymove(tempArray, tempArray.length - 1, 1);
            tempArray = arraymove(tempArray, 0, tempArray.length + 1);
            endCondition = -1;
          } else {
            tempArray = arraymove(tempArray, i, i + 1);
          }
        }
      }
      setStanzaArray(tempArray);
      onUpdatePoem(tempArray);
    }

    function shiftStanzas(up = true) {
      const newArray = stanzaArray.map(stanza => stanza.selected && stanza);
      const indexOfFalse = offset => up
          ? newArray.indexOf(false, offset)
          : newArray.lastIndexOf(false, offset ?? newArray.length);
      if (up) {
          newArray.push(newArray.shift());
      } else {
          newArray.unshift(newArray.pop());
      }
      stanzaArray.forEach((stanza, index) => {
          if (!stanza.selected) {
              const offsetIndex = indexOfFalse(index);
              newArray[offsetIndex !== -1 ? offsetIndex : indexOfFalse()] = stanza;
          }
      });
      setStanzaArray(newArray);
  }

    const editStanza = (e) => {
      let stanzaIndex = stanzaArray.findIndex((item) => item.selected === true);
      let stanza = stanzaArray[stanzaIndex].stanza;
      onEditStanza(stanza, stanzaIndex);
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
          newObjArray.push({ id: stanzaArray.length + 1, text: stanzaArray[i].text, selected: false })
        } else {
          newObjArray.push(stanzaArray[i]);
        }
      }
      setStanzaArray(newObjArray);
      onUpdatePoem(newObjArray);
    }

    const selectAll = () => {
      let newObjArray = stanzaArray.map((item) => {
        return { id: item.id, text: item.text, selected: true }
      });
      setStanzaArray(newObjArray);
    }

    const unselectAll = () => {
      let newObjArray = stanzaArray.map((item) => {
        return { id: item.id, text: item.text, selected: false }
      });
      setStanzaArray(newObjArray);
    }


    return (
      <>
        <div className={classes.poemBox}>
          {stanzaArray.map((t, i) => {
            console.log(t.selected);
            console.log(t.id)
              return (
              <div key={t.id} className={classes.poemContainer}>
                <span>{i + 1}</span>
                <button id={i} onClick={onSelectStanza}>select</button>
                <div id={i} onClick={onSelectStanza} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>
                {t.stanza.map((j, f) => {
                  if (j.text === '\n') {
                    return <br key={j.id} className={classes.lineBreak}/>
                  } else {
                    return <span key={j.id} style={checkStyles(j)} className={`${classes.word}`}>{j.text} </span>
                  }
                })}
                </div>
              </div>
          )}
          )}
        </div>
        <div className={classes.buttonContainer}>
          <button className={`${classes.button} ${noneSelected ? classes.disabled : null}`} onClick={shiftStanzaUp}>UP</button>
          <button className={`${classes.button} ${noneSelected ? classes.disabled : null}`} onClick={shiftStanzaDown}>DOWN</button>
          <button className={`${classes.button} ${noneSelected ? classes.disabled : null}`} onClick={duplicateStanza}>DUPE</button>
          <button className={`${classes.button} ${noneSelected || moreThanOneSelected ? classes.disabled : null}`} onClick={editStanza}>EDIT</button>
          <button className={`${classes.button} ${noneSelected ? classes.disabled : null}`} onClick={deleteStanza}>DEL</button>
          <button className={`${classes.button}`} onClick={selectAll}>SELECT ALL</button>
          <button className={`${classes.button}`} onClick={unselectAll}>UNSELECT ALL</button>
        </div>
        </>
    )
}

export default PoemPad;