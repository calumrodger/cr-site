'use client';

import classes from './input.module.scss';
import PopulateFromYouTubeComments from '@tg/input/populate-from-yt-comments';

import { syllable } from 'syllable';

import { useState, useEffect } from 'react';
import LoadFromTxt from './load-from-txt';

  const GenerateSection = (props) => {

    const { onChangeString, string, onClickShowSrc, onClickImportAsStanza } = props;

    // const demoString = "The cat (Felis catus), commonly referred to as the domestic cat or house cat, is a small domesticated carnivorous mammal. It is the only domesticated species of the family Felidae. Recent advances in archaeology and genetics have shown that the domestication of the cat occurred in the Near East around 7500 BC. It is commonly kept as a house pet and farm cat, but also ranges freely as a feral cat avoiding human contact. It is valued by humans for companionship and its ability to kill vermin. Its retractable claws are adapted to killing small prey like mice and rats. It has a strong, flexible body, quick reflexes, sharp teeth, and its night vision and sense of smell are well developed. It is a social species, but a solitary hunter and a crepuscular predator. Cat communication includes vocalizations like meowing, purring, trilling, hissing, growling, and grunting as well as cat body language. It can hear sounds too faint or too high in frequency for human ears, such as those made by small mammals. It also secretes and perceives pheromones.Female domestic cats can have kittens from spring to late autumn in temperate zones and throughout the year in equatorial regions, with litter sizes often ranging from two to five kittens. Domestic cats are bred and shown at events as registered pedigreed cats, a hobby known as cat fancy. Animal population control of cats may be achieved by spaying and neutering, but their proliferation and the abandonment of pets has resulted in large numbers of feral cats worldwide, contributing to the extinction of bird, mammal and reptile species. As of 2017, the domestic cat was the second most popular pet in the United States, with 95.6 million cats owned and around 42 million households owning at least one cat. In the United Kingdom, 26% of adults have a cat, with an estimated population of 10.9 million pet cats as of 2020. As of 2021, there were an estimated 220 million owned and 480 million stray cats in the world.";

    
    const [youTubeString, setYouTubeString] = useState('');
    const [txtString, setTxtString] = useState('');

    const onPopulateWithYouTubeComments = (comments) => {
        setYouTubeString(comments);
    }

    const onPopulateWithTxt = (txt) => {
        setTxtString(txt);
    }

    useEffect(() => {
        if (youTubeString !== '') {
        onChangeString({target: {value: youTubeString}})
        }
    }, [youTubeString])

    useEffect(() => {
        if (txtString !== '') {
        onChangeString({target: {value: txtString}})
        }
    }, [txtString])

    const onClickRemoveLineBreaks = () => {
    }
   
    return (
            <div className={classes.inputPadSectionContainer}>
                
               
 
            <PopulateFromYouTubeComments onPopulateWithYouTubeComments={onPopulateWithYouTubeComments}/>
            <LoadFromTxt onPopulateWithTxt={onPopulateWithTxt}/>
            <textarea className={classes.inputPad} type="textarea" id="article-name" name="article-name" value={string} onChange={onChangeString}/>
            <button onClick={onClickRemoveLineBreaks} className={classes.button}>REMOVE LINE BREAKS</button>
            <button onClick={onClickImportAsStanza} className={classes.button}>IMPORT AS STANZA</button>
            <button onClick={onClickShowSrc} className={classes.button}>SAVE & CLOSE</button>
        </div>
        )
  }
  
export default GenerateSection;