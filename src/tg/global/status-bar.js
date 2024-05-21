import classes from './status-bar.module.scss';

const StatusBar = (props) => {

    const { status } = props;

    return (
        <div className={classes.statusBar}>
            <div className={classes.label}>
                STATUS
            </div>
            <div className={classes.bar}>

            </div>
        </div>
    )
}

export default StatusBar;