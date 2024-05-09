'use client';

import classes from './poem.module.scss';
import { useState } from 'react';

// INPUT COMPONENTS
import GenerateFromWiki from '@tg/input/generate-from-wiki';
import GenerateFromString from '@tg/input/generate-from-string';

// PROCESS COMPONENTS
import ReplaceWithHello from '@tg/process/replace-with-hello';
import UndoRedo from '@tg/process/undo-redo';
import NGrammer from '@tg/process/n-gram';

const Poem = (props) => {

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
  

  const [poem, setPoem] = useState(treatString(source))
  const [oldPoem, setOldPoem] = useState([])

  const onWordClick = (e) => {
    let newObjArray = poem.map((item) => {
      if (item.id == e.target.id) {
        return { id: item.id, type: 'text', text: item.text, selected: item.selected ? false : true}
      } else {
        return item;
      }
    });
    setPoem(newObjArray);
    setOldPoem(poem);
  };

  const onUpdate = (newPoem) => {
    setPoem(newPoem);
    setOldPoem(poem);
  }


  return (
    <div className={classes.pageContainer}>
    <div className={classes.pageContent}>
      <div className={classes.inputSection}>
        <p>INPUT</p>
        {/* <GenerateFromWiki /> */}
        <GenerateFromString treatString={treatString} setPoem={setPoem} setOldPoem={setOldPoem} poem={poem}/>
      </div>
      <div className={classes.box}>
        <div className={classes.text}>
          {poem.map((t, i) => {
            if (t.text === '\n') {
              return <br id={i} key={i} className={classes.lineBreak}/>
            } else {
              return <div id={i} key={i} onClick={onWordClick} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{t.text}</div>
            }
          })}
        </div>
      </div>
      <div className={classes.processSection}>
        <p>PROCESS</p>
        <ReplaceWithHello onUpdate={onUpdate} poem={poem}/> 
        <UndoRedo setPoem={setPoem} setOldPoem={setOldPoem} poem={poem} oldPoem={oldPoem} />
        {/* <NGrammer setPoem={setPoem} setOldPoem={setOldPoem} poem={poem} /> */}
      </div>
      </div>
    </div> 
  );
};

export default Poem;
