import classes from '../output.module.scss';

const OutputAs = (props) => {
    
        const { onClickOutput, outputCheckbox, onChangeOutputCheckbox } = props;

        const onClickOutputButton = () => {
            onClickOutput(outputCheckbox);
        }
    
        return (
            <>
            <button className={`${classes.button} ${classes.outputButton}`} onClick={onClickOutputButton}>OUTPUT</button>
                <span>as</span>
                <input type="radio" id="lines" name="output" value="lines" checked={outputCheckbox === 'lines'} onChange={() => onChangeOutputCheckbox('lines')} />
                <label htmlFor="lines">lines</label>
                <input type="radio" id="grid" name="output" value="grid" checked={outputCheckbox === 'grid'} onChange={() => onChangeOutputCheckbox('grid')} />
                <label htmlFor="grid">grid</label>
                <input type="radio" id="slides" name="output" value="slides" checked={outputCheckbox === 'slides'} onChange={() => onChangeOutputCheckbox('slides')} />
                <label htmlFor="slides">pages</label>
                <input type="radio" id="loop" name="output" value="loop" checked={outputCheckbox === 'loop'} onChange={() => onChangeOutputCheckbox('loop')} />
                <label htmlFor="loop">loop</label>
            </>
        );
}

export default OutputAs;