import classes from './footer.module.scss'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const FooterButtons = () => {

    const path = usePathname()

    const [burgerIcon, setBurgerIcon] = useState('▶')
    const [showLinks, setShowLinks] = useState(true) 

    useEffect(() => {
        if ( path.includes('/poem/') ) {
            setShowLinks(false)
            setBurgerIcon('◀')
        }
      }, [path])

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
                <div className={`${classes.link} ${path === '/news' ? classes.selectedButton : null}`}><Link href='/news'>news</Link></div>
                <div className={`${classes.link} ${path === '/press' ? classes.selectedButton : null}`}><Link href='/press'>press</Link></div>
                <div className={`${classes.link} ${path === '/bio' ? classes.selectedButton : null}`}><Link href='/bio'>bio</Link></div>
                <div className={`${classes.link} ${path === '/contact' ? classes.selectedButton : null}`}><Link href='/contact'>contact</Link></div>
                <div className={`${classes.link} ${path === '/mailing-list' ? classes.selectedButton : null}`}><Link href='/mailing-list'>maillist</Link></div>
        </div>
        }
        <div className={classes.burgerIcon} onClick={burgerHandler}>{burgerIcon}</div>
        </div>
        </>
    )
}

export default FooterButtons