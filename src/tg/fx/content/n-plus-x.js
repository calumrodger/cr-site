import classes from '../../tg-styles.module.scss';
import { useState, useEffect, useRef, use } from 'react';
import { syllable } from 'syllable';
import { dictionary } from 'cmu-pronouncing-dictionary';
import { masterWordList } from 'public/tg/words_alpha';

const NPlusX = (props) => {

    const { stanza, onUpdate, onSetStatusMessage, formStyle, getStress } = props;

    const [wordClass, setWordClass] = useState(false);
    const [measure, setMeasure] = useState(false);
    const [rhyme, setRhyme] = useState(false);
    const [nValue, setNValue] = useState(0);
    const [newWordsArray, setNewWordsArray] = useState([]);

    const posTypes = ["CC", "CD", "DT", "EX", "FW", "IN", "JJ", "JJR", "JJS", "LS", "MD", "NN", "NNP", "NNPS", "NNS", "POS", "PDT", "PP$", "PRP", "RB", "RBR", "RBS", "RP", "SYM", "TO", "UH", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ", "WDT", "WP", "WP$", "WRB"]

    const wordList = masterWordList.split('\n');
    const pos = require('pos');

    // Treat word before passing to any functions
    const treatWordFirst = (word) => {
        let treatedWord = word.replace(/[^a-zA-Z ]/g, "");
        return treatedWord;
    }

    // Check input word is in dictionaries
    const checkWordHasClass = (word) => {
        const wordLex = new pos.Lexer().lex(word);
        const tagger = new pos.Tagger();
        const taggedWord = tagger.tag(wordLex);
        console.log(taggedWord)
        if (posTypes.includes(taggedWord[0][1])) {
            return true;
        } else {
            return false;
        }
    }

    const checkWordIsInRhymeDictionary = (word) => {
        if (dictionary[word] === undefined) {
            return false;
        } else {
            return true;
        }
    }

    // Check if two words are of the same class/measure/rhyme
    const wordClassCheck = (word1, word2) => {
        const wordOne = new pos.Lexer().lex(word1);
        const wordTwo = new pos.Lexer().lex(word2);
        const tagger = new pos.Tagger();
        const taggedWord1 = tagger.tag(wordOne);
        const taggedWord2 = tagger.tag(wordTwo);
        if (taggedWord1[0][1] === taggedWord2[0][1]) {
            return true;
        } else {
            return false;
        }
    }

    const measureCheck = (word1, word2) => {
        if (formStyle === 'syllable') {
            if (syllable(word1) === syllable(word2)) {
                return true;
            } else {
                return false;
            }
        }
        if (formStyle === 'stress') {
            if (getStress(word1) === getStress(word2)) {
                return true;
            } else {
                return false;
            }
        }
    }

    const rhymeCheck = (word1, word2) => {
        const treatedWord = treatWordFirst(word1);
        const wordInDictionary = checkWordIsInRhymeDictionary(treatedWord);
        if (!wordInDictionary) {
            onSetStatusMessage('word not in dictionary');
            return null;
        } else {
        const wordOnePronArray = dictionary[treatedWord]?.split(' ');
        const wordTwoPronArray = dictionary[word2]?.split(' ');
        let notDefined = '';
        if (wordOnePronArray === undefined) {
            notDefined = word1 + ', ';
        }
        if (wordTwoPronArray === undefined) {
            notDefined = notDefined + word2;
        }
        if (notDefined !== '') {
            return false;
        }
        let rhymeIndexOne = 0;
        for (let i = 0; i < wordOnePronArray.length; i++) {
            if (wordOnePronArray[i].includes("1")) {
                rhymeIndexOne = i; 
            }
        }
        const rhymeOne = wordOnePronArray.slice(rhymeIndexOne).join(' ');
        let rhymeIndexTwo = 0;
        for (let i = 0; i < wordTwoPronArray.length; i++) {
            if (wordTwoPronArray[i].includes("1")) {
                rhymeIndexTwo = i; 
            }
        }
        const rhymeTwo = wordTwoPronArray.slice(rhymeIndexTwo).join(' ');
        if (rhymeOne === rhymeTwo) {
            return true;
        } else {        
            return false;
        }
        }
    }


    // Find word of same syllable count
    const findWordOfSameSyllableCount = (word) => {
        let syllableCount = syllable(word);
        console.log(syllableCount)
        let finalWord = '';
        while (finalWord === '') {
            let randomIndex = Math.floor(Math.random() * wordList.length);
            let randomWord = wordList[randomIndex];
            console.log(randomWord, syllable(randomWord))
            if (syllable(randomWord) === syllableCount) {
                finalWord = randomWord;
            }
        }
        return finalWord;
    }

    const findWordOfSameStressCount = (word) => {
        let syllableCount = getStress(word);
        let finalWord = '';
        while (finalWord === '') {
            let randomIndex = Math.floor(Math.random() * wordList.length);
            let randomWord = wordList[randomIndex];
            if (getStress(randomWord) === syllableCount) {
                finalWord = randomWord;
            }
        }
        return finalWord;
    }

    const findWordOfSameClass = (word) => {
        let finalWord = '';
        while (finalWord === '') {
            let randomIndex = Math.floor(Math.random() * wordList.length);
            let randomWord = wordList[randomIndex];
            if (wordClassCheck(word, randomWord)) {
                finalWord = randomWord;
            }
        }
        return finalWord;
    }

    const findWordThatRhymes = (word) => {
        let finalWord = '';
        while (finalWord === '') {
            let randomIndex = Math.floor(Math.random() * wordList.length);
            let randomWord = wordList[randomIndex];
            if (rhymeCheck(word, randomWord) === true) {
                finalWord = randomWord;
            }
            if (rhymeCheck(word, randomWord) === null) {
                return '';
            }
        }
        return finalWord;
    }



    // Replace function
    const replace = () => {
        let whatToGet = stanza.filter((word) => {
            if (word.selected === true) {
                return word.text;
            }})
        let numberToGet = whatToGet.length;
        console.log(whatToGet, numberToGet)
        let array = [];

        for (let i = 0; i < numberToGet; i++) {
            if (measure && !wordClass && !rhyme) {
                if (formStyle === 'syllable') {
                    array.push(findWordOfSameSyllableCount(whatToGet[i].text))
                }
                if (formStyle === 'stress') {
                    array.push(findWordOfSameStressCount(whatToGet[i].text))
                }
            }
            if (wordClass && !measure && !rhyme) {
                array.push(findWordOfSameClass(whatToGet[i].text))
            }
            if (rhyme && !measure && !wordClass) {
                array.push(findWordThatRhymes(whatToGet[i].text))
            }
        }
        setNewWordsArray(array); 
    }

    // Click handler
    const handleReplaceClick = () => {
        replace();
    }

    // Insert words into stanza
    const insertWords = (arr) => {
        let newObjArray = [];
        let randomWordCount = 0;
        for (let i = 0; i < stanza.length; i++) {
            if (stanza[i].selected === true) {
                newObjArray.push({id: stanza[i].id, type: 'text', style: stanza[i]?.style, text: arr[randomWordCount], selected: true});
                randomWordCount++;
            } else {
                newObjArray.push(stanza[i]);
            }
        }
        onUpdate(newObjArray, stanza);
    }

    useEffect(() => {
        if (newWordsArray.length > 0) {
            insertWords(newWordsArray);
        }
    }, [newWordsArray])

    return (
        <div className={classes.nplusxContainer}>
        <div className={classes.radioButtons}>
            <span>keep:</span>
            <div className={classes.buttonsContainer}>
                <div className={classes.buttonContainer}>
                    <label htmlFor="class">class: </label>
                    <input className={`${classes.radioInput} ${wordClass === true ? classes.selected : null}`} type="radio" id="class" name="class" value="class" readOnly checked={wordClass === true} onClick={(e) => setWordClass(!wordClass)}/>
                </div>
                <div className={classes.buttonContainer}>
                    <label htmlFor="measure">measure: </label>
                    <input className={`${classes.radioInput} ${measure === true ? classes.selected : null}`} type="radio" id="measure" name="measure" value="measure" readOnly checked={measure === true} onClick={(e) => setMeasure(!measure)}/>
                </div>
                <div className={classes.buttonContainer}>
                    <label htmlFor="rhyme">rhyme: </label>
                    <input className={`${classes.radioInput} ${rhyme === true ? classes.selected : null}`} type="radio" id="rhyme" name="rhyme" value="rhyme" readOnly checked={rhyme === true} onClick={(e) => setRhyme(!rhyme)}/>
                </div>
            </div>
        </div>
        <div className={classes.numberAndButton}>
            <div className={classes.synonymSlider}>
                <div className={classes.input}>
                    <span>n + {nValue == 0 ? '?' : nValue}</span>
                    
                </div>
                <input className={classes.slider} type="range" min="0" max="99" id="n-value" name="n-value" onChange={(e) => setNValue(e.target.value)} value={nValue}/>
                {/* <button className={classes.synonymButton}>go</button> */}
            </div>
            <button onClick={handleReplaceClick} className={classes.button}>REPLACE</button>
        </div>
        </div>
    )
}

export default NPlusX;


    // Find random matching word [for n+ when I add it]
    // const findWordNOfSameSyllableCount = (word, n) => {
    //     let syllableCount = syllable(word);
    //     let matchingWords = wordList.filter((word) => {
    //         if (syllable(word) === syllableCount) {
    //             return word;
    //         }
    //     })
    //     return matchingWords[n];
    // }