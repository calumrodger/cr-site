import NavBar from "./nav-bar"
import classes from './layout.module.scss'
import Footer from "./footer"

const Layout = (props) => {
    return (
        <>
        <div className={classes.globalContainer}>
        <NavBar posts={props.posts} randomPost={props.randomPost} categories={props.categories} cat={props.cat}/> 
        <div className={classes.mainContainer}>
        <main>{props.children}</main>
        </div>
        <Footer />
        </div>
        </>
    )
}

export default Layout