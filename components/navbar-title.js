import classes from './nav-bar.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const NavbarTitle = () => {

    const asPath = usePathname()

    // Return navbar
    return (
        <>yeah
            {/* <div className={`${classes.title} ${asPath === '/' ? classes.selected : null}`}><span className={classes.byText}>by </span><Link href='/'>Calum Rodger</Link></div> */}
        </>
        
    )
}

export default NavbarTitle