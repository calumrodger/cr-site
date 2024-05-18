'use client';

import classes from './genny.module.scss';
import { useState, useEffect } from 'react';
import { syllable } from 'syllable';
import { dictionary } from 'cmu-pronouncing-dictionary';

// GLOBAL COMPONENTS
import SaveLoad from '@tg/global/save-load';
import PadSwitcher from '@tg/global/pad-switcher';

// GENERATE COMPONENTS
import GenerateControls from '@tg/generate/generate-controls';
import FormStyleSwitch from '@tg/generate/form-style-switch';

// SOURCE PAD COMPONENTS
import SourcePad from '@tg/source-pad/source-pad';

// STANZA PAD COMPONENTS
import StanzaPad from '@tg/stanza-pad/stanza-pad';
import OnSaveStanzaToPad from '@tg/stanza-pad/save-stanza-to-pad';
import StanzaPadButtons from '@tg/stanza-pad/stanza-pad-buttons';
import StanzaUndoRedo from '@tg/stanza-pad/undo-redo-stanza';

// POEM PAD COMPONENTS
import PoemPad from '@tg/poem-pad/poem-pad';

// WORD BANK COMPONENTS
import PopulateWordBank from '@tg/word-bank/populate-word-bank';
import WordBank from '@tg/word-bank/word-bank';
import InjectControls from '@tg/word-bank/inject-buttons';
import WordBankEdit from '@tg/word-bank/word-bank-edit';
import WordBankAdd from '@tg/word-bank/word-bank-add';

// FX COMPONENTS
import ReplaceWithHello from '@tg/fx/content/replace-with-hello';
import ResizeText from '@tg/fx/form/text-size';
import ColourText from '@tg/fx/form/text-colour';

// OUTPUT COMPONENTS
import GiveTitle from '@tg/output/give-title';
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
  

  const [formStyle, setFormStyle] = useState('syllable');
  const [stanza, setStanza] = useState(treatString(source));

  const onSetFormStyle = () => {
    if (formStyle === 'syllable') {
      setFormStyle('stress');
    } else {
      setFormStyle('syllable');
    }
  }

  const getStress = (theString) => {
    if (theString === '' || theString === undefined) {
      return 0;
    }
    let wordsArray = theString.split(" ");
    for (let i = 0; i < wordsArray.length; i++) {
      wordsArray[i].trim;
      wordsArray[i].replace(/[^\w\s\']|_/g, "")
      wordsArray[i].replace(/\s+/g, " ")
    }

    let stressArray = [];
    for (let i = 0; i < wordsArray.length; i++) {
      if (dictionary[wordsArray[i]] !== undefined) {
        stressArray.push(dictionary[wordsArray[i]]);
      } else {
        stressArray.push('1');
      }
    }
    let stressCount = 0;
    for (let i = 0; i < stressArray.length; i++) {
      let itemStress = (((stressArray[i].match(/2/g)||[].length).toString()) * 1) + (((stressArray[i].match(/1/g)||[].length).toString()) * 1);
      stressCount = stressCount + itemStress;
    }

    return stressCount;
  }
  
  
  
  const [oldStanza, setOldStanza] = useState([]);
  const [inputString, setInputString] = useState('I am a happy person who likes eating chips.');

  const [poemTitle, setPoemTitle] = useState('');
  const [wordBank, setWordBank] = useState([{text: 'hello', selected: false}, {text: 'world', selected: false}]);

  const onSetPoemTitle = (e) => {
    setPoemTitle(e.target.value);
  }
  
  const detectFormSyllable = (stanza) => {
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

  const detectFormStress = (stanza) => {
    let form = '';
    let syllableCounter = 0;
    for (let i = 0; i < stanza.length; i++) {

      if (stanza[i].text !== '\n') {
        syllableCounter = syllableCounter + getStress(stanza[i].text);
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
    if (formStyle === 'syllable') {
      setForm(detectFormSyllable(stanza));
    } else {
      setForm(detectFormStress(stanza));
    }
  }, [stanza, formStyle])

  // useEffect(() => {
  //   console.log(poem)
  // }, [poem])


  const onWordClick = (e) => {
    let newObjArray = stanza.map((item, index) => {
      if (index == e.target.id) {
        return { id: item.id, type: 'text', text: item.text, style: item?.style, selected: item.selected ? false : true}
      } else {
        return item;
      }
    });
    setStanza(newObjArray);
  }

  const onWordBankClick = (e) => {
    let newObjArray = wordBank.map((item, index) => {
      if (index == e.target.id) {
        return { text: item.text, selected: item.selected ? false : true}
      } else {
        return item;
      }
    });
    setWordBank(newObjArray);
  }

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
    const newStanzaId = currentPoemLength + 1;
    setPoem(poem => [...poem, {id: newStanzaId, stanza: stanza, selected: false}]);
  }

  const onUpdatePoem = (newPoem) => {
    setPoem(newPoem);
  }

  const onUpdateStanzaToPad = () => {
    const newPoemString = stanza.map((item) => item.text).join(' ');
    const currentPoemLength = poem.length;
    const newPoemId = currentPoemLength + 1;
    let newOrder = [...poem];
    newOrder[editStanzaIndex] = {id: newPoemId, stanza: stanza, selected: false};
    setPoem(newOrder);
    setEditExistingStanzaMode(false);
    setPadToShow('poem');
  }

  const onLeaveOutputMode = () => {
    setOutputMode(false);
    setShowAsLines(false);
  }

  const onClickShowAsLines = () => {
    setOutputMode(true);
    setShowAsLines(true);
  }

  const onEditStanza = (stanza, stanzaIndex) => {
    setEditStanzaIndex(stanzaIndex);
    setStanza(stanza);
    setEditExistingStanzaMode(true);
    setPadToShow('stanza');
  }

  const onSelectAllWords = () => {
    let newObjArray = stanza.map((item) => {
      return { id: item.id, type: 'text', text: item.text, selected: true }
    });
    setStanza(newObjArray);
  }

  const onUnselectAllWords = () => { 
    let newObjArray = stanza.map((item) => {
      return { id: item.id, type: 'text', text: item.text, selected: false }
    });
    setStanza(newObjArray);
  }

  const onDeleteSelectedWords = () => {
    let newObjArray = [];
    let numberOfSelected = stanza.filter((item) => item.selected === true).length;
    if (numberOfSelected === stanza.length) {
      newObjArray.push({id: stanza[0].id, type: 'text', text: stanza[0].text, selected: false});
    } else {
      for (let i = 0; i < stanza.length; i++) {
        if (!stanza[i].selected) {
          newObjArray.push(stanza[i]);
        }
      }
    }
    setStanza(newObjArray);
  }

  const onDuplicateSelectedWords = () => {
    let newObjArray = [];
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push(stanza[i]);
        newObjArray.push({ id: stanza.length + 1, text: stanza[i].text, selected: false })
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
  }

  const deleteSelectedWordBank = () => {
    let newObjArray = [];
    for (let i = 0; i < wordBank.length; i++) {
      if (!wordBank[i].selected) {
        newObjArray.push(wordBank[i]);
      }
    }
    setWordBank(newObjArray);
  }

  const selectAllWordBank = () => {
    let newObjArray = wordBank.map((item) => {
      return { text: item.text, selected: true }
    }
    );
    setWordBank(newObjArray);
  }

  const unselectAllWordBank = () => {
    let newObjArray = wordBank.map((item) => {
      return { text: item.text, selected: false }
    }
    );
    setWordBank(newObjArray);
  }

  const onPopulateWordBank = (words, quant) => {

    let finalArray = [];
    let currentWordBank = wordBank.map(item => item.text);
    if (words.length < quant) {
      let checkIfAlreadyThere = words.filter(element => currentWordBank.includes(element));
      quant = words.length - checkIfAlreadyThere.length;
    }

    let newArray =  words.sort(() => 0.5 - Math.random());
    let selected = newArray.slice(0, quant);
    let intersection = newArray.filter(element => currentWordBank.includes(element));
    let filteredArray = selected.filter(element => !intersection.includes(element));
    finalArray = [...finalArray, ...filteredArray];

    let formattedArray = finalArray.map((item) => {
      return { text: item, selected: false }
    });

    let newWordBank = [...formattedArray, ...wordBank];
    setWordBank(newWordBank);
  }

  
  const [injectSetting, setInjectSetting] = useState('replace');

  const onChangeInjectSetting = (e) => {
      setInjectSetting(e.target.id);
  }

  const onClickInject = () => {
    let newObjArray = [];
    let selectedWords = wordBank.filter((item) => item.selected === true);
    for (let i = 0; i < stanza.length; i++) {
      let randomIndex = Math.floor(Math.random() * selectedWords.length);
      if (stanza[i].selected) {
        if (injectSetting === 'replace') {
          newObjArray.push({ id: stanza[i].id, type: 'text', text: selectedWords[randomIndex].text, selected: true });
        } else if (injectSetting === 'add-before') {
          newObjArray.push({ id: stanza[i].id, type: 'text', text: selectedWords[randomIndex].text, selected: false });
          newObjArray.push(stanza[i]);
        } else if (injectSetting === 'add-after') {
          newObjArray.push(stanza[i]);
          newObjArray.push({ id: stanza[i].id + 1, type: 'text', text: selectedWords[randomIndex].text, selected: false });
        }
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
  }

  const onClickShowSrc = () => {
    if (padToShow !== 'input') {
      setPadToShow('input');
    } else {
      setPadToShow('stanza');
    }
  }

  const [genType, setGenType] = useState('original');

  
  const onSetGenType = (e) => {
    setGenType(e.target.value);
  }

  const [string, setString] = useState(inputString);

    
  const onChangeString = (e) => {
    setString(e.target.value)
    setInputString(e.target.value)
  }

  const onClickImportAsStanza = () => {
    setStanza(treatString(string));
    setPadToShow('stanza');
  }

  const onSaveToWordBank = () => {
    let newObjArray = [];
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push({ text: stanza[i].text, selected: false });
      }
    }
    let newWordBank = [...wordBank, ...newObjArray];
    let jsonObject = newWordBank.map(JSON.stringify);
    let uniqueSet = new Set(jsonObject);
    let uniqueWordBank = Array.from(uniqueSet).map(JSON.parse);
    setWordBank(uniqueWordBank);
  }

  const onResizeText = (value) => {
    let newObjArray = [];
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {fontSize: value} });
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
  }

  const onChangeTextColour = (value) => {
    let newObjArray = [];
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {colour: value} });
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
  }

  // useEffect(() => {
  //   let m = markov(1);
  //   m.seed(source, console.log(m.pick()));
  //   // console.log(seededM)
  // }, [inputString])

  const [showEditWordBank, setShowEditWordBank] = useState(false);
  const [showAddWordBank, setShowAddWordBank] = useState(false);

  const gptBirdArray = 
  {name: 'gpt bird words', words: ["Feather", "Beak", "Wing", "Flight", "Nest", "Avian", "Plumage", "Song", "Talon", "Perch", 
  "Flock", "Migration", "Preen", "Roost", "Hatchling", "Predator", "Prey", "Ornithology", 
  "Birdwatching", "Chirp", "Peck", "Raptor", "Migrate", "Caw", "Quill", "Migration", "Molt", 
  "Parrot", "Owl", "Hawk", "Eagle", "Sparrow", "Swallow", "Hummingbird", "Penguin", "Pelican", 
  "Seagull", "Duck", "Goose", "Heron", "Crane", "Pigeon", "Flamingo", "Robin", "Bluejay", 
  "Cardinal", "Finch", "Toucan", "Woodpecker", "Crow", "Nightingale", "Canary", "Wren", "Magpie", 
  "Kingfisher", "Vulture", "Albatross", "Ostrich", "Emu", "Kiwi", "Cassowary", "Roadrunner", "Dodo", 
  "Condor", "Puffin", "Raven", "Starling", "Stork", "Swift", "Tern", "Titmouse", "Warbler", 
  "Whip-poor-will", "Plover", "Grebe", "Egret", "Jay", "Blackbird", "Gull", "Lark", "Nuthatch", 
  "Osprey", "Peafowl", "Rail", "Sandpiper", "Shrike", "Skua", "Siskin", "Spoonbill", "Swiftlet", 
  "Tanager", "Tern", "Thrasher", "Thrush", "Tropicbird", "Turaco", "Turnstone", "Veery", "Vireo", "Weka"]};

  const demoArrayOfArrays = [gptBirdArray, {name: 'basically-empty', words: ['only']}, {name: 'basic1', words: ['hello', 'world', 'hi', 'bye', 'eat', 'fish', 'go', 'bum', 'deal', 'gimp', 'legend', 'fruit', 'potion', 'belt', 'mane', 'transcend', 'glimpse', 'fisherman', 'spoke', 'gun', 'easy', 'fourteen', 'blend']}];

  const [allWordLists, setAllWordLists] = useState(demoArrayOfArrays);
  const [selectedWordList, setSelectedWordList] = useState(allWordLists[0]);

  const onSetSelectedWordList = (list) => {
    setSelectedWordList(list);
  }

  const onOpenWordBankEdit = () => {
    if (showEditWordBank) {
      setShowEditWordBank(false);
    } else {
      setShowEditWordBank(true);
  }
  }

  const onOpenWordBankAdd = () => {
    if (showAddWordBank) {
      setShowAddWordBank(false);
    } else {
      setShowAddWordBank(true);
  }
  }

  const onUpdateWordBankEdit = (name, words) => {
    let newWordsArray = words;
    let newWordList = {name: name, words: newWordsArray};
    setSelectedWordList(newWordList);
  }

  const onAddWordBankEdit = (name, words) => {
    let newWordsArray = words;
    let newWordList = {name: name, words: newWordsArray};
    setSelectedWordList(newWordList);
    setAllWordLists([...allWordLists, newWordList]);
  }

  const [outputBgColour, setOutputBgColour] = useState('#fff');

  const onChangeOutputBgColour = (hex) => {
    setOutputBgColour(hex);
  }


  if (!outputMode) {
  return (
    <div className={classes.background}>
      <div className={classes.bigContainer}>
    <div className={classes.pageContainer}>
      <div className={classes.pageContent}> 
        { padToShow === 'stanza' && 
        <>
        <div className={classes.globalSection}>
          <span>SLo-FiLM</span>
          <SaveLoad poem={poem} poemTitle={poemTitle}/>
          <span>Current Form: {form}</span>
        </div>
        <div className={classes.inputSection}>
          <GenerateControls getStress={getStress} formStyle={formStyle} padToShow={padToShow} onClickShowSrc={onClickShowSrc} treatString={treatString} string={string} form={form} onUpdate={onUpdate} genType={genType} onSetGenType={onSetGenType}/>
          <FormStyleSwitch formStyle={formStyle} onSetFormStyle={onSetFormStyle}/>
        </div>
        </>
        }
        { padToShow === 'stanza' && 
          <div className={classes.stanzaPadSection}>
            <StanzaPad stanza={stanza} onWordClick={onWordClick}/>
            <div className={classes.toolsContainer}>
              <StanzaPadButtons onSaveToWordBank={onSaveToWordBank} onSelectAllWords={onSelectAllWords} onUnselectAllWords={onUnselectAllWords} onDeleteSelectedWords={onDeleteSelectedWords} onDuplicateSelectedWords={onDuplicateSelectedWords}/>
              <StanzaUndoRedo setStanza={setStanza} setOldStanza={setOldStanza} stanza={stanza} oldStanza={oldStanza} />
              <OnSaveStanzaToPad editExistingStanzaMode={editExistingStanzaMode} onSaveStanzaToPad={onSaveStanzaToPad} onUpdateStanzaToPad={onUpdateStanzaToPad}/> 
            </div>
          </div>
        }
        { padToShow === 'poem' &&
          <div className={classes.poemPadSection}>
            <PoemPad onUpdatePoem={onUpdatePoem} poem={poem} onEditStanza={onEditStanza} /> 
          </div>
        }

        { padToShow === 'input' &&
        <div className={classes.inputPadSection}>
          <SourcePad onClickImportAsStanza={onClickImportAsStanza} onClickShowSrc={onClickShowSrc} onChangeString={onChangeString} string={string} form={form} treatString={treatString} setInputString={setInputString} inputString={inputString} setStanza={setStanza} setOldStanza={setOldStanza} stanza={stanza}/> 
        </div>
        }
        
        { padToShow === 'stanza' && 
          <>
          <div className={classes.processSection}>
            <span>PROCESS</span>
            <ReplaceWithHello onUpdate={onUpdate} stanza={stanza}/> 
            <ResizeText onResizeText={onResizeText}/>
            <ColourText onChangeTextColour={onChangeTextColour}/>
          </div>
          <div className={classes.composeSection}>
            <span>COMPOSE</span>
            { (!showEditWordBank && !showAddWordBank) &&
            <>
            <PopulateWordBank onOpenWordBankAdd={onOpenWordBankAdd} allWordLists={allWordLists} selectedWordList={selectedWordList} onSetSelectedWordList={onSetSelectedWordList} onOpenWordBankEdit={onOpenWordBankEdit} onPopulateWordBank={onPopulateWordBank}/>
            <WordBank deleteSelectedWordBank={deleteSelectedWordBank} selectAllWordBank={selectAllWordBank} unselectAllWordBank={unselectAllWordBank} onWordBankClick={onWordBankClick} wordBank={wordBank}/>
            <InjectControls onClickInject={onClickInject} onChangeInjectSetting={onChangeInjectSetting} injectSetting={injectSetting}/> 
            </>
            }
            { showEditWordBank &&
            <WordBankEdit onUpdateWordBankEdit={onUpdateWordBankEdit} onOpenWordBankEdit={onOpenWordBankEdit} selectedWordList={selectedWordList}/>
            }
            { showAddWordBank &&
            <WordBankAdd onAddWordBankEdit={onAddWordBankEdit} onOpenWordBankAdd={onOpenWordBankAdd}/>
            }
          </div>
          </>
        }
        { padToShow !== 'input' &&
        <>
          <div className={classes.outputSection}>
            <button className={classes.button} onClick={onClickShowAsLines}>OUTPUT AS LINES</button>
            <SaveOutputToTxt poem={poem} />
            <GiveTitle onSetPoemTitle={onSetPoemTitle} poemTitle={poemTitle}/>
          </div>
          <div className={classes.switcherSection}>
            <PadSwitcher onSwitchPad={onSwitchPad} />
          </div>
        </>
        }

      </div> 
    </div>
    </div>
    </div>
  );
  } else {
    return (
      <div style={{background: outputBgColour}} className={classes.pageContainerOutput}>
        <div className={classes.poemContent}>
        { showAsLines && 
        <>
        <ShowAsLines onChangeOutputBgColour={onChangeOutputBgColour} poem={poem} poemTitle={poemTitle} onLeaveOutputMode={onLeaveOutputMode}/> 
        </>
        }
        </div>
      </div>
    )
  }
};

export default Genny;
