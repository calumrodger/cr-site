import classes from './button.module.scss'

const Button = (props) => {

    const { extraClasses } = props

    // let classesString = `${classes.button}`

    // for (let i = 0; i < extraClasses.length; i++) {
    //     classesString = classesString + '${classes.' + extraClasses[i] + '}'
    // }

    return (
        <div className={`${classes['button']} ${classes[ extraClasses ]}`}>{props.children}</div>
    )
}

export default Button