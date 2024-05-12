'use client';

import classes from './genny.module.scss';
import { useState, useEffect } from 'react';
import { syllable } from 'syllable';

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

// OUTPUT COMPONENTS
import ShowAsLines from '@tg/output/show-as-lines';
import SaveOutputToTxt from '@tg/output/save-to-txt';


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
  
  const [stanza, setStanza] = useState(treatString(source));
  const [oldStanza, setOldStanza] = useState([]);
  const [inputString, setInputString] = useState('');

  
  const detectForm = (stanza) => {
    console.log(stanza)
    let form = '';
    let syllableCounter = 0;
    for (let i = 0; i < stanza.length; i++) {

      if (stanza[i].text !== '\n') {
        syllableCounter = syllableCounter + syllable(stanza[i].text);
      }
      if (stanza[i].text === '\n') {
        form = form + syllableCounter.toString() + '/';
        syllableCounter = 0;
      }
    }
    form = form.slice(0, -1)
    return form;
  }

  const [form, setForm] = useState('');

  const [poem, setPoem] = useState([]);

  const [padToShow, setPadToShow] = useState('stanza');
  const [editExistingStanzaMode, setEditExistingStanzaMode] = useState(false);
  const [editStanzaIndex, setEditStanzaIndex] = useState(null);

  // Output on/off states
  const [outputMode, setOutputMode] = useState(false);
  const [showAsLines, setShowAsLines] = useState(false);

  useEffect(() => {
    setForm(detectForm(stanza));
  }, [stanza])

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

  const onUpdateStanzaToPad = () => {
    const newPoemString = stanza.map((item) => item.text).join(' ');
    const currentPoemLength = poem.length;
    const newPoemId = currentPoemLength + 1;
    let newOrder = [...poem];
    newOrder[editStanzaIndex] = {id: newPoemId, text: newPoemString};
    setPoem(newOrder);
    setEditExistingStanzaMode(false);
    setPadToShow('poem');
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

  const editStanza = (e) => {
    let stanza = poem.filter((item) => item.id.toString() === e.target.id);
    let stanzaId = parseInt(e.target.id);
    let stanzaIndex = poem.findIndex((item) => item.id === stanzaId);
    setEditStanzaIndex(stanzaIndex);
    setStanza(treatString(stanza[0].text));
    setEditExistingStanzaMode(true);
    setPadToShow('stanza');
  }

  const deleteStanza = (e) => {
    let newObjArray = poem.filter((item) => item.id.toString() !== e.target.id);
    setPoem(newObjArray);
  }

  const onLeaveOutputMode = () => {
    setOutputMode(false);
    setShowAsLines(false);
  }

  const onClickShowAsLines = () => {
    setOutputMode(true);
    setShowAsLines(true);
  }

  if (!outputMode) {
  return (
    <div className={classes.pageContainer}>
      <div className={classes.pageContent}> 
        { padToShow === 'stanza' && 
        <div className={classes.inputSection}>
          <p>INPUT</p>
          <GenerateFromString form={form} treatString={treatString} setInputString={setInputString} inputString={inputString} setStanza={setStanza} setOldStanza={setOldStanza} stanza={stanza}/> 
        </div>
        }
        { padToShow === 'stanza' ? 
          <>
          <span>Current Form: {form}</span>
          <StanzaPad stanza={stanza} onWordClick={onWordClick}/> 
          </>
        : <PoemPad poem={poem} editStanza={editStanza} deleteStanza={deleteStanza} shiftStanzaDown={shiftStanzaDown} shiftStanzaUp={shiftStanzaUp} /> 
        }
        { padToShow === 'stanza' && 
          <div className={classes.toolsSection}>
          <UndoRedo setStanza={setStanza} setOldStanza={setOldStanza} stanza={stanza} oldStanza={oldStanza} />
          <OnSaveStanzaToPad editExistingStanzaMode={editExistingStanzaMode} onSaveStanzaToPad={onSaveStanzaToPad} onUpdateStanzaToPad={onUpdateStanzaToPad}/> 
          </div>
        }
        <PadSwitcher onSwitchPad={onSwitchPad} />
        { padToShow === 'stanza' && 
          <div className={classes.processSection}>
            <p>PROCESS</p>
            <ReplaceWithHello onUpdate={onUpdate} stanza={stanza}/> 
          </div>
        }
        <div className={classes.outputSection}>
          <p>OUTPUT</p>
          <button className={classes.button} onClick={onClickShowAsLines}>OUTPUT AS LINES</button>
          <SaveOutputToTxt poem={poem} />
        </div>
      </div> 
    </div>
  );
  } else {
    return (
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
        { showAsLines && <ShowAsLines poem={poem}/> }
        <button onClick={onLeaveOutputMode} className={classes.button}>BACK</button>
        </div>
      </div>
    )
  }
};

export default Genny;
