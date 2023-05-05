import { useState, useEffect, useRef } from 'react'
import CatBar from './cat-bar'
import classes from './layout.module.scss'
import FooterText from './footer-text'
import FooterButtons from './footer-buttons'
import Router from 'next/router'
import ScrollRestorationDisabler from './head'

import NavbarSubtitle from './navbar-subtitle'
import NavbarTitle from './navbar-title'
import MainContentContainer from './main-content-container'

const Layout = (props) => {

    const contentRef = useRef()

    const [showCatbar, setShowCatbar] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

//choose the screen size 
const handleResize = () => {
  if (window.innerWidth < 966) {
      setIsMobile(true)
  } else {
      setIsMobile(false)
  }
}

// create an event listener
useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
}, [])

// useEffect(() => {
//     console.log(contentRef.current.scrollY)
// }, [])


    return (
        <>
        <div className={classes.grid}>

            <div className={classes.navbarSubtitle}>
                <NavbarSubtitle  isMobile={isMobile} showCatbar={showCatbar} setShowCatbar={setShowCatbar}/>
                {!isMobile && showCatbar && <CatBar cat={props.cat} categories={props.categories} randomPost={props.randomPost} burgerToggle={props.burgerToggle}/>}
            </div>
            <div className={classes.desktopCatbar}>
                
            </div>
            <div className={classes.navbarTitle}>
                <NavbarTitle />
            </div>

            {isMobile && showCatbar &&
            <div className={classes.mobileCatbar} >
                 <CatBar cat={props.cat} categories={props.categories} randomPost={props.randomPost} burgerToggle={props.burgerToggle}/>
            </div>
            }

            <div className={classes.mainContent}>
                <MainContentContainer>{props.children}</MainContentContainer>
            </div>

            <div className={classes.footerText} >
                <FooterText posts={props.posts} />
            </div>

            <div className={classes.footerButtons} >
                <FooterButtons />
            </div>
        </div>
        </>
    )
}

export default Layout