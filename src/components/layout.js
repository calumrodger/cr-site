'use client';
import { useState, useEffect } from 'react'
import CatBar from './cat-bar'
import classes from './layout.module.scss'
import FooterText from './footer-text'
import FooterButtons from './footer-buttons'
import NavbarSubtitle from './navbar-subtitle'
import NavbarTitle from './navbar-title'
import { usePathname } from 'next/navigation';

const Layout = (props) => {

    const [showCatbar, setShowCatbar] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const [topPadding, setTopPadding] = useState('0')
    const cat = props.cat;

    // const router = useRouter()
    const path = usePathname();

//choose the screen size 
const handleResize = () => {
  if (window.innerWidth < 1024) {
      setIsMobile(true)
  } else {
      setIsMobile(false)
  }
  if (window.innerWidth < 1024 && showCatbar) {
    setTopPadding('1.25rem')
  }
  if (window.innerWidth < 1024 && !showCatbar) {
    setTopPadding('0')
  }
  if (window.innerWidth < 459 && showCatbar) {
    setTopPadding('2.667rem')
  }
  if (window.innerWidth < 459 && !showCatbar) {
    setTopPadding('0')
  }
  if (window.innerWidth > 1024 ) {
    setTopPadding('0')
  }
}

useEffect(() => {
  if ( path.includes('/poem/') ) {
    setShowCatbar(false)
  }
}, [path])

// create an event listener
useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [showCatbar])


    return (
        <>
        <div className={classes.grid}>

        <div className={classes.leftMargin} />

            <div className={classes.navbarSubtitle}>
                <NavbarSubtitle  isMobile={isMobile} showCatbar={showCatbar} setShowCatbar={setShowCatbar}/>
                {!isMobile && showCatbar && <CatBar cat={cat} categories={props.categories} burgerToggle={props.burgerToggle}/>}
            </div>
            <div className={classes.navbarTitle}>
                <NavbarTitle />
            </div>

            <div className={classes.rightMargin} />


            {isMobile && showCatbar &&
            <div className={classes.mobileCatbar} >
                 <CatBar cat={props.cat} categories={props.categories} burgerToggle={props.burgerToggle}/>
            </div>
            }

            <div className={classes.mainContent} style={{marginTop: topPadding}}>
                {props.children}
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