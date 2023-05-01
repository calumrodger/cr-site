import classes from './nav-bar.module.scss'
import { useState, useRef, useEffect } from 'react'

const NavbarSubtitle = (props) => {
    const { randomPost } = props
    const { categories } = props
    let { cat } = props
    const { setHeight } = props

    const [burgerToggle, setBurgerToggle] = useState(false)
    const [burgerIcon, setBurgerIcon] = useState('▼')
    const [isMobile, setIsMobile] = useState(false)
 
    //choose the screen size 
    // const handleResize = () => {
    // if (window.innerWidth < 769) {
    //     setIsMobile(true)
    // } else {
    //     setIsMobile(false)
    // }
    // }

    // create an event listener
    // useEffect(() => {
    // window.addEventListener("resize", handleResize)
    // })

   

    // const heightRef = useRef()

    // useEffect(() => {
    //     setHeight(heightRef.current.clientHeight)
    // }, [burgerToggle])
 

    const burgerHandler = () => {
        if (props.showCatbar === true) {
            props.setShowCatbar(false)
            setBurgerIcon('▼')
            // setHeight(heightRef.current.clientHeight)
        } else {
            props.setShowCatbar(true)
            setBurgerIcon('▲')
            // setHeight(heightRef.current.clientHeight)
        }
    }

    
   
    // Return navbar
    return (
        <>
            <div onClick={burgerHandler} >
            <span className={classes.subtitle}>poetry +</span><span className={classes.subtitleIcon}>{burgerIcon}</span>  
            </div>
        </>
        
    )
}

export default NavbarSubtitle