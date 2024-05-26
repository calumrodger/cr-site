import classes from '../tg-styles.module.scss';

const OutputAs = (props) => {
    
        const { padToShow, onClickOutput, outputCheckbox, onChangeOutputCheckbox } = props;

        const onClickOutputButton = () => {
            onClickOutput(outputCheckbox);
        }
    
        return (
            <>
            <button className={`${classes.button} ${classes.outputButton}`} onClick={onClickOutputButton}>OUTPUT</button>
            <div className={`${classes.settingsContainer} ${padToShow !== 'poem' ? classes.disabled : null}`}>
                <span >as</span>
                <input className={`${classes.radioInput} ${outputCheckbox === 'lines' ? classes.selected : null}`} type="radio" id="lines" name="output" value="lines" checked={outputCheckbox === 'lines'} onChange={() => onChangeOutputCheckbox('lines')} />
                <label htmlFor="lines">lines</label>
                <input className={`${classes.radioInput} ${outputCheckbox === 'grid' ? classes.selected : null}`} type="radio" id="grid" name="output" value="grid" disabled={padToShow === 'stanza' ? true : false} checked={outputCheckbox === 'grid'} onChange={() => onChangeOutputCheckbox('grid')} />
                <label htmlFor="grid">grid</label>
                <input className={`${classes.radioInput} ${outputCheckbox === 'slides' ? classes.selected : null}`} type="radio" id="slides" name="output" value="slides" disabled={padToShow === 'stanza' ? true : false} checked={outputCheckbox === 'slides'} onChange={() => onChangeOutputCheckbox('slides')} />
                <label htmlFor="slides">pages</label>
                <input className={`${classes.radioInput} ${outputCheckbox === 'loop' ? classes.selected : null}`} type="radio" id="loop" name="output" value="loop" disabled={padToShow === 'stanza' ? true : false} checked={outputCheckbox === 'loop'} onChange={() => onChangeOutputCheckbox('loop')} />
                <label htmlFor="loop">loop</label>
            </div>
            </>
        );
}

export default OutputAs;