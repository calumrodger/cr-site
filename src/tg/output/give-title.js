import classes from '../tg-styles.module.scss';

const GiveTitle = (props) => {

    const { poemTitle, onSetPoemTitle } = props;

    return (
        <div className={classes.titleContainer}>
            <span>Title:</span>
            <input type="text" placeholder="(optional) poem title here..." value={poemTitle} onChange={onSetPoemTitle}/>
        </div>
    );
}

export default GiveTitle;