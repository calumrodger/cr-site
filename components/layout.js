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
    const [topPadding, setTopPadding] = useState('0')

//choose the screen size 
const handleResize = () => {
  if (window.innerWidth < 966) {
      setIsMobile(true)
  } else {
      setIsMobile(false)
  }
  if (window.innerWidth < 966 && showCatbar) {
    setTopPadding('1.625rem')
  }
  if (window.innerWidth < 966 && !showCatbar) {
    setTopPadding('0')
  }
  if (window.innerWidth < 535 && showCatbar) {
    setTopPadding('3.25rem')
  }
  if (window.innerWidth < 535 && !showCatbar) {
    setTopPadding('0')
  }
}

// create an event listener
useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
}, [showCatbar])

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
            <div className={classes.navbarTitle}>
                <NavbarTitle />
            </div>

            {isMobile && showCatbar &&
            <div className={classes.mobileCatbar} >
                 <CatBar cat={props.cat} categories={props.categories} randomPost={props.randomPost} burgerToggle={props.burgerToggle}/>
            </div>
            }

            <div className={classes.mainContent} style={{paddingTop: topPadding}}>
                <MainContentContainer>{props.children}</MainContentContainer>
            </div>

            <div className={classes.footerText} >
                {!isMobile && <FooterText posts={props.posts} /> }
            </div>

            <div className={classes.footerButtons} >
                <FooterButtons />
            </div>
        </div>
        </>
    )
}

export default Layout