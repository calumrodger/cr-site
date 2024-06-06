import classes from './status-bar.module.scss';
import { useEffect } from 'react';

const StatusBar = (props) => {

    const { statusMessage, onSetStatusMessage } = props;

    useEffect(() => {
        if (statusMessage[0] !== 'all systems good') {
            const counter = setTimeout(() => {
                onSetStatusMessage('all systems good', 0, 'white');
            }, statusMessage[1])
    
            return () => {
                clearTimeout(counter);
            }
        }
    }, [statusMessage]);

    return (
        <div className={classes.statusBar}>
            <div className={classes.label}>
                STATUS
            </div>
            <div className={classes.bar} style={{color: statusMessage[2]}}>
                {statusMessage[0]}
            </div>
        </div>
    )
}

export default StatusBar;