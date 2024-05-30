'use client';

import classes from './genny.module.scss';
import { useState, useEffect, useRef } from 'react';
import { syllable } from 'syllable';
import { dictionary } from 'cmu-pronouncing-dictionary';
import { getDictionary } from '@tg/server-actions/actions';

// PRESETS
import { emily } from '../../../public/tg/presets/emily';
import { flatland } from '../../../public/tg/presets/flatland';

// GLOBAL COMPONENTS
import SaveLoad from '@tg/global/save-load';
import PadSwitcher from '@tg/global/pad-switcher';
import StatusBar from '@tg/global/status-bar';
import CurrentForm from '@tg/global/current-form';
import Title from '@tg/global/title';
import PoemLength from '@tg/global/poem-length';
import BaseFont from '@tg/global/base-font';

// GENERATE COMPONENTS
import GenerateControls from '@tg/generate/generate-controls';

// SOURCE PAD COMPONENTS
import SourcePad from '@tg/source-pad/source-pad';

// STANZA PAD COMPONENTS
import StanzaPad from '@tg/stanza-pad/stanza-pad';
import StanzaPadButtons from '@tg/stanza-pad/stanza-pad-buttons';

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
import OutputAs from '@tg/output/output-as';
import ShowAsLines from '@tg/output/show-as-lines';
import ShowAsGrid from '@tg/output/show-as-grid';
import ShowAsSlides from '@tg/output/show-as-slides';
import ShowAsLoop from '@tg/output/show-as-loop';
import { format } from 'path';
import { buildNGrams } from 'word-ngrams';


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

  // const dictRef = useRef([]);

  // const getTheDictionary = async () => {
  //   setStatusMessage('loading dictionary');
  //     const theDictionary = await getDictionary();
  //     return theDictionary;
  // }

  //   useEffect(() => {
  //       getTheDictionary().then((dictionary) => {
  //           dictRef.current = dictionary
  //       }).then(() => setStatusMessage('dict loaded'));
  //   }, [])

  useEffect(() => {
    // console.log(buildNGrams(emily.text, 3, {includePunctuation: true}))
    // console.log(getStress(`"hello!" why? am I alive...`))
    // getStress("o !!!! dnkffnds splash a a a a a the the of of of of of of of j")
  })

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
      if (finalList[finalList.length - 1]?.type === 'break') {
        finalList.pop();
      }
    return finalList;
  }

  const treatImportString = (input) => {
    const sourceArray = input.split("\n");
    let formattedArray = [];
    for (let i = 0; i < sourceArray.length; i++) {
      if (sourceArray[i] === '') {
        formattedArray.push(' \n ');
      } else {
        formattedArray.push(sourceArray[i]);
        formattedArray.push(' \n ');
      }
    } 
    formattedArray.pop();
    const newString = formattedArray.join("");
    const newArray = newString.split(" ")
    const filteredEmpties = newArray.filter((item) => item !== "");
    const finalList = filteredEmpties.map((item, index) => {
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
  const [presetArray, setPresetArray] = useState([emily, flatland])
  const [currentPreset, setCurrentPreset] = useState(presetArray[0]);
  const [stanza, setStanza] = useState(treatString(source));
  const [statusMessage, setStatusMessage] = useState('welcome in genny')

  // Settings
  const [form, setForm] = useState('5/7/5');
  const [formStyle, setFormStyle] = useState('syllable');
  const [genType, setGenType] = useState('stanza');
  const [nLevel, setNLevel] = useState("10");
  const [outputMode, setOutputMode] = useState('none');
  const [outputCheckbox, setOutputCheckbox] = useState('lines');  
  const [updateStazaStyles, setUpdateStanzaStyles] = useState(null);
  const [outputBgColour, setOutputBgColour] = useState('#fff');
  const [outputTitleColour, setOutputTitleColour] = useState('#000');
  const [outputPoemColour, setOutputPoemColour] = useState('#000');
  const [baseFont, setBaseFont] = useState('var(--lexend)');
  const [wordBeingEdited, setWordBeingEdited] = useState('');
  const [punctCounter, setPunctCounter] = useState(0);

  // Switches
  const [padToShow, setPadToShow] = useState('stanza');
  const [editExistingStanzaMode, setEditExistingStanzaMode] = useState(false);
  const [editStanzaIndex, setEditStanzaIndex] = useState(null);
  const [injectSetting, setInjectSetting] = useState('replace');
  const [showEditWordBank, setShowEditWordBank] = useState(false);
  const [showAddWordBank, setShowAddWordBank] = useState(false);
  const [wordEditMode, setWordEditMode] = useState(false);
  const [loadingDict, setLoadingDict] = useState(false);

  const onLoadState = (state) => {
    setStatusMessage('loading state');
    setOldStanza(state.oldStanza);
    setPoem(state.poem);
    setPoemTitle(state.poemTitle);
    setWordBank(state.wordBank);
    setAllWordLists(state.allWordLists);
    setSelectedWordList(state.selectedWordList);
    setPresetArray(state.presetArray);
    setCurrentPreset(state.currentPreset);
    setStanza(state.stanza);
    setForm(state.form);
    setFormStyle(state.formStyle);
    setGenType(state.genType);
    setNLevel(state.nLevel);
    setOutputCheckbox(state.outputCheckbox);
    setUpdateStanzaStyles(state.updateStanzaStyles);
    setOutputBgColour(state.outputBgColour);
    setOutputTitleColour(state.outputTitleColour);
    setOutputPoemColour(state.outputPoemColour);
    setBaseFont(state.baseFont);
    setPunctCounter(state.punctCounter);
    setInjectSetting(state.injectSetting);
    setStatusMessage('state loaded')
  }

  const punctOptions = (count, word) => {

    let trimmedWord = word.replace(/[^\w\s\']|_/g, "");
    let finalWord = trimmedWord.replace(/\s+/g, " ").trim();
    switch (count) {
      case 0:
        return `${finalWord}.`;
      case 1:
        return `${finalWord},`;
      case 2:
        return `${finalWord}:`;
      case 3:
        return `${finalWord};`;
      case 4:
        return `${finalWord}!`;
      case 5:
        return `${finalWord}?`;
      case 6:
        return `${finalWord}...`;
      case 7:
        return `${finalWord} -`;
      case 8:
        return `*${finalWord}*`;
      case 9:
        return `(${finalWord})`;
      case 10:
        return `[${finalWord}]`;
      case 11:
        return `_${finalWord}_`;
      case 12:
        return `~${finalWord}~`;
        default: 
        return word;
  }
}

  const onAddPunct = (reverse) => {
    if (reverse) {
      if (punctCounter === 0) {
        setPunctCounter(12);
      } else {
        setPunctCounter(punctCounter - 1);
      }
    } else {
      if (punctCounter === 12) {
        setPunctCounter(0);
      } else {
        setPunctCounter(punctCounter + 1);
      }
    }

    let newObjArray = stanza.map((item, index) => {
      if (item.selected === true) {
        return { id: item.id, type: 'text', text: punctOptions(punctCounter, item.text), style: item?.style, selected: item.selected }
      } else {
        return item;
      }
    });
    setStanza(newObjArray);
  }

  const onSelectFont = (font) => {
    switch (font) {
      case 'lexend':
        setBaseFont('var(--lexend)');
        break;
      case 'serif':
        setBaseFont('serif');
        break;
      case 'sans-serif':
        setBaseFont('sans-serif');
        break;
      case 'cursive':
        setBaseFont('cursive');
        break;
      case 'monospace':
        setBaseFont('monospace');
        break;
      case 'fantasy':
        setBaseFont('fantasy');
        break;
      case 'math':
        setBaseFont('math');
        break;
      case 'system-ui':
        setBaseFont('system-ui');
        break;
      default:
        setBaseFont('--lexend');
        break;
    }
  }

  const onSetFormStyle = () => {
    if (formStyle === 'syllable') {
      setFormStyle('stress');
    } else {
      setFormStyle('syllable');
    }
  }

  const onSetWordBeingEdited = (e) => {
    setWordBeingEdited(e);
  }


  const getStress = (theString) => {
    if (theString === '' || theString === undefined) {
      return 0;
    }
    let wordsArray = theString.split(" ");
    let trimmedWordsArray = [];
    for (let i = 0; i < wordsArray.length; i++) {
      let wordForTrimming = wordsArray[i].trim();
      let trimmedWord = wordForTrimming.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      trimmedWordsArray.push(trimmedWord);
    }
    let stressArray = [];
    for (let i = 0; i < trimmedWordsArray.length; i++) {
      if (dictionary[trimmedWordsArray[i]] !== undefined) {
        stressArray.push(dictionary[trimmedWordsArray[i]]);
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
  
  const detectForm = (stanza, detector) => {
    let form = '';
    let syllableCounter = 0;
    let breakCount = 0;
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].text !== '\n') {
        syllableCounter = syllableCounter + detector(stanza[i].text);
      }
      if (stanza[i].text === '\n') {
        if (syllableCounter === 0 && breakCount === 0) {
          form = form
          breakCount++;
        } else if (syllableCounter === 0 && breakCount > 0) {
          form = form + '/';
          breakCount++;
        } else {
          breakCount = 0;
        form = form + syllableCounter.toString() + '/';
        syllableCounter = 0;
        }
      }
      if (i === stanza.length - 1) {
        form = form + syllableCounter.toString();
      }
    }
    return form;
  }

  useEffect(() => {
    if (formStyle === 'syllable') {
      setForm(detectForm(stanza, syllable));
    } else {
      setForm(detectForm(stanza, getStress));
    }
  }, [stanza, formStyle])


  const onWordClick = (e) => {
    if (!wordEditMode) {
    let newObjArray = stanza.map((item, index) => {
      if (index == e.target.id) {
        return { id: item.id, type: 'text', text: item.text, style: item?.style, selected: item.selected ? false : true}
      } else {
        return item;
      }
    });
    setStanza(newObjArray);
  } else {
    return;
  }
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

  const onUndoRedoStanza = () => {
    const oldOne = oldStanza;
    const newOne = stanza;
    setStanza(oldOne);
    setOldStanza(newOne);
  }


  const onSwitchPad = () => {
    if (padToShow === 'stanza') {
      setPadToShow('poem');
    } else {
      setPadToShow('stanza');
      setOutputCheckbox('lines');
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

  const onEditStanza = (stanza, stanzaIndex, stanzaStyle) => {
    setEditStanzaIndex(stanzaIndex);
    setStanza(stanza);
    setEditExistingStanzaMode(true);
    setPadToShow('stanza');
    setUpdateStanzaStyles(stanzaStyle);
  }

  const onSelectAllWords = () => {
    let newObjArray = stanza.map((item) => {
      if (item.type === 'text') {
        return { id: item.id, type: 'text', text: item.text, style: item?.style, selected: true }
      } else {
        return item;
      }
    });
    setStanza(newObjArray);
  }

  const onUnselectAllWords = () => { 
    let newObjArray = stanza.map((item) => {
      if (item.type === 'text') {
        return { id: item.id, type: 'text', text: item.text, style: item?.style, selected: false }
      } else {
        return item;
      }
    });
    setStanza(newObjArray);
  }

  useEffect(() => {
    let copyStanza = stanza;
    for (let i = 0; i < copyStanza.length; i++) {
      if (copyStanza[i].text === '') {
        copyStanza.splice(i, 1);
      }
    }
    setStanza(copyStanza);
  }, [stanza])

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
    let idCount = stanza.length + 1;
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push(stanza[i]);
        newObjArray.push({ id: idCount, type: 'text', text: stanza[i].text, selected: false })
        idCount++;
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
    let selectedStanzaWords = stanza.filter((item) => item.selected === true);
    if (selectedStanzaWords.length === 1) {
      for (let i = 0; i < stanza.length; i++) {
        if (stanza[i].selected) {
          if (injectSetting === 'replace') {
            for (let j = 0; j < selectedWords.length; j++) {
              newObjArray.push({ id: stanza[i].id, type: 'text', text: selectedWords[j].text, selected: false });
            }
          } else if (injectSetting === 'add-before') {
            for (let j = 0; j < selectedWords.length; j++) {
              newObjArray.push({ id: stanza[i].id, type: 'text', text: selectedWords[j].text, selected: false });
            }
            newObjArray.push(stanza[i]);
          } else if (injectSetting === 'add-after') {
            newObjArray.push(stanza[i]);
            for (let j = 0; j < selectedWords.length; j++) {
              newObjArray.push({ id: stanza[i].id, type: 'text', text: selectedWords[j].text, selected: false });
            }
          }
        } else {
          newObjArray.push(stanza[i]);
        }
      }
    } else {
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

  const onClickImportAsStanza = (text) => {
    setStanza(treatImportString(text));
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
    let newWordList = {id: selectedWordList.id, name: name, words: words};
    let newWordLists = allWordLists.map((item) => {
      if (item.id === selectedWordList.id) {
        return newWordList;
      } else {
        return item;
      }
    });
    setSelectedWordList(newWordList);
    setAllWordLists(newWordLists);
  }

  const onAddWordBankEdit = (name, words) => {
    let newWordsArray = words;
    const id = allWordLists.length - 1;
    let newWordList = {id: id, name: name, words: newWordsArray};
    setSelectedWordList(newWordList);
    setAllWordLists([...allWordLists, newWordList]);
  }

  const onChangeOutputBgColour = (hex) => {
    setOutputBgColour(hex);
  }

  const onChangeOutputTitleColour = (hex) => {
    setOutputTitleColour(hex);
  }

  const onChangeOutputPoemColour = (hex) => {
    setOutputPoemColour(hex);
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
        font = 'var(--lexend)';
        break;
      case '2':
        font = 'serif';
        break;
      case '3':
        font = 'sans-serif';
        break;
      case '4':
        font = 'monospace';
        break;
      case '5':
        font = 'cursive';
        break;
      case '6':
        font = 'fantasy';
        break;
      case '7':
        font = 'math';
        break;
      case '8':
        font = 'system-ui';
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
    const id = allWordLists.length;
    let words = [];
    for (let i = 0; i < wordBank.length; i++) {
      if (wordBank[i].selected === true) {
        words.push(wordBank[i].text);
      }
    }
    setAllWordLists([...allWordLists, {id: id, name: 'new list', words: words}]);
    setSelectedWordList({id: id, name: 'new list', words: words});
  }

  const onSetStatusMessage = (message) => {
    setStatusMessage(message);
  }

  function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

  const onShuffleStanza = () => {
    let selectedWords = [];
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        selectedWords.push(stanza[i].text);
      }
    }
    shuffle(selectedWords);
    let newObjArray = [];
    let shuffledWordsCount = 0;
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push({ id: stanza[i].id, type: 'text', text: selectedWords[shuffledWordsCount], style: stanza[i]?.style, selected: true });
        shuffledWordsCount++;
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
  }

  const onShuffleWordBank = () => {
    let selectedWords = [];
    for (let i = 0; i < wordBank.length; i++) {
      if (wordBank[i].selected) {
        selectedWords.push(wordBank[i]);
      }
    }
    shuffle(selectedWords);
    let unselectedWords = [];
    for (let i = 0; i < wordBank.length; i++) {
      if (!wordBank[i].selected) {
        unselectedWords.push(wordBank[i]);
      }
    }
    shuffle(unselectedWords)
    let newArray = [...selectedWords, ...unselectedWords];
    setWordBank(newArray);
  }

  const onShufflePoem = () => {
    let selectedStanzas = [];
    for (let i = 0; i < poem.length; i++) {
      if (poem[i].selected) {
        selectedStanzas.push(poem[i].stanza);
      }
    }
    shuffle(selectedStanzas);
    let newObjArray = [];
    let shuffledStanzasCount = 0;
    for (let i = 0; i < poem.length; i++) {
      if (poem[i].selected) {
        newObjArray.push({ id: i, stanza: selectedStanzas[shuffledStanzasCount], style: poem[i]?.style, selected: true });
        shuffledStanzasCount++;
      } else {
        newObjArray.push({ id: i, stanza: poem[i].stanza, style: poem[i]?.style, selected: poem[i].selected });
      }
    }
    setPoem(newObjArray);
  }

  const onSetWordEditMode = () => {
    setWordEditMode(!wordEditMode);
  }

  const onConfirmEditWord = (e) => {
    let newObjArray = [];
    // let text = e;
    // while ( wordEditMode ) {
    //   text = e;
    // }
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        if (wordBeingEdited.includes(' ')) {
          let splitText = wordBeingEdited.split(' ');
          for (let j = 0; j < splitText.length; j++) {
            newObjArray.push({ id: stanza[i].id + j, type: 'text', text: splitText[j], style: stanza[i]?.style, selected: false });
          }
        } else {
          newObjArray.push({ id: stanza[i].id, type: 'text', text: wordBeingEdited, style: stanza[i]?.style, selected: false });
        }
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
  }

  const onStripPunct = () => {
    let newObjArray = [];
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        let newText = stanza[i].text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        newObjArray.push({ id: stanza[i].id, type: 'text', text: newText, selected: true });
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
  }

  const addLineBreakAfterSelected = () => {
    let newObjArray = [];
    for (let i = 0; i < stanza.length; i++) {
      if (stanza[i].selected) {
        newObjArray.push({ id: stanza[i].id, type: 'text', text: stanza[i].text, selected: true });
        newObjArray.push({ id: stanza[i].id + 1, type: 'break', text: '\n', selected: false });
      } else {
        newObjArray.push(stanza[i]);
      }
    }
    setStanza(newObjArray);
  }

  function shiftWordsUp() {
    // copy stanzaArray and replace unselected stanzas with null
    const newArray = stanza.map(word => word.selected ? word : null);

    // rotate left to place selected stanzas in correct position
    newArray.push(newArray.shift());

    // etc...
    stanza.forEach((word, index) => {
        if (!word.selected) {
            const offsetIndex = newArray.indexOf(null, index);
            const newIndex = offsetIndex !== -1
                ? offsetIndex
                : newArray.indexOf(null);
            newArray[newIndex] = word;
        }
    });

    setOldStanza(stanza);
    setStanza(newArray);
}

  function shiftWordsDown() {
    const newArray = stanza.map(word => word.selected ? word : null);
    newArray.unshift(newArray.pop());
    stanza.forEach((word, index) => {
        if (!word.selected) {
            const offsetIndex = newArray.lastIndexOf(null, index);
            const newIndex = offsetIndex !== -1
                ? offsetIndex
                : newArray.lastIndexOf(null);
            newArray[newIndex] = word;
        }
    });
    setOldStanza(stanza);
    setStanza(newArray);
}



  if (outputMode === 'none') {
  return (
    <div className={classes.background}>
      <div className={classes.bigContainer}>
    <div className={classes.pageContainer}>
      <div className={classes.pageContent}> 
        { padToShow === 'stanza' && !wordEditMode &&
        <>
        <div className={classes.globalSection}>
          <div className={classes.saveButtonsSection}>
            <SaveLoad poem={poem} poemTitle={poemTitle} onLoadState={onLoadState} oldStanza={oldStanza} wordBank={wordBank} allWordLists={allWordLists} selectedWordList={selectedWordList} presetArray={presetArray} currentPreset={currentPreset} stanza={stanza} form={form} formStyle={formStyle} genType={genType} nLevel={nLevel} outputCheckbox={outputCheckbox} updateStanzaStyles={updateStazaStyles} outputBgColour={outputBgColour} outputTitleColour={outputTitleColour} outputPoemColour={outputPoemColour} baseFont={baseFont} punctCounter={punctCounter} injectSetting={injectSetting}/>
            <BaseFont baseFont={baseFont} onSelectFont={onSelectFont}/>
          </div>
          <div className={classes.titleSection}>
         
          </div>
          <div className={classes.statusSection}>
            <StatusBar statusMessage={statusMessage} onSetStatusMessage={onSetStatusMessage}/>
          </div>
          <div className={classes.formSection}>
            <CurrentForm form={form} />
          </div>
          <div className={classes.poemLength}>
            <PoemLength poem={poem}/>
          </div>
        </div>
        <div className={classes.inputSection}>
          <GenerateControls editExistingStanzaMode={editExistingStanzaMode} onSaveStanzaToPad={onSaveStanzaToPad} onUpdateStanzaToPad={onUpdateStanzaToPad} onSelectPreset={onSelectPreset}  presetArray={presetArray} currentPreset={currentPreset} nLevel={nLevel} onSetNLevel={onSetNLevel} getStress={getStress} formStyle={formStyle} onSetFormStyle={onSetFormStyle}padToShow={padToShow} onClickShowSrc={onClickShowSrc} treatString={treatString} form={form} onUpdate={onUpdate} genType={genType} onSetGenType={onSetGenType} onSetStatusMessage={onSetStatusMessage}/>
          
        </div>
        </>
        }
        { padToShow === 'stanza' && 
          <div className={classes.stanzaPadSection}>
            <StanzaPad wordBeingEdited={wordBeingEdited} onSetWordBeingEdited={onSetWordBeingEdited} wordEditMode={wordEditMode} baseFont={baseFont} updateStazaStyles={updateStazaStyles} stanza={stanza} onWordClick={onWordClick}/>
            <div className={classes.toolsContainer}>
              <StanzaPadButtons shiftWordsUp={shiftWordsUp} shiftWordsDown={shiftWordsDown} addLineBreakAfterSelected={addLineBreakAfterSelected} onUndoRedoStanza={onUndoRedoStanza} onAddPunct={onAddPunct} onStripPunct={onStripPunct} onConfirmEditWord={onConfirmEditWord} onSetWordBeingEdited={onSetWordBeingEdited} onSetWordEditMode={onSetWordEditMode} wordEditMode={wordEditMode} onShuffleStanza={onShuffleStanza} setStanza={setStanza} setOldStanza={setOldStanza} stanza={stanza} oldStanza={oldStanza} onSaveToWordBank={onSaveToWordBank} onSelectAllWords={onSelectAllWords} onUnselectAllWords={onUnselectAllWords} onDeleteSelectedWords={onDeleteSelectedWords} onDuplicateSelectedWords={onDuplicateSelectedWords}/>
            </div>
          </div>
        }
        { padToShow === 'poem' &&
          <>
          <div className={classes.poemPadSection}>
            <PoemPad onShufflePoem={onShufflePoem} baseFont={baseFont} onUpdatePoem={onUpdatePoem} poem={poem} onEditStanza={onEditStanza} />
          </div>
          <div className={classes.poemPadStatusSection}>
            <StatusBar statusMessage={statusMessage} onSetStatusMessage={onSetStatusMessage}/>
          </div>
          </>
        }

        { padToShow === 'input' &&
        <>
        <div className={classes.poemPadStatusSection}>
        <StatusBar statusMessage={statusMessage} onSetStatusMessage={onSetStatusMessage}/>
        </div>
        <div className={classes.inputPadSection}>
          <SourcePad onSetCurrentPresetName={onSetCurrentPresetName} onSetCurrentPresetText={onSetCurrentPresetText} onSelectPreset={onSelectPreset} presetArray={presetArray} onSaveNewPreset={onSaveNewPreset} onOverwritePreset={onOverwritePreset} onClickImportAsStanza={onClickImportAsStanza} onClickShowSrc={onClickShowSrc} onChangeCurrentPreset={onChangeCurrentPreset} currentPreset={currentPreset} onSetStatusMessage={onSetStatusMessage}/> 
        </div>
        </>
        }
        
        { padToShow === 'stanza' && !wordEditMode &&
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
            < hr className={classes.line} />
            <span>N + ?</span>
            <NPlusX getStress={getStress} formStyle={formStyle} onUpdate={onUpdate} stanza={stanza} onSetStatusMessage={onSetStatusMessage}/> 
            <hr className={classes.line} />
            <span>API INJECTION</span>
            <APIFX onUpdate={onUpdate} stanza={stanza} onSetStatusMessage={onSetStatusMessage}/>
            <hr className={classes.line} />
            <span>LLM </span>
            <LLMFX onSetStatusMessage={onSetStatusMessage} onUpdate={onUpdate} stanza={stanza} treatString={treatString}/>
            <hr className={classes.line} />
            <Title />
          </div>
          <div className={classes.composeSection}>
            { (!showEditWordBank && !showAddWordBank) &&
            <>
            <span>WORD BANK</span>
            <WordBank onShuffleWordBank={onShuffleWordBank} baseFont={baseFont} onSaveWordBankAsList={onSaveWordBankAsList} deleteSelectedWordBank={deleteSelectedWordBank} selectAllWordBank={selectAllWordBank} unselectAllWordBank={unselectAllWordBank} onWordBankClick={onWordBankClick} wordBank={wordBank}/>
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
        { padToShow !== 'input' && !wordEditMode &&
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
        { outputMode === 'lines' && 
        <ShowAsLines baseFont={baseFont} onChangeOutputPoemColour={onChangeOutputPoemColour} outputPoemColour={outputPoemColour} onChangeOutputTitleColour={onChangeOutputTitleColour} outputTitleColour={outputTitleColour} outputBgColour={outputBgColour} stanza={stanza} padToShow={padToShow} onChangeOutputBgColour={onChangeOutputBgColour} poem={poem} poemTitle={poemTitle} onLeaveOutputMode={onLeaveOutputMode}/> 
        }
        { outputMode === 'grid' &&
        <ShowAsGrid baseFont={baseFont} onChangeOutputPoemColour={onChangeOutputPoemColour} outputPoemColour={outputPoemColour} onChangeOutputTitleColour={onChangeOutputTitleColour} outputTitleColour={outputTitleColour} outputBgColour={outputBgColour} onChangeOutputBgColour={onChangeOutputBgColour} poem={poem} poemTitle={poemTitle} onLeaveOutputMode={onLeaveOutputMode}/>
        }
        { outputMode === 'slides' &&
        <ShowAsSlides baseFont={baseFont} onChangeOutputPoemColour={onChangeOutputPoemColour} outputPoemColour={outputPoemColour} onChangeOutputTitleColour={onChangeOutputTitleColour} outputTitleColour={outputTitleColour} outputBgColour={outputBgColour} onChangeOutputBgColour={onChangeOutputBgColour} poem={poem} poemTitle={poemTitle} onLeaveOutputMode={onLeaveOutputMode}/>
        }
        { outputMode === 'loop' &&
        <ShowAsLoop baseFont={baseFont} onChangeOutputPoemColour={onChangeOutputPoemColour} outputPoemColour={outputPoemColour} onChangeOutputTitleColour={onChangeOutputTitleColour} outputTitleColour={outputTitleColour} outputBgColour={outputBgColour} onChangeOutputBgColour={onChangeOutputBgColour} poem={poem} poemTitle={poemTitle} onLeaveOutputMode={onLeaveOutputMode}/>
        }
      </div>
    )
  }
};

export default Genny;
