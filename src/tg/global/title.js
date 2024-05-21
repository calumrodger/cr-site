import classes from './title.module.scss';

const Title = () => {
    return (
        <div className={classes.container}>
            <div className={classes.topLine}>.appendChilde(roland)</div>
            <div className={classes.bottomLine}>poem creation and remix tool</div>
        </div>
    )
}

export default Title;