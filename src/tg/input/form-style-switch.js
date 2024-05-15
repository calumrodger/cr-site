import classes from './input.module.scss';

const FormStyleSwitch = (props) => {

    const { formStyle, onSetFormStyle } = props;

    const buttonText = formStyle === 'syllable' ? 'Switch to Stress' : 'Switch to Syllable';

    return (
        <button className={classes.button} onClick={onSetFormStyle}>{buttonText}</button>
    )

}

export default FormStyleSwitch;