import classes from './nav-bar.module.scss'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import CatBar from './cat-bar'

const NavbarTitle = (props) => {

    const { asPath } = useRouter()

    const { randomPost } = props
    const { categories } = props
    let { cat } = props
    const { setHeight } = props

    const [burgerToggle, setBurgerToggle] = useState(false)
    const [burgerIcon, setBurgerIcon] = useState('▼')
    const [isMobile, setIsMobile] = useState(false)

    // Return navbar
    return (
        <>
            <div className={`${classes.title} ${asPath === '/' ? classes.selected : null}`}><span className={classes.byText}>by </span><Link href='/'>Calum Rodger</Link></div>
        </>
        
    )
}

export default NavbarTitle