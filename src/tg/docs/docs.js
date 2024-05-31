import classes from './docs.module.scss';

const Docs = (props) => {

    const { onSetDocsMode } = props;
    return (
        <>
        <div className={classes.container}>
            <h1>Docs</h1>
        </div>
        <div className={classes.panel}>
            <button className={classes.button} onClick={onSetDocsMode}>X</button>
        </div>
        </>
    )
}

export default Docs;