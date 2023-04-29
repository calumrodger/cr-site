import classes from './nav-bar.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import CatBar from './cat-bar'

const NavBar = (props) => {
    const { randomPost } = props
    const { categories } = props
    let { cat } = props

    const [burgerToggle, setBurgerToggle] = useState(false)
    const [burgerIcon, setBurgerIcon] = useState('▼')
 

    const burgerHandler = () => {
        if (burgerToggle === true) {
            setBurgerToggle(false)
            setBurgerIcon('▼')
        } else {
            setBurgerToggle(true)
            setBurgerIcon('▲')
        }
    }

   
    // Return navbar
    return (
        <>
        <div className={`${classes.navbarContainer}`}>
            <div className={classes.title}><Link href='/'><p className={classes.titleMain}>Calum Rodger</p><p className={classes.titleSub}>poetry +</p></Link></div>
                        <button className={classes.burgerButton} onClick={burgerHandler}>{burgerIcon}</button>
           <CatBar cat={cat} categories={categories} randomPost={randomPost} burgerToggle={burgerToggle}/>
        </div>
           
        </>
        
    )
}

export default NavBar