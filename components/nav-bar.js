import classes from './nav-bar.module.scss'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import CatBar from './cat-bar'

const NavBar = (props) => {
    const { randomPost } = props
    const { categories } = props
    let { cat } = props
    const { setHeight } = props

    const [burgerToggle, setBurgerToggle] = useState(false)
    const [burgerIcon, setBurgerIcon] = useState('▼')
    const [isMobile, setIsMobile] = useState(false)
 
    //choose the screen size 
    const handleResize = () => {
    if (window.innerWidth < 769) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
    }

    // create an event listener
    useEffect(() => {
    window.addEventListener("resize", handleResize)
    })

   

    const heightRef = useRef()

    useEffect(() => {
        setHeight(heightRef.current.clientHeight)
    }, [burgerToggle])
 

    const burgerHandler = () => {
        if (burgerToggle === true) {
            setBurgerToggle(false)
            setBurgerIcon('▼')
            // setHeight(heightRef.current.clientHeight)
        } else {
            setBurgerToggle(true)
            setBurgerIcon('▲')
            // setHeight(heightRef.current.clientHeight)
        }
    }

    
   
    // Return navbar
    return (
        <>
        <div ref={heightRef} className={`${classes.navbarContainer}`}>
            {/* <div className={classes.titleContainer}> */}
                
                <div className={`${classes.title} ${classes.titleSub} ${classes.subtitleContainer}`} onClick={burgerHandler}>
                    <div className={classes.poetryPlus}>poetry +</div>{ isMobile && <div className={classes.burgerIcon}>{burgerIcon}</div> }            
                {/* </div> */}
            </div>
            <div className={`${classes.title} ${classes.titleMain}`}><Link className={classes.titleLink} href='/'>Calum Rodger</Link></div>
           <CatBar setHeight={setHeight} cat={cat} categories={categories} randomPost={randomPost} burgerToggle={burgerToggle}/>
        </div>
           
        </>
        
    )
}

export default NavBar