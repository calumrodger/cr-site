import classes from './status-bar.module.scss';

const StatusBar = (props) => {

    const { statusMessage } = props;

    return (
        <div className={classes.statusBar}>
            <div className={classes.label}>
                STATUS
            </div>
            <div className={classes.bar}>
                {statusMessage}
            </div>
        </div>
    )
}

export default StatusBar;