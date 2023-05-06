import classes from './footer.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const FooterButtons = () => {

    const { asPath } = useRouter()

    const [burgerIcon, setBurgerIcon] = useState('▶')
    const [showLinks, setShowLinks] = useState(true) 

    const burgerHandler = () => {
        if (showLinks) {
            setShowLinks(false)
            setBurgerIcon('◀')
        }
        if (!showLinks) {
            setShowLinks(true)
            setBurgerIcon('▶')
        }
    }



    return (
        <>
        <div className={classes.footerButtonsContainer}>
        {showLinks && 
        <div className={classes.footerButtons}>
                <div className={`${classes.link} ${asPath === '/news' ? classes.selectedButton : null}`}><Link href='/news'>news</Link></div>
                <div className={`${classes.link} ${asPath === '/press' ? classes.selectedButton : null}`}><Link href='/press'>press</Link></div>
                <div className={`${classes.link} ${asPath === '/bio' ? classes.selectedButton : null}`}><Link href='/bio'>bio</Link></div>
                <div className={`${classes.link} ${asPath === '/contact' ? classes.selectedButton : null}`}><Link href='/contact'>contact</Link></div>
                <div className={`${classes.link} ${asPath === '/mailing-list' ? classes.selectedButton : null}`}><Link href='/mailing-list'>maillist</Link></div>
        </div>
        }
        <div className={classes.burgerIcon} onClick={burgerHandler}>{burgerIcon}</div>
        </div>
        </>
    )
}

export default FooterButtons