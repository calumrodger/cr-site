import classes from '../../tg-styles.module.scss';

const FormResetButton = (props) => {

    const { onResetTypography } = props;

    return (
        <button className={`${classes.button} ${classes.resetButton}`} onClick={onResetTypography}>RESET</button>
    )
}

export default FormResetButton;