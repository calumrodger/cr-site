import classes from './output.module.scss';

const GiveTitle = (props) => {

    const { poemTitle, onSetPoemTitle } = props;

    return (
        <div>
            <span>title:</span>
            <input type="text" value={poemTitle} onChange={onSetPoemTitle}/>
        </div>
    );
}

export default GiveTitle;