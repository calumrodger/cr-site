'use client';

import classes from './poem.module.scss';
import { useState, useEffect } from 'react';

const Poem = (props) => {

  const { source } = props;

  const sourceArray = source.split(" ");

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

  const objArray = newSource.map((item, index) => {
    return { id: index, text: item, selected: false }
  });

  const [poem, setPoem] = useState(objArray)

  const onWordClick = (e) => {
    console.log(e.target.id);
    let newObjArray = poem.map((item) => {
      if (item.id == e.target.id) {

        return { id: item.id, text: item.text, selected: item.selected ? false : true}
      } else {
        return item;
      }
    });
    console.log(newObjArray)
    setPoem(newObjArray);
  };
  console.log(poem)

  // useEffect(() => {
  //   // setPoem(objArray);
  // }, [poem]);

  const replaceWithHello = () => {
    let newObjArray = poem.map((item) => {
      if (item.selected) {
        return { id: item.id, text: "hello", selected: true }
      } else {
        return item;
      }
    });
    setPoem(newObjArray);
  }

  return (
    <div className={classes.pageContainer}>
    <div className={classes.pageContent}>
      <div className={classes.box}>
        <div className={classes.text}>{poem.map((t, i) => {
          if (t.text === '\n') {
            return <br className={classes.lineBreak}/>
          } else {
            return <><div id={t.id} onClick={onWordClick} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{t.text}</div></>
          }
        })}</div>
      </div>
      <button className={classes.button} onClick={replaceWithHello}>replace selected with "hello"</button>
      </div>
    </div> 
  );
};

export default Poem;
