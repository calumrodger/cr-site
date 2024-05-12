'use client';

import classes from './input.module.scss';
import PopulateFromYouTubeComments from '@tg/input/populate-from-yt-comments';

import { syllable } from 'syllable';

import { useState, useEffect } from 'react';

  const GenerateFromString = (props) => {

    const { treatString, setStanza, form } = props;

    const demoString = "The cat (Felis catus), commonly referred to as the domestic cat or house cat, is a small domesticated carnivorous mammal. It is the only domesticated species of the family Felidae. Recent advances in archaeology and genetics have shown that the domestication of the cat occurred in the Near East around 7500 BC. It is commonly kept as a house pet and farm cat, but also ranges freely as a feral cat avoiding human contact. It is valued by humans for companionship and its ability to kill vermin. Its retractable claws are adapted to killing small prey like mice and rats. It has a strong, flexible body, quick reflexes, sharp teeth, and its night vision and sense of smell are well developed. It is a social species, but a solitary hunter and a crepuscular predator. Cat communication includes vocalizations like meowing, purring, trilling, hissing, growling, and grunting as well as cat body language. It can hear sounds too faint or too high in frequency for human ears, such as those made by small mammals. It also secretes and perceives pheromones.Female domestic cats can have kittens from spring to late autumn in temperate zones and throughout the year in equatorial regions, with litter sizes often ranging from two to five kittens. Domestic cats are bred and shown at events as registered pedigreed cats, a hobby known as cat fancy. Animal population control of cats may be achieved by spaying and neutering, but their proliferation and the abandonment of pets has resulted in large numbers of feral cats worldwide, contributing to the extinction of bird, mammal and reptile species. As of 2017, the domestic cat was the second most popular pet in the United States, with 95.6 million cats owned and around 42 million households owning at least one cat. In the United Kingdom, 26% of adults have a cat, with an estimated population of 10.9 million pet cats as of 2020. As of 2021, there were an estimated 220 million owned and 480 million stray cats in the world.";

    const [string, setString] = useState(demoString);
    const [youTubeString, setYouTubeString] = useState('');
    const [currentForm, setCurrentForm] = useState(form);
    const [genType, setGenType] = useState('original');

    const getFormArray = (form) => {
        const splitForm = form.split('/').map((item) => parseInt(item));
        for (let i = 0; i < splitForm.length; i++) {
            if (isNaN(splitForm[i])) {
                splitForm[i] = '/';
            }
        }
        return splitForm
    }

    const getFormArraySansBreaks = (form) => { 
        let newForm = getFormArray(form);
        return newForm.filter((item) => item !== '/');
    }
    

    //DEP: npm i syllable
    //PARAMS: demoString - string of any length (longer is better)
    //FORM: array of numbers, each number is the number of syllables in a line
    //INDEX: starting index to check string on
    //RETURNS array of two elements, first is the line, second is the index to start from next time
    const getOriginalLineWithIndex = (text, form, index) => {
        const treatedText = text.replace(/(?:\r\n|\r|\n)/g, ' ');
        const stringArray = treatedText.split(' ');
        let startPosition = stringArray[index];
        let line = startPosition;
        let newIndex = index + 1;
        while (syllable(line) < form) {
            line = line + ' ' + stringArray[newIndex];
            newIndex++;
        }
        if (syllable(line) > form) {
            return [null, newIndex];
        }
        if (syllable(line) === form) {
            return [line, newIndex];
        }
    }

    const getOriginalLine = (text, form) => {
        let line = '';
        const treatedText = text.replace(/(?:\r\n|\r|\n)/g, ' ');
        const stringArray = treatedText.split(' ');
        let currentIndex = Math.floor(Math.random() * stringArray.length);
        let startPosition = stringArray[currentIndex];
        line = startPosition;
        let newIndex = currentIndex + 1;
        while (syllable(line) !== form) {
            if (syllable(line) < form) {
                line = line + ' ' + stringArray[newIndex];
                newIndex++
            }
            if (syllable(line) > form) {
                line = '';
                newIndex = Math.floor(Math.random() * stringArray.length);
            }
        }
        return line;
    }

    const getOriginalPoem = (text, form) => {
        let poem = [];
        let currentIndex = Math.floor(Math.random() * text.length);
        let globalCount = 0;
        for (let i = 0; i < form.length; i++) {
            if (globalCount > 10000) {
                alert("no poem found - try a bigger string or a different form");
                return;
            }
        let line = getOriginalLineWithIndex(text, form[i], currentIndex);
        if (line[0] === null) {
            i = -1;
            poem = [];
            globalCount++;
            currentIndex = Math.floor(Math.random() * text.length);
        } else {
            poem.push(line[0]);
            currentIndex = line[1];
        }
        }
        return poem;
    }

    const getRandomLine = (text, form) => {
        let line = '';
        const treatedText = text.replace(/(?:\r\n|\r|\n)/g, ' ');
        const stringArray = treatedText.split(' ');
        line = stringArray[Math.floor(Math.random() * stringArray.length)];
        while (syllable(line) !== form) {
            if (syllable(line) < form) {
                line = line + ' ' + stringArray[Math.floor(Math.random() * stringArray.length)];
            }
            if (syllable(line) > form) {
                line = '';
            }
        }
        return line;
    }

    const getRandomWordPoem = (text, form) => {
        let poem = [];
        for (let i = 0; i < form.length; i++) {
            let line = getRandomLine(text, form[i]);
            poem.push(line);
        }
        return poem;
    }

    const getRandomLinePoem = (text, form) => {
        let poem = [];
        for (let i = 0; i < form.length; i++) {
            let line = getOriginalLine(text, form[i]);
            poem.push(line);
        }
        return poem;
    }

    const formatPoem = (poem, form) => {

        const formArray = getFormArray(form);

        for (let i = 0; i < formArray.length; i++) {
            if (formArray[i] === '/') {
                poem.splice(i, 0, '\n');
            }
        }
            const formattedPoem = poem.map((item) => {
              return item + ' \n'
            }).join(' ');

            const theThing = treatString(formattedPoem)
            return theThing;
    }
    
    const onFormSubmit = (e) => {
        e.preventDefault();
        if (genType === 'original') {
            setStanza(formatPoem(getOriginalPoem(string, getFormArraySansBreaks(currentForm)), currentForm));
        }
        if (genType === 'random-line') {
            setStanza(formatPoem(getRandomLinePoem(string, getFormArraySansBreaks(currentForm)), currentForm));
        }
        if (genType === 'random-word') {
            setStanza(formatPoem(getRandomWordPoem(string, getFormArraySansBreaks(currentForm)), currentForm));
        }
    }

    const onChangeString = (e) => {
        setString(e.target.value)
    }

    const onChangeForm = (e) => {
        setCurrentForm(e.target.value)
    }

    const onSetGenType = (e) => {
        setGenType(e.target.value);
    }

    const onPopulateWithYouTubeComments = (comments) => {
        console.log('fire')
        setYouTubeString(comments);
    }

    useEffect(() => {
        if (youTubeString !== '') {
        onChangeString({target: {value: youTubeString}})
        }
    }, [youTubeString])
   
    return (
        <div className={classes.pageContainer}>
                <label htmlFor="article-name">String:</label>
                <textarea type="textarea" id="article-name" name="article-name" value={string} onChange={onChangeString}/>
                <label htmlFor="form">Form:</label>
                <input type="text" id="form" name="form" value={currentForm} onChange={onChangeForm}></input>
            <div className={classes.checkboxContainer}>
                    <button className={`${classes.button} ${genType === 'original' ? classes.selected : null}`} value="original" onClick={onSetGenType}>Original Sequence</button>
                    <button className={`${classes.button} ${genType === 'random-line' ? classes.selected : null}`} value="random-line" onClick={onSetGenType}>Random by line</button>
                    <button className={`${classes.button} ${genType === 'random-word' ? classes.selected : null}`} value="random-word" onClick={onSetGenType}>Random by word</button>
            </div>
            <PopulateFromYouTubeComments onPopulateWithYouTubeComments={onPopulateWithYouTubeComments}/>
            <button className={classes.button} type="submit" onClick={onFormSubmit}>GENERATE!</button>
        </div>
        )
  }
  
export default GenerateFromString;