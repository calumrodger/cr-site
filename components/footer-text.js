import classes from './footer.module.scss'

const FooterText = () => {

    let currentText = `at the interface of poetry and tech since '05!`

    return (
        <>
        <div className={classes.footerText}>
            <span>{currentText}</span>
        </div>
        </>
    )
}

export default FooterText