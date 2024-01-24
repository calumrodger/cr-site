import classes from './nav-bar.module.scss'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const NavbarSubtitle = (props) => {

    const asPath = usePathname()

    const { isMobile } = props
    let { showCatbar } = props
    
    const [burgerIcon, setBurgerIcon] = useState('▼')
    const [selected, setSelected] = useState(false)

    const subtitle = 'poetry +'

    useEffect(() => {
        if (showCatbar && isMobile) {
            setBurgerIcon('▲')
        }
        if (!showCatbar && isMobile) {
            setBurgerIcon('▼')
        }
        if (showCatbar && !isMobile) {
            setBurgerIcon('◀')
        }
        if (!showCatbar && !isMobile) {
            setBurgerIcon('▶')
        }
    }, [showCatbar, isMobile])

    useEffect(() => {
        if ( 
            asPath.includes('/book') || 
            asPath.includes('/game') ||
            asPath.includes('/film-image') ||
            asPath.includes('/performance') ||
            asPath.includes('/web') ||
            asPath.includes('/article')
        ) {
            setSelected(true)
        } else {
            setSelected(false)
        }
    }, [asPath])
    
 

    const burgerHandler = () => {
        if (showCatbar === true) {
            props.setShowCatbar(false)
        } else {
            props.setShowCatbar(true)
        }
    }

    
   
    // Return navbar
    return (
        <>
        <div className={classes.subtitleContainer}>
            <div onClick={burgerHandler} className={`${classes.subtitle} ${selected ? classes.selected : null}`}>{burgerIcon} {subtitle}</div>
        </div>
        </>
        
    )
}

export default NavbarSubtitle