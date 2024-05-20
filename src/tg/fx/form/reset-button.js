import classes from '../../fx.module.scss';

const FormResetButton = (props) => {

    const { handleResetClick } = props;

    return (
        <button className={classes.button} onClick={props.onReset}>RESET</button>
    )
}

export default FormResetButton;