import NavBar from "./nav-bar"
import classes from './footer.module.scss'
import Footer from "./footer"

const Layout = (props) => {
    return (
        <>
        <div className={classes.globalContainer}>
        <NavBar posts={props.posts} randomPost={props.randomPost} categories={props.categories} cat={props.cat}/> 
        <main>{props.children}</main>
        <Footer />
        </div>
        </>
    )
}

export default Layout