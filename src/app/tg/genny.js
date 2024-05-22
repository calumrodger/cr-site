'use client';

import classes from './genny.module.scss';
import { useState, useEffect } from 'react';
import { syllable } from 'syllable';
import { dictionary } from 'cmu-pronouncing-dictionary';

// GLOBAL COMPONENTS
import SaveLoad from '@tg/global/save-load';
import PadSwitcher from '@tg/global/pad-switcher';
import StatusBar from '@tg/global/status-bar';
import CurrentForm from '@tg/global/current-form';
import Title from '@tg/global/title';

// GENERATE COMPONENTS
import GenerateControls from '@tg/generate/generate-controls';

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
import ResizeText from '@tg/fx/form/text-size';
import ColourText from '@tg/fx/form/text-colour';
import ReweightText from '@tg/fx/form/text-weight';
import FontStyle from '@tg/fx/form/text-style';
import FontText from '@tg/fx/form/text-font';
import FormResetButton from '@tg/fx/form/reset-button';
import TypographyButtons from '@tg/fx/form/wee-buttons';

import NPlusX from '@tg/fx/content/n-plus-x';
import APIFX from '@tg/fx/content/api';
import LLMFX from '@tg/fx/content/llm';

// OUTPUT COMPONENTS
import GiveTitle from '@tg/output/give-title';
import SaveOutputToTxt from '@tg/output/save-to-txt';
import OutputAs from '@tg/output/output-as';
import ShowAsLines from '@tg/output/show-as-lines';
import ShowAsGrid from '@tg/output/show-as-grid';
import ShowAsSlides from '@tg/output/show-as-slides';
import ShowAsLoop from '@tg/output/show-as-loop';


const Genny = (props) => {

  

  const gptBirdArray = 
  {id: 0, name: 'gpt bird words', words: [ 'feather',        'beak',        'wing',         'flight',
  'nest',           'avian',       'plumage',      'song',
  'talon',          'perch',       'flock',        'migration',
  'preen',          'roost',       'hatchling',    'predator',
  'prey',           'ornithology', 'birdwatching', 'chirp',
  'peck',           'raptor',      'migrate',      'caw',
  'quill',          'migration',   'molt',         'parrot',
  'owl',            'hawk',        'eagle',        'sparrow',
  'swallow',        'hummingbird', 'penguin',      'pelican',
  'seagull',        'duck',        'goose',        'heron',
  'crane',          'pigeon',      'flamingo',     'robin',
  'bluejay',        'cardinal',    'finch',        'toucan',
  'woodpecker',     'crow',        'nightingale',  'canary',
  'wren',           'magpie',      'kingfisher',   'vulture',
  'albatross',      'ostrich',     'emu',          'kiwi',
  'cassowary',      'roadrunner',  'dodo',         'condor',
  'puffin',         'raven',       'starling',     'stork',
  'swift',          'tern',        'titmouse',     'warbler',
  'whip-poor-will', 'plover',      'grebe',        'egret',
  'jay',            'blackbird',   'gull',         'lark',
  'nuthatch',       'osprey',      'peafowl',      'rail',
  'sandpiper',      'shrike',      'skua',         'siskin',
  'spoonbill',      'swiftlet',    'tanager',      'tern',
  'thrasher',       'thrush',      'tropicbird',   'turaco',
  'turnstone',      'veery',       'vireo',        'weka']};

  const demoArrayOfArrays = [gptBirdArray, {id: 1, name: 'basically-empty', words: ['only']}, {id: 2, name: 'basic1', words: ['hello', 'world', 'hi', 'bye', 'eat', 'fish', 'go', 'bum', 'deal', 'gimp', 'legend', 'fruit', 'potion', 'belt', 'mane', 'transcend', 'glimpse', 'fisherman', 'spoke', 'gun', 'easy', 'fourteen', 'blend']}];

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
  
  // Words
  // const [string, setString] = useState('I am a happy person who likes eating chips.');
  const [oldStanza, setOldStanza] = useState([]);
  const [poem, setPoem] = useState([]);
  const [poemTitle, setPoemTitle] = useState('');
  const [wordBank, setWordBank] = useState([{id: 0, text: 'hello', selected: false}, {id: 1, text: 'world', selected: false}]);
  const [allWordLists, setAllWordLists] = useState(demoArrayOfArrays);
  const [selectedWordList, setSelectedWordList] = useState(allWordLists[0]);
  const [presetArray, setPresetArray] = useState([{id: 0, name: 'preset1', text: 'hello world'}, {id: 1, name: 'preset2', text: 'goodbye world'}, {id: 2, name: 'preset3', text: 'hello goodbye world'}])
  const [currentPreset, setCurrentPreset] = useState(presetArray[0]);
  const [stanza, setStanza] = useState(treatString(source));
  const [statusMessage, setStatusMessage] = useState('welcome in genny')

  // Settings
  const [form, setForm] = useState('');
  const [formStyle, setFormStyle] = useState('syllable');
  const [genType, setGenType] = useState('stanza');
  const [nLevel, setNLevel] = useState("-1");
  const [outputMode, setOutputMode] = useState('none');
  const [outputCheckbox, setOutputCheckbox] = useState('lines');  

  // Switches
  const [padToShow, setPadToShow] = useState('stanza');
  const [editExistingStanzaMode, setEditExistingStanzaMode] = useState(false);
  const [editStanzaIndex, setEditStanzaIndex] = useState(null);
  const [injectSetting, setInjectSetting] = useState('replace');
  const [showEditWordBank, setShowEditWordBank] = useState(false);
  const [showAddWordBank, setShowAddWordBank] = useState(false);

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

  useEffect(() => {
    if (formStyle === 'syllable') {
      setForm(detectFormSyllable(stanza));
    } else {
      setForm(detectFormStress(stanza));
    }
  }, [stanza, formStyle])


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
        return { id: item.id, text: item.text, selected: item.selected ? false : true}
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
    const currentPoemLength = poem.length;
    const newStanzaId = currentPoemLength + 1;
    setPoem(poem => [...poem, {id: newStanzaId, stanza: stanza, selected: false}]);
  }

  const onUpdatePoem = (newPoem) => {
    setPoem(newPoem);
  }

  const onUpdateStanzaToPad = () => {
    const currentPoemLength = poem.length;
    const newPoemId = currentPoemLength + 1;
    let newOrder = [...poem];
    newOrder[editStanzaIndex] = {id: newPoemId, stanza: stanza, selected: false};
    setPoem(newOrder);
    setEditExistingStanzaMode(false);
    setPadToShow('poem');
  }

  const onLeaveOutputMode = () => {
    setOutputMode('none');
  }

  const onClickOutput = (type) => {
    if (padToShow === 'stanza') {
      setOutputMode('lines');
    } else {
      setOutputMode(type);
    }
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
      return { id: item.id, text: item.text, selected: true }
    }
    );
    setWordBank(newObjArray);
  }

  const unselectAllWordBank = () => {
    let newObjArray = wordBank.map((item) => {
      return { id: item.id, text: item.text, selected: false }
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

    let formattedArray = finalArray.map((item, i) => {
      return { id: i, text: item, selected: false }
    });

    let newWordBank = [...formattedArray, ...wordBank];
    setWordBank(newWordBank);
  }

  const onChangeInjectSetting = (e) => {
      setInjectSetting(e.target.value);
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

  const onClickShowSrc = (preset) => {
    if (padToShow !== 'input') {
      setPadToShow('input');
    } else {
      setPadToShow('stanza');
    }
  }

  const onSetGenType = (e) => {
    setGenType(e);
  }
  
  // const onChangeString = (e) => {
  //   setString(e.target.value)
  // }

  const onChangeCurrentPreset = (e) => {
    let newPreset = presetArray.find((item) => item.name === e.target.value);
    setCurrentPreset(newPreset);
  }

  const onClickImportAsStanza = () => {
    const formattedString = currentPreset.text.replace('\n', ' \n ')
    setStanza(treatString(formattedString));
    setPadToShow('stanza');
  }

  const onSaveToWordBank = () => {
    let newObjArray = [];
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push({ id: stanza[i].id, text: stanza[i].text, selected: false });
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
    if (padToShow === 'stanza') {
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {...stanza[i]?.style, fontSize: value} });
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
    }
    if (padToShow === 'poem') {
      for (let i = 0; i < poem.length; i++) {
        if (poem[i].selected) {
          newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {...poem[i]?.style, fontSize: value} });
        } else {
          newObjArray.push(poem[i]);
        }
      }
      setPoem(newObjArray);
    }
  }

  const onResetTypography = () => {
    let newObjArray = [];
    if (padToShow === 'stanza') {
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {} });
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
    }
    if (padToShow === 'poem') {
      for (let i = 0; i < poem.length; i++) {
        if (poem[i].selected) {
          newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {} });
        } else {
          newObjArray.push(poem[i]);
        }
      }
      setPoem(newObjArray);
    }
  }

  const onReweightText = (value) => {
    let newObjArray = [];
    if (padToShow === 'stanza') {
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {...stanza[i]?.style, fontWeight: value} });
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
    }
    if (padToShow === 'poem') {
      for (let i = 0; i < poem.length; i++) {
        if (poem[i].selected) {
          newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {...poem[i]?.style, fontWeight: value} });
        } else {
          newObjArray.push(poem[i]);
        }
      }
      setPoem(newObjArray);
    }
  }

  const onChangeTextColour = (value) => {

    if (padToShow === 'stanza') {
    let newObjArray = [];
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {...stanza[i]?.style, color: value} });
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
    }
    if (padToShow === 'poem') {
      let newObjArray = [];
      for (let i = 0; i < poem.length; i++) {
        if (poem[i].selected) {
          newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {...poem[i]?.style, color: value} });
        } else {
          newObjArray.push(poem[i]);
        }
      }
      console.log(newObjArray)
      setPoem(newObjArray);
    }
  }

  const onSetSelectedWordList = (listName) => {
    let list = allWordLists.find((item) => item.name === listName);
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
    const id = allWordLists.length - 1;
    let newWordList = {id: id, name: name, words: newWordsArray};
    setSelectedWordList(newWordList);
    setAllWordLists([...allWordLists, newWordList]);
  }

  const [outputBgColour, setOutputBgColour] = useState('#fff');

  const onChangeOutputBgColour = (hex) => {
    setOutputBgColour(hex);
  }

  const onChangeOutputCheckbox = (outputType) => {
    setOutputCheckbox(outputType);
  }

  const onSetNLevel = (e) => {
    setNLevel(e);
  }

  const onChangeFont = (value) => {
    let newObjArray = [];
    let font = '';
    switch (value) {
      case '1':
        font = 'var(--league-spartan)';
        break;
      case '2':
        font = 'var(--lexend)';
        break;
      case '3':
        font = 'var(--league-script)';
        break;
      case '4':
        font = 'var(--teachers)';
        break;
      default:
        font = 'var(--lexend)';
        break;
    }

    if (padToShow === 'stanza') {
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {...stanza[i]?.style, fontFamily: font} });
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
    }
    if (padToShow === 'poem') {
      for (let i = 0; i < poem.length; i++) {
        if (poem[i].selected) {
          newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {...poem[i]?.style, fontFamily: font} });
        } else {
          newObjArray.push(poem[i]);
        }
      }
      setPoem(newObjArray);
    }
  }

  const onChangeTextRotation = (value) => {
    let newObjArray = [];
    if (padToShow === 'stanza') {
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {...stanza[i]?.style, opacity: value} });
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
    }
    if (padToShow === 'poem') {
      for (let i = 0; i < poem.length; i++) {
        if (poem[i].selected) {
          newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {...poem[i]?.style, opacity: value} });
        } else {
          newObjArray.push(poem[i]);
        }
      }
      setPoem(newObjArray);
    }
  }

  const onSaveNewPreset = (presetName, text) => {
    const id = presetArray.length - 1;
    const newArray = [...presetArray, {id: id, name: presetName, text: text}];
    setPresetArray(newArray);
    setCurrentPreset({id: id, name: presetName, text: text});
  }

  const onOverwritePreset = (presetName, text) => {
    const id = currentPreset.id;
    const presetInArray = presetArray.find((item) => item.id === id);
    let newArray = []
    for (let i = 0; i < presetArray.length; i++) {
      if (presetArray[i].id === id) {
        newArray.push({id: id, name: presetName, text: text});
      } else {
        newArray.push(presetArray[i]);
      }
    }
    setPresetArray(newArray);
    setCurrentPreset({id: id, name: presetName, text: text});
  }

  const onSelectPreset = (presetName) => {
    const preset = presetArray.find((item) => item.name === presetName);
    setCurrentPreset(preset)
  }

  const onSetCurrentPresetName = (name) => {
    setCurrentPreset({...currentPreset, name: name});
  }

  const onSetCurrentPresetText = (text) => {
    setCurrentPreset({...currentPreset, text: text});
  }

  const onSetItalic = () => {
    let newObjArray = [];
    if (padToShow === 'stanza') {
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        if (stanza[i]?.style?.fontStyle === "italic") {
          newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {...stanza[i]?.style, fontStyle: "normal"} });
        } else {
          newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {...stanza[i]?.style, fontStyle: "italic"} });
        }
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
    }
    if (padToShow === 'poem') {
      for (let i = 0; i < poem.length; i++) {
        if (poem[i].selected) {
          if (poem[i]?.style?.fontStyle === "italic") {
            newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {...poem[i]?.style, fontStyle: "normal"} });
          } else {
            newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {...poem[i]?.style, fontStyle: "italic"} });
          }
        } else {
          newObjArray.push(poem[i]);
        }
      }
      setPoem(newObjArray);
    }
  }

  const onSetMirror = () => {
    let newObjArray = [];
    if (padToShow === 'stanza') {
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        if (stanza[i]?.style?.transform === "scaleX(-1)") {
          newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {...stanza[i]?.style, transform: "none"} });
        } else {
        newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {...stanza[i]?.style, transform: "scaleX(-1)"} });
        }
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
    }
    if (padToShow === 'poem') {
      for (let i = 0; i < poem.length; i++) {
        if (poem[i].selected) {
          if (poem[i]?.style?.transform === "scaleX(-1)") {
            newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {...poem[i]?.style, transform: "none"} });
          } else {
          newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {...poem[i]?.style, transform: "scaleX(-1)"} });
          }
        } else {
          newObjArray.push(poem[i]);
        }
      }
      setPoem(newObjArray);
    }
  }

  const onSetCaps = () => {
    let newObjArray = [];
    if (padToShow === 'stanza') {
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        if (stanza[i]?.style?.textTransform === "uppercase") {
          newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {...stanza[i]?.style, textTransform: null} });
        } else {
        newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {...stanza[i]?.style, textTransform: "uppercase"} });
        }
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
    }
    if (padToShow === 'poem') {
      for (let i = 0; i < poem.length; i++) {
        if (poem[i].selected) {
          if (poem[i]?.style?.textTransform === "uppercase") {
            newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {...poem[i]?.style, textTransform: null} });
          } else {
          newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {...poem[i]?.style, textTransform: "uppercase"} });
          }
        } else {
          newObjArray.push(poem[i]);
        }
      }
      setPoem(newObjArray);
    }
  }

  const onSetErasure = () => {
    let newObjArray = [];
    if (padToShow === 'stanza') {
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        if (stanza[i]?.style?.visibility === "hidden") {
          newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {...stanza[i]?.style, visibility: null} });
        } else {
        newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: stanza[i].selected, style: {...stanza[i]?.style, visibility: "hidden"} });
        }
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
    }
    if (padToShow === 'poem') {
      for (let i = 0; i < poem.length; i++) {
        if (poem[i].selected) {
          if (poem[i]?.style?.visibility === "hidden") {
            newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {...poem[i]?.style, visibility: null} });
          } else {
          newObjArray.push({ id: poem[i].id, stanza: poem[i].stanza, selected: poem[i].selected, style: {...poem[i]?.style, visibility: "hidden"} });
          }
        } else {
          newObjArray.push(poem[i]);
        }
      }
      setPoem(newObjArray);
    }
  }

  const onSaveWordBankAsList = () => {
    const id = allWordLists.length - 1;
    let words = [];
    for (let i = 0; i < wordBank.length; i++) {
      if (wordBank[i].selected === true) {
        words.push(wordBank[i].text);
      }
    }
    const wordsString = words.join(', ');
    setAllWordLists([...allWordLists, {id: id, name: 'new list', words: words}]);
  }

  const onSetStatusMessage = (message) => {
    setStatusMessage(message);
  }



  if (outputMode === 'none') {
  return (
    <div className={classes.background}>
      <div className={classes.bigContainer}>
    <div className={classes.pageContainer}>
      <div className={classes.pageContent}> 
        { padToShow === 'stanza' && 
        <>
        <div className={classes.globalSection}>
          <div className={classes.saveButtonsSection}>
            <SaveLoad poem={poem} poemTitle={poemTitle}/>
          </div>
          <div className={classes.titleSection}>
            <Title />
          </div>
          <div className={classes.statusSection}>
            <StatusBar statusMessage={statusMessage} onSetStatusMessage={onSetStatusMessage}/>
          </div>
          <div className={classes.formSection}>
            <CurrentForm form={form} />
          </div>
        </div>
        <div className={classes.inputSection}>
          <GenerateControls editExistingStanzaMode={editExistingStanzaMode} onSaveStanzaToPad={onSaveStanzaToPad} onUpdateStanzaToPad={onUpdateStanzaToPad} onSelectPreset={onSelectPreset}  presetArray={presetArray} currentPreset={currentPreset} nLevel={nLevel} onSetNLevel={onSetNLevel} getStress={getStress} formStyle={formStyle} onSetFormStyle={onSetFormStyle}padToShow={padToShow} onClickShowSrc={onClickShowSrc} treatString={treatString} form={form} onUpdate={onUpdate} genType={genType} onSetGenType={onSetGenType}/>
          
        </div>
        </>
        }
        { padToShow === 'stanza' && 
          <div className={classes.stanzaPadSection}>
            <StanzaPad stanza={stanza} onWordClick={onWordClick}/>
            <div className={classes.toolsContainer}>
              <StanzaPadButtons setStanza={setStanza} setOldStanza={setOldStanza} stanza={stanza} oldStanza={oldStanza} onSaveToWordBank={onSaveToWordBank} onSelectAllWords={onSelectAllWords} onUnselectAllWords={onUnselectAllWords} onDeleteSelectedWords={onDeleteSelectedWords} onDuplicateSelectedWords={onDuplicateSelectedWords}/>
              
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
          <SourcePad onSetCurrentPresetName={onSetCurrentPresetName} onSetCurrentPresetText={onSetCurrentPresetText} onSelectPreset={onSelectPreset} presetArray={presetArray} onSaveNewPreset={onSaveNewPreset} onOverwritePreset={onOverwritePreset} onClickImportAsStanza={onClickImportAsStanza} onClickShowSrc={onClickShowSrc} onChangeCurrentPreset={onChangeCurrentPreset} currentPreset={currentPreset}/> 
        </div>
        }
        
        { padToShow === 'stanza' && 
          <>
          <div className={classes.fxSection}>
          <span>TYPOGRAPHY</span>
            <div className={classes.fxTypographyGrid}>
              <ResizeText onResizeText={onResizeText}/>
              <ReweightText onReweightText={onReweightText}/>
              <FontText onChangeFont={onChangeFont} />
              <FontStyle onChangeTextRotation={onChangeTextRotation} />
       
            </div>
            <div className={classes.fxTypographyFlex}>
            <ColourText onChangeTextColour={onChangeTextColour}/>
            <TypographyButtons onSetErasure={onSetErasure} onSetCaps={onSetCaps} onSetItalic={onSetItalic} onSetMirror={onSetMirror}/>
            <FormResetButton onResetTypography={onResetTypography} />
            </div>
            < hr/>
            <span>N + X</span>
            <NPlusX onUpdate={onUpdate} stanza={stanza}/> 
            <hr />

            <span>API INJECTION</span>
            <APIFX onUpdate={onUpdate} stanza={stanza}/>
            <hr />
            <span>LLM </span>
            <LLMFX onUpdate={onUpdate} stanza={stanza}/>
            <hr />
          </div>
          <div className={classes.composeSection}>
            { (!showEditWordBank && !showAddWordBank) &&
            <>
            <WordBank onSaveWordBankAsList={onSaveWordBankAsList} deleteSelectedWordBank={deleteSelectedWordBank} selectAllWordBank={selectAllWordBank} unselectAllWordBank={unselectAllWordBank} onWordBankClick={onWordBankClick} wordBank={wordBank}/>
            <InjectControls onClickInject={onClickInject} onChangeInjectSetting={onChangeInjectSetting} injectSetting={injectSetting}/> 
            <PopulateWordBank onOpenWordBankAdd={onOpenWordBankAdd} allWordLists={allWordLists} selectedWordList={selectedWordList} onSetSelectedWordList={onSetSelectedWordList} onOpenWordBankEdit={onOpenWordBankEdit} onPopulateWordBank={onPopulateWordBank}/>
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
        { padToShow === 'poem' && 
          <>
          <div className={classes.fxSection}>
          <span>TYPOGRAPHY</span>
            <div className={classes.fxTypographyGrid}>
              <ResizeText onResizeText={onResizeText}/>
              <ReweightText onReweightText={onReweightText}/>
              <FontText onChangeFont={onChangeFont} />
              <FontStyle onChangeTextRotation={onChangeTextRotation} />
       
            </div>
            <div className={classes.fxTypographyFlex}>
            <ColourText onChangeTextColour={onChangeTextColour}/>
            <TypographyButtons onSetErasure={onSetErasure} onSetCaps={onSetCaps} onSetItalic={onSetItalic} onSetMirror={onSetMirror}/>
            <FormResetButton onResetTypography={onResetTypography} />
            </div>
            < hr/>
          </div>
          </>
        }
        { padToShow !== 'input' &&
        <>
          <div className={classes.outputSection}>
            <GiveTitle onSetPoemTitle={onSetPoemTitle} poemTitle={poemTitle}/>
            <OutputAs padToShow={padToShow} onClickOutput={onClickOutput} outputCheckbox={outputCheckbox} onChangeOutputCheckbox={onChangeOutputCheckbox}/>
          </div>
          <div className={classes.switcherSection}>
            <PadSwitcher onSwitchPad={onSwitchPad} padToShow={padToShow}/>
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
        { outputMode === 'lines' && 
        <ShowAsLines stanza={stanza} padToShow={padToShow} onChangeOutputBgColour={onChangeOutputBgColour} poem={poem} poemTitle={poemTitle} onLeaveOutputMode={onLeaveOutputMode}/> 
        }
        { outputMode === 'grid' &&
        <ShowAsGrid onChangeOutputBgColour={onChangeOutputBgColour} poem={poem} poemTitle={poemTitle} onLeaveOutputMode={onLeaveOutputMode}/>
        }
        { outputMode === 'slides' &&
        <ShowAsSlides onChangeOutputBgColour={onChangeOutputBgColour} poem={poem} poemTitle={poemTitle} onLeaveOutputMode={onLeaveOutputMode}/>
        }
        { outputMode === 'loop' &&
        <ShowAsLoop onChangeOutputBgColour={onChangeOutputBgColour} poem={poem} poemTitle={poemTitle} onLeaveOutputMode={onLeaveOutputMode}/>
        }
        </div>
      </div>
    )
  }
};

export default Genny;
