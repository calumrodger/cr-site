import classes from '../../tg-styles.module.scss';
import { useState, useEffect, useRef } from 'react';
import { syllable } from 'syllable';
import { dictionary } from 'cmu-pronouncing-dictionary';
import { getWordFromDictionary, getRandomWordFromDictionary } from '@tg/server-actions/actions';



const NPlusX = (props) => {

    const { stanza, onUpdate, onSetStatusMessage, } = props;

    const [wordClass, setWordClass] = useState(false);
    const [measure, setMeasure] = useState(false);
    const [rhyme, setRhyme] = useState(false);
    const [nValue, setNValue] = useState(0);
    const [randomWordArray, setRandomWordArray] = useState([]);

    const pos = require('pos');

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
            console.log(dictionary[word1])
    }

    const handleReplaceClick = () => {
        if (!wordClass && !measure && !rhyme) {
            replaceRandom();
        }
        if (!wordClass && !measure && rhyme) {
            console.log(rhymeCheck('hello'))
        }
        if (!wordClass && measure && !rhyme) {
            console.log(measureCheck('a', 'the'));
        }
        if (!wordClass && measure && rhyme) {
            
        }
        if (wordClass && !measure && !rhyme) {
            console.log(wordClassCheck('a', 'the'));
        }
        if (wordClass && !measure && rhyme) {
            
        }
        if (wordClass && measure && !rhyme) {
            
        }
        if (wordClass && measure && rhyme) {
            
        }
    }

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

    const replaceRandom = async () => {
        let numberToGet = stanza.filter((word) => {
            if (word.selected === true) {
                return word;
            }}).length
        console.log(numberToGet);
        let array = [];
        for (let i = 0; i < numberToGet; i++) {
            let randomWordObj = await getWordFromDictionary();
            console.log(randomWordObj)
            let randomWord = randomWordObj.word;
            array.push(randomWord);
        }
        setRandomWordArray(array); 
    }

    useEffect(() => {
        insertWords(randomWordArray);
    }, [randomWordArray])

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
                    <span>nymspin</span>
                    <button className={classes.synonymButton}>go</button>
                    
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