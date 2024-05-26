import classes from './current-form.module.scss';

const CurrentForm = (props) => {

    const { form } = props;

    return (
        <div className={classes.formBar}>
            <div className={classes.label}>
                CURRENT FORM
            </div>
            <div className={classes.bar}>
                {form}
            </div>
        </div>
    )
}

export default CurrentForm;