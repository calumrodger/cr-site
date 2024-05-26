import classes from '../../tg-styles.module.scss';
import { useState, useEffect, useRef } from 'react';
import { getDictionary } from '@tg/server-actions/actions';
import { syllable } from 'syllable';
import { dictionary } from 'cmu-pronouncing-dictionary';



const NPlusX = (props) => {

    const { stanza, onUpdate, onSetStatusMessage } = props;

    const [wordClass, setWordClass] = useState(true);
    const [measure, setMeasure] = useState(true);
    const [rhyme, setRhyme] = useState(true);
    const [nValue, setNValue] = useState(0);

    const dictRef = useRef([]);

    const getTheDictionary = async () => {
        const theDictionary = await getDictionary();
        return theDictionary;
    }

    useEffect(() => {
        getTheDictionary().then((dictionary) => {
            dictRef.current = dictionary
        });
    }, [])

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
        // if () {
            console.log(dictionary.word1)
        // } else {
        //     console.log('nope')
        // }
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

    const replaceRandom = () => {
        let newObjArray = [];
        for (let i = 0; i < stanza.length; i++) {
            if (stanza[i].selected === true) {
                let randomWord = dictRef.current[Math.floor(Math.random() * dictRef.current.length)];
                newObjArray.push({id: stanza[i].id, type: 'text', text: randomWord, selected: true});
            } else {
                newObjArray.push(stanza[i]);
            }
        }
        onUpdate(newObjArray, stanza); 
    }

    return (
        <div className={classes.nplusxContainer}>
        <div className={classes.radioButtons}>
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
            <div className={classes.input}>
                <label htmlFor="n-value">vol:</label>
                <input className={classes.textInput} value={nValue} onChange={(e) => setNValue(e.target.value)} type="number" />
            </div>
            <button onClick={handleReplaceClick} className={classes.button}>REPLACE</button>
        </div>
        </div>
    )
}

export default NPlusX;