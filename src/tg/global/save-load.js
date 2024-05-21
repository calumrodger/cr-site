import Link from 'next/link';
import classes from '../input.module.scss';

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
            <div className={classes.saveLoadContainer}>
                <button onClick={onSavePoem} className={classes.button}>SAVE</button>
                <label className={classes.fileLoad} htmlFor="txt-src">LOAD
                <input className={classes.fileLoad} type="file" accept=".json" id="txt-src" name="txt-src" onChange={onChangeHandler}  />
                </label>
                <Link className={classes.button} href="/docs">HELP</Link>
            </div>
        )
}

export default SaveLoad;