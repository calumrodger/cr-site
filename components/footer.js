import classes from './footer.module.scss'
import Link from 'next/link'

const Footer = () => {
    return (
        <>
        <div className={classes.footer}>
            <span className={classes.namecheck}>fun text here</span>
            <div className={classes.footerLinksContainer}>
            <div className={classes.link}><Link href='/news'>news</Link></div>
            <div className={classes.link}><Link href='/bio'>bio</Link></div>
            <div className={classes.link}><Link href='/contact'>contact</Link></div>
            <div className={classes.link}><Link href='/mailing-list'>maillist</Link></div>
            </div>
        </div>
        </>
    )
}

export default Footer