import classes from './nav-bar.module.scss'
import { useState, useRef, useEffect } from 'react'

const NavbarSubtitle = (props) => {

    const { isMobile } = props
    let { showCatbar } = props
    const { randomPost } = props
    const { categories } = props
    let { cat } = props
    const { setHeight } = props

    const [burgerToggle, setBurgerToggle] = useState(false)
    const [burgerIcon, setBurgerIcon] = useState('▼')

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
 

    const burgerHandler = () => {
        if (showCatbar === true) {
            props.setShowCatbar(false)
            // setHeight(heightRef.current.clientHeight)
        } else {
            props.setShowCatbar(true)
            // setHeight(heightRef.current.clientHeight)
        }
    }

    
   
    // Return navbar
    return (
        <>
        <div className={classes.subtitleContainer}>
            <div onClick={burgerHandler} className={classes.subtitle}>{subtitle} {burgerIcon}</div>
        </div>
        </>
        
    )
}

export default NavbarSubtitle