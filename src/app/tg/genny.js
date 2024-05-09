'use client';

import classes from './genny.module.scss';
import { useState, useEffect } from 'react';

// PAD COMPONENTS
import StanzaPad from '@tg/pads/stanza-pad';
import PoemPad from '@tg/pads/poem-pad';
import PadSwitcher from '@tg/pads/pad-switcher';
import OnSaveStanzaToPad from '@tg/pads/save-stanza-to-pad';

// INPUT COMPONENTS
import GenerateFromWiki from '@tg/input/generate-from-wiki';
import GenerateFromString from '@tg/input/generate-from-string';

// PROCESS COMPONENTS
import ReplaceWithHello from '@tg/process/replace-with-hello';
import UndoRedo from '@tg/process/undo-redo';
import NGrammer from '@tg/process/n-gram';


const Genny = (props) => {

  const { source } = props;

  const treatString = (input) => {
    const sourceArray = input.split(" ");

    const filteredEmpties = sourceArray.filter((item) => item !== "");
  
    let newSource = [];
    const lineBreak = '\n';
  
    for (let i = 0; i < filteredEmpties.length; i++) {
      if (filteredEmpties[i] === '\n') {
        newSource.push(lineBreak); 
      } else if (filteredEmpties[i].includes('\n')) {
        let newValue = filteredEmpties[i].replace('\n', '');
        newSource.push(newValue);
        newSource.push(lineBreak);
      }  else  {
        newSource.push(filteredEmpties[i]); 
      } 
    }
  
    const finalList = newSource.map((item, index) => {
      if (item === '\n') {
        return { id: index, type: 'break', text: item, selected: false }
      } else {
      return { id: index, type: 'text', text: item, selected: false }
      }
    });

    return finalList;
  }
  

  const [stanza, setStanza] = useState(treatString(source))
  const [oldStanza, setOldStanza] = useState([])
  const [padToShow, setPadToShow] = useState('stanza');
  const [poem, setPoem] = useState([]);

  const onWordClick = (e) => {
    let newObjArray = stanza.map((item) => {
      if (item.id == e.target.id) {
        return { id: item.id, type: 'text', text: item.text, selected: item.selected ? false : true}
      } else {
        return item;
      }
    });
    setStanza(newObjArray);
    setOldStanza(stanza);
  };

  const onUpdate = (newstanza) => {
    setStanza(newstanza);
    setOldStanza(stanza);
  }

  const onSwitchPad = () => {
    if (padToShow === 'stanza') {
      setPadToShow('poem');
    } else {
      setPadToShow('stanza');
    }
  }

  const onSaveStanzaToPad = () => {
    const newPoemString = stanza.map((item) => item.text).join(' ');
    const currentPoemLength = poem.length;
    const newPoemId = currentPoemLength + 1;
    setPoem(poem => [...poem, {id: newPoemId, text: newPoemString}]);
  }

  function arraymove(arr, fromIndex, toIndex) {
    let newArray = arr;
    var element = arr[fromIndex];
    newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, element);
    return newArray;
  }

  const shiftStanzaUp = (e) => {
    let stanzaId = parseInt(e.target.id);
    let stanzaIndex = poem.findIndex((item) => item.id === stanzaId);

    if (stanzaIndex !== 0) {
      let tempArray = [...poem];
      arraymove(tempArray, stanzaIndex, stanzaIndex - 1);
      setPoem(tempArray);
    }
  }

  const shiftStanzaDown = (e) => {
    let stanzaId = parseInt(e.target.id);
    let stanzaIndex = poem.findIndex((item) => item.id === stanzaId);

    if (stanzaIndex !== poem.length - 1) {
      let tempArray = [...poem];
      arraymove(tempArray, stanzaIndex, stanzaIndex + 1);
      setPoem(tempArray);
    }
  }

  const deleteStanza = (e) => {
    let newObjArray = poem.filter((item) => item.id.toString() !== e.target.id);
    setPoem(newObjArray);
  }

  // useEffect(() => {
  //   // setPoem(poem => [...poem, newPoemString]);
  //   console.log(poem);
  // }, [shiftStanzaDown, shiftStanzaUp])


  return (
    <div className={classes.pageContainer}>
    <div className={classes.pageContent}>
      <div className={classes.inputSection}>
        <p>INPUT</p>
        <GenerateFromString treatString={treatString} setStanza={setStanza} setOldStanza={setOldStanza} stanza={stanza}/>
      </div>
      { padToShow === 'stanza' ? 
        <StanzaPad stanza={stanza} onWordClick={onWordClick}/> 
      : <PoemPad poem={poem} deleteStanza={deleteStanza} shiftStanzaDown={shiftStanzaDown} shiftStanzaUp={shiftStanzaUp} /> 
      }
      <PadSwitcher onSwitchPad={onSwitchPad} />
      <OnSaveStanzaToPad onSaveStanzaToPad={onSaveStanzaToPad} />
      <div className={classes.processSection}>
        <p>PROCESS</p>
        <ReplaceWithHello onUpdate={onUpdate} stanza={stanza}/> 
        <UndoRedo setStanza={setStanza} setOldStanza={setOldStanza} stanza={stanza} oldStanza={oldStanza} />
      </div>
      </div>
    </div> 
  );
};

export default Genny;
