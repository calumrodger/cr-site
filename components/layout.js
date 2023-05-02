import { useRef, useState, useEffect } from 'react'
import CatBar from './cat-bar'
import classes from './layout.module.scss'
import FooterText from './footer-text'
import FooterButtons from './footer-buttons'

import NavbarSubtitle from './navbar-subtitle'
import NavbarTitle from './navbar-title'

const Layout = (props) => {

  const [showCatbar, setShowCatbar] = useState(true)

    return (
        <>
        <div className={classes.grid}>
                    {/* <NavBar className={classes.navbarSubtitle} setHeight={setHeight} posts={props.posts} randomPost={props.randomPost} categories={props.categories} cat={props.cat}/>
                    <CatBar className={classes.desktopCatbar} setHeight={setHeight} cat={props.cat} categories={props.categories} randomPost={props.randomPost} burgerToggle={props.burgerToggle}/>
                    <NavBar className={classes.navbarTitle} setHeight={setHeight} posts={props.posts} randomPost={props.randomPost} categories={props.categories} cat={props.cat}/> 
                    <CatBar className={classes.mobileCatbar} setHeight={setHeight} cat={props.cat} categories={props.categories} randomPost={props.randomPost} burgerToggle={props.burgerToggle}/>
                    <div className={classes.mainContent}>
                        <main>{props.children}</main>
                    </div>
                    <FooterText className={classes.footerText}/>
                    <FooterButtons className={classes.footerButtons}/> */}

            <div className={classes.navbarSubtitle}>
                <NavbarSubtitle  showCatbar={showCatbar} setShowCatbar={setShowCatbar}/>
            </div>
            <div className={classes.desktopCatbar}>
                
            </div>
            <div className={classes.navbarTitle}>
                <NavbarTitle />
            </div>

            { showCatbar && 
            <div className={classes.mobileCatbar} >
                <CatBar cat={props.cat} categories={props.categories} randomPost={props.randomPost} burgerToggle={props.burgerToggle}/>
            </div>
            }

            <div className={classes.mainContent} >
                {props.children}
            </div>

            <div className={classes.footerText} >
                <FooterText />
            </div>

            <div className={classes.footerButtons} >
                <FooterButtons />
            </div>
        </div>
        </>
    )
}

export default Layout