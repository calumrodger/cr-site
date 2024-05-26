import classes from './current-form.module.scss';

const PoemLength = (props) => {

    const { poem } = props;

    return (
        <div className={classes.lengthBar}>
            <div className={classes.label}>
                LENGTH
            </div>
            <div className={classes.bar}>
                {poem.length}
            </div>
        </div>
    )
}

export default PoemLength;