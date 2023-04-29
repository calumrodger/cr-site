import classes from './footer.module.scss'

const Footer = () => {
    return (
        <>
        <div className={classes.footer}>
            <p className={classes.namecheck}>Calum Rodger: Poet + Software Developer</p>
            <div className={classes.footerLinksContainer}>
            <div className={classes.link}>bio</div>
            <div className={classes.link}>contact</div>
            <div className={classes.link}>mailing list</div>
            </div>
        </div>
        </>
    )
}

export default Footer