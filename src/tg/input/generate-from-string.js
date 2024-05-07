import classes from '../styles.module.scss';

import { syllable } from 'syllable';

import { useState } from 'react';

  const GenerateFromString = () => {

    const demoString = "The cat (Felis catus), commonly referred to as the domestic cat or house cat, is a small domesticated carnivorous mammal. It is the only domesticated species of the family Felidae. Recent advances in archaeology and genetics have shown that the domestication of the cat occurred in the Near East around 7500 BC. It is commonly kept as a house pet and farm cat, but also ranges freely as a feral cat avoiding human contact. It is valued by humans for companionship and its ability to kill vermin. Its retractable claws are adapted to killing small prey like mice and rats. It has a strong, flexible body, quick reflexes, sharp teeth, and its night vision and sense of smell are well developed. It is a social species, but a solitary hunter and a crepuscular predator. Cat communication includes vocalizations like meowing, purring, trilling, hissing, growling, and grunting as well as cat body language. It can hear sounds too faint or too high in frequency for human ears, such as those made by small mammals. It also secretes and perceives pheromones. Female domestic cats can have kittens from spring to late autumn in temperate zones and throughout the year in equatorial regions, with litter sizes often ranging from two to five kittens. Domestic cats are bred and shown at events as registered pedigreed cats, a hobby known as cat fancy. Animal population control of cats may be achieved by spaying and neutering, but their proliferation and the abandonment of pets has resulted in large numbers of feral cats worldwide, contributing to the extinction of bird, mammal and reptile species. As of 2017, the domestic cat was the second most popular pet in the United States, with 95.6 million cats owned and around 42 million households owning at least one cat. In the United Kingdom, 26% of adults have a cat, with an estimated population of 10.9 million pet cats as of 2020. As of 2021, there were an estimated 220 million owned and 480 million stray cats in the world.";

    const [string, setString] = useState(demoString);
    const [form, setForm] = useState([5, 0, 7, 0, 5]);

    const getLine = (string, form) => {
        const formWithoutBreaks = form.filter((item) => item !== 0);
        
        const array = string.split(' ');
        let words = '';
        let count = 1;
        let index = Math.floor(Math.random() * array.length);

        do {
            index = Math.floor(Math.random() * array.length);
            words = array[index];
        } while (syllable(words) > form);

        if (syllable(words) === form) {
            return words;
        } else {
            do {
                words = words + ' ' + array[index + count];
                count++;
            } while (syllable(words) < form);
            return words;
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        setString(string);
        // console.log(string);
        console.log(getLine(string, form));
        // let articleAPITerm = articleName.split(' ').join('_');
        // getData(articleAPITerm).then((data) => {
        //     setArticle(data.parse.text['*']);
        // });
        // console.log(article);
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
                <label for="article-name">String:</label>
                <textarea type="textarea" id="article-name" name="article-name" onChange={onChangeString} value={string}/>
                <label for="form">Form:</label>
                <input type="number" id="form" name="form" value={form} onChange={onChangeForm}></input>
                <button type="submit" onClick={onFormSubmit}>show</button>
            </form>
        </div>
        )
  }

export default GenerateFromString;