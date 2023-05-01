import classes from './footer.module.scss'
import Link from 'next/link'

const FooterButtons = () => {
    return (
        <>
        <div className={classes.footerButtons}>
                <div className={classes.link}><Link href='/news'>news</Link></div>
                <div className={classes.link}><Link href='/bio'>bio</Link></div>
                <div className={classes.link}><Link href='/contact'>contact</Link></div>
                <div className={classes.link}><Link href='/mailing-list'>maillist</Link></div>
        </div>
        </>
    )
}

export default FooterButtons