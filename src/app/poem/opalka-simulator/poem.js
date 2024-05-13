'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import classes from './poem.module.scss';

const OpalkaSimulator = () => {
  const [count, setCount] = useState(-1);
  const [stringCount, setStringCount] = useState('');
  const ref = useRef();
  const [height, setHeight] = useState(0)

  const clear = () => {
    setCount(count + 1);
    setStringCount('');
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
        setCount(count + 1);
        setStringCount(stringCount + `<div>${count.toString()}</div>`);
    }, 100);
        return () => {
            clearInterval(intervalId);
        };
  }, [count, stringCount]);

  const heightOrNothing = ref?.current?.clientHeight || 0;

  
    useEffect(() => {
        clear();
  
    },[heightOrNothing]);

  return (
    <div ref={ref} className={classes.container}>
      <div className={classes.count} dangerouslySetInnerHTML={{__html: stringCount}} />               
    </div>
  );
};

export default OpalkaSimulator;
