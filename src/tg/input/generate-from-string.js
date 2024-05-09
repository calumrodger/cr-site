import classes from '../styles.module.scss';

import { syllable } from 'syllable';

import { useState } from 'react';

  const GenerateFromString = (props) => {

    const { poem, setPoem, setOldPoem, treatString } = props;

    const demoString = "The cat (Felis catus), commonly referred to as the domestic cat or house cat, is a small domesticated carnivorous mammal. It is the only domesticated species of the family Felidae. Recent advances in archaeology and genetics have shown that the domestication of the cat occurred in the Near East around 7500 BC. It is commonly kept as a house pet and farm cat, but also ranges freely as a feral cat avoiding human contact. It is valued by humans for companionship and its ability to kill vermin. Its retractable claws are adapted to killing small prey like mice and rats. It has a strong, flexible body, quick reflexes, sharp teeth, and its night vision and sense of smell are well developed. It is a social species, but a solitary hunter and a crepuscular predator. Cat communication includes vocalizations like meowing, purring, trilling, hissing, growling, and grunting as well as cat body language. It can hear sounds too faint or too high in frequency for human ears, such as those made by small mammals. It also secretes and perceives pheromones.Female domestic cats can have kittens from spring to late autumn in temperate zones and throughout the year in equatorial regions, with litter sizes often ranging from two to five kittens. Domestic cats are bred and shown at events as registered pedigreed cats, a hobby known as cat fancy. Animal population control of cats may be achieved by spaying and neutering, but their proliferation and the abandonment of pets has resulted in large numbers of feral cats worldwide, contributing to the extinction of bird, mammal and reptile species. As of 2017, the domestic cat was the second most popular pet in the United States, with 95.6 million cats owned and around 42 million households owning at least one cat. In the United Kingdom, 26% of adults have a cat, with an estimated population of 10.9 million pet cats as of 2020. As of 2021, there were an estimated 220 million owned and 480 million stray cats in the world.";

    const [string, setString] = useState(demoString);
    const [form, setForm] = useState('5/7//5');

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

    console.log(getFormArray(form))
    

    //DEP: npm i syllable
    //PARAMS: demoString - string of any length (longer is better)
    //FORM: array of numbers, each number is the number of syllables in a line
    //INDEX: starting index to check string on
    //RETURNS array of two elements, first is the line, second is the index to start from next time
    const getLine = (demoString, form, index) => {

        const stringArray = demoString.split(' ');
        
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

    const getPoem = (text, form) => {

        let poem = [];
        let currentIndex = Math.floor(Math.random() * text.length);

        let globalCount = 0;

        for (let i = 0; i < form.length; i++) {

            if (globalCount > 10000) {
                alert("no poem found - try a bigger string or a different form");
                return;
            }

            let line = getLine(text, form[i], currentIndex);

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

    const formatPoem = (poem) => {

        const formArray = getFormArray(form);

        for (let i = 0; i < formArray.length; i++) {
            if (formArray[i] === '/') {
                poem.splice(i, 0, '\n');
            }
            console.log(poem)
        }
            const formattedPoem = poem.map((item, index) => {
              return item + ' \n'
            }).join(' ');

            console.log(formattedPoem)

            const theThing = treatString(formattedPoem)

            console.log(theThing)
            return theThing;
          }
    


    const onFormSubmit = (e) => {
        e.preventDefault();
        // console.log(getPoem(demoString, form));
        setPoem(formatPoem(getPoem(string, getFormArraySansBreaks(form))));
    }

    const onChangeString = (e) => {
        setString(e.target.value)
        console.log(syllable(e.target.value));
    }

    const onChangeForm = (e) => {
        setForm(e.target.value)
    }
   
    return (
        <div className={classes.pageContainer}>
            <form>
                <label htmlFor="article-name">String:</label>
                <textarea type="textarea" id="article-name" name="article-name" value={string} onChange={onChangeString}/>
                <label htmlFor="form">Form:</label>
                <input type="text" id="form" name="form" value={form} onChange={onChangeForm}></input>
                <button type="submit" onClick={onFormSubmit}>show</button>
            </form>
        </div>
        )
  }
  
export default GenerateFromString;