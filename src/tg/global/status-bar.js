import classes from './status-bar.module.scss';
import { useEffect, useState } from 'react';

const StatusBar = (props) => {

    const { statusMessage, onSetStatusMessage } = props;
    const [timer, setTimer] = useState(0);

    // useEffect(() => {
    //     if (statusMessage !== 'all systems good') {
    //         setTimer(0);
    //         setInterval(setTimer(timer + 1), 1);
    //         if (timer === 2000) {
    //             onSetStatusMessage('all systems good')
    //         }
    //     }
    // }, [statusMessage])

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