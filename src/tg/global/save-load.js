import classes from '../input/input.module.scss';

const SaveLoad = (props) => {

    const { poem, poemTitle } = props;

    const onChangeHandler = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        if (!file) {
            return;
        }
        reader.readAsText(file);
        reader.onload = function() {
            setFinalString(reader.result.replace(/(?:\r\n|\r|\n)/g, ' '));
        };
    }

    const onSavePoem = () => {
        console.log(poem, poemTitle)
    }
    
        return (
            <>
                <button onClick={onSavePoem} className={classes.button}>SAVE</button>
                <label htmlFor="txt-src">Txt file:</label>
                <input type="file" accept=".json" id="txt-src" name="txt-src" onChange={onChangeHandler}  />
            </>
        )
}

export default SaveLoad;