import classes from '../pads.module.scss';

import { useState } from 'react';

const InjectControls = (props) => {

    const {onClickInject, onChangeInjectSetting, injectSetting} = props;
    
        return (
            <div className={classes.injectContainer}>
                <div className={classes.injectControlsContainer}>
                    <div className={classes.field}>
                        <input type="radio" id="replace" name="inject-setting" value="replace" checked={injectSetting === 'replace'} onChange={onChangeInjectSetting} />
                        <label htmlFor="replace">replace</label>
                    </div>
                    <div className={classes.field}>
                        <input type="radio" id="add-after" name="inject-setting" value="add-after" checked={injectSetting === 'add-after'} onChange={onChangeInjectSetting} />
                        <label htmlFor="add-after">add after</label>
                    </div>
                    <div className={classes.field}>
                        <input type="radio" id="add-before" name="inject-setting" value="add-before" checked={injectSetting === 'add-before'} onChange={onChangeInjectSetting} />
                        <label htmlFor="add-before">add before</label>
                    </div>
                </div>
                <button onClick={onClickInject} className={`${classes.button} ${classes.injectButton}`}>INJECT</button>
            </div>
        )
}

export default InjectControls;