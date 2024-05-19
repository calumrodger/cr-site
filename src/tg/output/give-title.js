import classes from '../output.module.scss';

const GiveTitle = (props) => {

    const { poemTitle, onSetPoemTitle } = props;

    return (
        <div>
            <span>Title:</span>
            <input type="text" value={poemTitle} onChange={onSetPoemTitle}/>
        </div>
    );
}

export default GiveTitle;