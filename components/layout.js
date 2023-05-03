import { useState, useEffect } from 'react'
import CatBar from './cat-bar'
import classes from './layout.module.scss'
import FooterText from './footer-text'
import FooterButtons from './footer-buttons'

import NavbarSubtitle from './navbar-subtitle'
import NavbarTitle from './navbar-title'

const Layout = (props) => {

  const [showCatbar, setShowCatbar] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [footerText, setFooterText] = useState('')
 
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
  window.addEventListener("resize", handleResize)
})

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

            <div className={classes.mainContent} setFooterText={setFooterText}>
                {props.children}
            </div>

            <div className={classes.footerText} >
                <FooterText footerText={footerText} />
            </div>

            <div className={classes.footerButtons} >
                <FooterButtons />
            </div>
        </div>
        </>
    )
}

export default Layout