import { useRef, useState, useEffect } from 'react'
import NavBar from "./nav-bar"
import classes from './layout.module.scss'
import Footer from "./footer"

const Layout = (props) => {

  const [height, setHeight] = useState(16)

    return (
        <>
        <div className={classes.globalContainer}>
            <div className={classes.navbarContainer}>
        <NavBar setHeight={setHeight} posts={props.posts} randomPost={props.randomPost} categories={props.categories} cat={props.cat}/> 
             </div>
        <div className={classes.mainContainer} style={{marginTop: height + 'px'}}>
        <main>{props.children}</main>
        </div>
        <Footer />
        </div>
        </>
    )
}

export default Layout