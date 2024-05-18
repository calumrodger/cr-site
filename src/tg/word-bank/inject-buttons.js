import classes from '../pads.module.scss';

import { useState } from 'react';

const InjectControls = (props) => {

    const {onClickInject, onChangeInjectSetting, injectSetting} = props;
    
        return (
            <div className={classes.injectControlsContainer}>
                <button id="replace" onClick={onChangeInjectSetting} className={`${classes.button} ${injectSetting === 'replace' ? classes.selected : null}`}>replace</button>
                <button id="add-before" onClick={onChangeInjectSetting} className={`${classes.button} ${injectSetting === 'add-before' ? classes.selected : null}`}>add before</button>
                <button id="add-after" onClick={onChangeInjectSetting} className={`${classes.button} ${injectSetting === 'add-after' ? classes.selected : null}`}>add after</button>
                <button onClick={onClickInject} className={`${classes.button}`}>INJECT</button>
            </div>
        )
}

export default InjectControls;