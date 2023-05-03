import classes from './footer.module.scss'

const FooterText = (props) => {
    const {footerText} = props

    return (
        <>
        <div className={classes.footerText}>
            <span>hello</span>
        </div>
        </>
    )
}

export default FooterText