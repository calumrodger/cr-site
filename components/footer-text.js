import classes from './footer.module.scss'

const FooterText = () => {

    let currentText = ''

    return (
        <>
        <div className={classes.footerText}>
            <span>{currentText}</span>
        </div>
        </>
    )
}

export default FooterText