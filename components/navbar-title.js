import classes from './nav-bar.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const NavbarTitle = () => {

    const { asPath } = useRouter()

    // Return navbar
    return (
        <>
            <div className={`${classes.title} ${asPath === '/' ? classes.selected : null}`}><span className={classes.byText}>by </span><Link href='/'>Calum Rodger</Link></div>
        </>
        
    )
}

export default NavbarTitle