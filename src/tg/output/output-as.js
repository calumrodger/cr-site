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
                <span style={{color: "#fff"}}>as</span>
                <input type="radio" id="lines" name="output" value="lines" checked={outputCheckbox === 'lines' || padToShow === 'stanza'} onChange={() => onChangeOutputCheckbox('lines')} />
                <label style={{color: "#fff"}} htmlFor="lines">lines</label>
                <input type="radio" id="grid" name="output" value="grid" checked={outputCheckbox === 'grid' && padToShow !== 'stanza'} onChange={() => onChangeOutputCheckbox('grid')} />
                <label htmlFor="grid">grid</label>
                <input type="radio" id="slides" name="output" value="slides" checked={outputCheckbox === 'slides' && padToShow !== 'stanza'} onChange={() => onChangeOutputCheckbox('slides')} />
                <label htmlFor="slides">pages</label>
                <input type="radio" id="loop" name="output" value="loop" checked={outputCheckbox === 'loop' && padToShow !== 'stanza'} onChange={() => onChangeOutputCheckbox('loop')} />
                <label htmlFor="loop">loop</label>
            </div>
            </>
        );
}

export default OutputAs;