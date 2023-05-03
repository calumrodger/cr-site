import classes from './nav-bar.module.scss'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import CatBar from './cat-bar'

const NavbarTitle = (props) => {
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
            <div className={classes.title}><Link href='/'>Calum Rodger</Link></div>
        </>
        
    )
}

export default NavbarTitle