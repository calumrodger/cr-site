import classes from '../../tg-styles.module.scss';
import { useState, useEffect, useRef, use } from 'react';
import { syllable } from 'syllable';
import { dictionary } from 'cmu-pronouncing-dictionary';
import { masterWordListBig } from 'public/tg/words_alpha';
import { masterWordListWee } from 'public/tg/words_wee';

const NPlusX = (props) => {

    const { stanza, onUpdate, onSetStatusMessage, formStyle, getStress } = props;

    const [wordClass, setWordClass] = useState(false);
    const [measure, setMeasure] = useState(false);
    const [rhyme, setRhyme] = useState(false);
    const [nValue, setNValue] = useState(0);
    const [newWordsArray, setNewWordsArray] = useState([]);
    const [src, setSrc] = useState('big');
    const [lastClicked, setLastClicked] = useState('');

    const posTypes = ["CC", "CD", "DT", "EX", "FW", "IN", "JJ", "JJR", "JJS", "LS", "MD", "NN", "NNP", "NNPS", "NNS", "POS", "PDT", "PP$", "PRP", "RB", "RBR", "RBS", "RP", "SYM", "TO", "UH", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ", "WDT", "WP", "WP$", "WRB"]

    const wordListBig = masterWordListBig.split('\n');
    const wordListWee = masterWordListWee.split('\n');
    const pos = require('pos');
    const rhymingDictionaryLength = Object.keys(dictionary).length;

    function remove(str) {
        let res = '';
        for (let i = 0; i < str.length; i++) {
            let character = str.charAt(i);
            if (!checkPunctuation(character)) {
                res += character;
            }
        }
        return res;
    }
    
    function checkPunctuation(word) {
        const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
        let charArr = word.split('');
        if (punctuation.includes(charArr[0]) || punctuation.includes(charArr[charArr.length - 1])) {
            return true;
        } else {
        return false;
        }
    }

    const removePunctFromWord = (word) => {
        let wordArray = word.split('');
        let startOfWord = word.indexOf(wordArray.find((char) => !checkPunctuation(char)));
        let endOfWord = word.lastIndexOf(wordArray.find((char) => !checkPunctuation(char)));
        let justTheWord = word.slice(startOfWord, endOfWord + 1);
        return justTheWord;
    }

    // Treat word before passing to any functions
    const treatWordFirst = (word) => {
        if (checkPunctuation(word)) {
            let wordArray = word.split('');
            let startPunctArray = [];
            let endPunctArray = [];
            let theWordArray = []
            let wordBeenFoundYet = false;

            for (let i = 0; i < wordArray.length; i++) {
                if (!wordBeenFoundYet) {
                    if (checkPunctuation(wordArray[i])) {
                        startPunctArray.push(wordArray[i]);
                    } else {
                        theWordArray.push(wordArray[i]);
                        wordBeenFoundYet = true;
                    }
                } else {
                    if (checkPunctuation(wordArray[i])) {
                        // TODO KNOWN BUG need to add a for loop here to check if the next character is also punctuation
                        if ((!wordArray[i+1]) || (wordArray[i+1]) && (checkPunctuation(wordArray[i+1])))
                        endPunctArray.push(wordArray[i]);
                    } else {
                        theWordArray.push(wordArray[i]);
                    }
                }
            }
            return [theWordArray.join(''), startPunctArray.join(''), endPunctArray.join('')];
        } else {
            return [word, '', ''];
        }
    }


    // Check input word is in dictionaries
    const checkWordHasClass = (word) => {
        const wordLex = new pos.Lexer().lex(word);
        const tagger = new pos.Tagger();
        const taggedWord = tagger.tag(wordLex);
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
        const treatedWord = word1;
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
    const findWordOfSameSyllableCount = (word, wordList) => {
        let syllableCount = syllable(word);
        if (syllableCount === 0) {
            return '';
        } else {
        let finalWord = '';
        while (finalWord === '') {
            let randomIndex = Math.floor(Math.random() * wordList.length);
            let randomWord = wordList[randomIndex];
            if (syllable(randomWord) === syllableCount) {
                finalWord = randomWord;
            }
        }
        return finalWord;
    }
    }

    const findWordOfSameStressCount = (word, wordList) => {
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

    const findWordOfSameClass = (word, wordList) => {
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

    const findWordThatRhymes = (word, wordList) => {
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
        let array = [];

        let wordList = src === 'big' ? wordListBig : wordListWee;

        for (let i = 0; i < numberToGet; i++) {
            if (measure && !wordClass && !rhyme) {
                if (formStyle === 'syllable') {
                    array.push(findWordOfSameSyllableCount(whatToGet[i].text, wordList))
                }
                if (formStyle === 'stress') {
                    array.push(findWordOfSameStressCount(whatToGet[i].text, wordList))
                }
            }
            if (wordClass && !measure && !rhyme) {
                array.push(findWordOfSameClass(whatToGet[i].text, wordList))
            }
            if (rhyme && !measure && !wordClass) {
                array.push(findWordThatRhymes(whatToGet[i].text, wordList))
            }
            if (rhyme && measure && !wordClass) {
                for (let rm = 0; rm < rhymingDictionaryLength; rm++) {
                    if (rm === rhymingDictionaryLength - 1) {
                        alert('no match found');
                        return whatToGet[i].text;
                    }
                    let matchedWord = findWordThatRhymes(whatToGet[i].text, wordList);
                    let doesItMatchMeasure = measureCheck(whatToGet[i].text, matchedWord);
                    if (doesItMatchMeasure) {
                        array.push(matchedWord);
                        break;
                    } else {
                        continue;
                    }
                }
            }
            if (rhyme && wordClass && !measure) {
                for (let rc = 0; rc < rhymingDictionaryLength; rc++) {
                    if (rc === rhymingDictionaryLength - 1) {
                        alert('no match found')
                        return whatToGet[i].text;
                    }
                    let matchedWord = findWordThatRhymes(whatToGet[i].text, wordList);
                    let doesItMatchClass = wordClassCheck(whatToGet[i].text, matchedWord);
                    if (doesItMatchClass) {
                        array.push(matchedWord);
                        break;
                    } else {
                        continue;
                    }
                }
            }
            if (measure && wordClass && !rhyme) {
                for (let mc = 0; mc < wordList.length; mc++) {
                    if (mc === wordList.length - 1) {
                        alert('no match found');
                        return whatToGet[i].text;
                    }
                    let matchedWord = findWordOfSameClass(whatToGet[i].text, wordList);
                    let doesItMatchMeasure = measureCheck(whatToGet[i].text, matchedWord);
                    if (doesItMatchMeasure) {
                        array.push(matchedWord);
                        break;
                    } else {
                        continue;
                    }
                }
            }
            if (measure && wordClass && rhyme) {
                for (let mcr = 0; mcr < rhymingDictionaryLength; mcr++) {
                    if (mcr === rhymingDictionaryLength - 1) {
                        alert('no match found');
                        return whatToGet[i].text;
                    }
                    let matchedWord = findWordThatRhymes(whatToGet[i].text, wordList);
                    let doesItMatchMeasure = measureCheck(whatToGet[i].text, matchedWord);
                    let doesItMatchClass = wordClassCheck(whatToGet[i].text, matchedWord);
                    if (doesItMatchMeasure && doesItMatchClass) {
                        array.push(matchedWord);
                        break;
                    } else {
                        continue;
                    }
                }
            }
            if (!measure && !wordClass && !rhyme) {
                let randomIndex = Math.floor(Math.random() * wordList.length);
                array.push(wordList[randomIndex]);
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

    const onClickWordClass = () => {
        if (wordClass === true) {
            setWordClass(false);
        } else {
            setWordClass(true);
            if (lastClicked === 'measure') {
                setRhyme(false);
            }
            if (lastClicked === 'rhyme') {
                setMeasure(false);
            }
            setLastClicked('class');
        }
    }

    const onClickMeasure = () => {
        if (measure === true) {
            setMeasure(false);
        } else {
            setMeasure(true);
            if (lastClicked === 'class') {
                setRhyme(false);
            }
            if (lastClicked === 'rhyme') {
                setWordClass(false);
            }
            setLastClicked('measure');
        }
    }

    const onClickRhyme = () => {
        if (rhyme === true) {
            setRhyme(false);
        } else {
            setRhyme(true);
            if (lastClicked === 'class') {
                setMeasure(false);
            }
            if (lastClicked === 'measure') {
                setWordClass(false);
            }
            setLastClicked('rhyme');
        }
    }

    return (
        <div className={classes.nplusxContainer}>
        <div className={classes.radioButtons}>
            <span>keep:</span>
            <div className={classes.buttonsContainer}>
                <div className={classes.buttonContainer}>
                    <label htmlFor="class">class: </label>
                    <input className={`${classes.radioInput} ${wordClass === true ? classes.selected : null}`} type="radio" id="class" name="class" value="class" readOnly checked={wordClass === true} onClick={(e) => onClickWordClass()}/>
                </div>
                <div className={classes.buttonContainer}>
                    <label htmlFor="measure">measure: </label>
                    <input className={`${classes.radioInput} ${measure === true ? classes.selected : null}`} type="radio" id="measure" name="measure" value="measure" readOnly checked={measure === true} onClick={(e) => onClickMeasure()}/>
                </div>
                <div className={classes.buttonContainer}>
                    <label htmlFor="rhyme">rhyme: </label>
                    <input className={`${classes.radioInput} ${rhyme === true ? classes.selected : null}`} type="radio" id="rhyme" name="rhyme" value="rhyme" readOnly checked={rhyme === true} onClick={(e) => onClickRhyme()}/>
                </div>
            </div>
        </div>
        <div className={classes.numberAndButton}>
            <div className={classes.synonymSlider}>
                <div className={classes.radioButtons}>
                    <span>src:</span>
                <div className={classes.nplusxSrcButtonsContainer}>
                <div className={classes.buttonContainer}>
                    <label htmlFor="big-src">big: </label>
                    <input className={`${classes.radioInput} ${src === 'big' ? classes.selected : null}`} type="radio" id="big-src" name="big-src" value="big-src" readOnly checked={src === 'big'} onClick={(e) => setSrc('big')}/>
                </div>
                <div className={classes.buttonContainer}>
                    <label htmlFor="wee-src">wee: </label>
                    <input className={`${classes.radioInput} ${src === 'wee' ? classes.selected : null}`} type="radio" id="wee-src" name="wee-src" value="wee-src" readOnly checked={src === 'wee'} onClick={(e) => setSrc('wee')}/>
                </div>
                </div>
                    
                </div>
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