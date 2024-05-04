'use client';

import classes from './poem.module.scss';

import { useState } from 'react';

const Poem = () => {

    const [text, setText] = useState('');
    const [count, setCount] = useState(0);

    const string = "All work and no play makes Jack a dull boy. "
    const lettersArray = string.split('');
    const stringLength = lettersArray.length;

    const makeText = () => {
        setText(text + string[count]);
        count < stringLength - 1 ? setCount(count + 1) : setCount(0);
    }

  return (
    <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
            <textarea placeholder={'Start typing...'} className={classes.field} onChange={makeText} value={text} />
        </div>
    </div>
  );
};

export default Poem;