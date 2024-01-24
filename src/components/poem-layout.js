'use client';
import classes from './poem-layout.module.scss'
import NavbarTitle from './navbar-title';
import Link from 'next/link'

const PoemLayout = (props) => {

    const poemTitle = props.title 

    return (
        <>
        <div className={classes.grid}>

            <div className={classes.navbarSubtitle}>
            </div>
            <div className={classes.navbarTitle}>
            <div className={classes.title}><span className={classes.byText}>by </span><Link href='/'>Calum Rodger</Link></div>
            </div>

            <div className={classes.leftMargin} />
            <div className={classes.rightMargin} />

            <div className={classes.mainContent}>
                {props.children}
            </div>

            <div className={classes.footerText} >
                <div>{poemTitle}</div>
            </div>

            <div className={classes.footerButtons} >
                <div><Link href='/category/web'>◀ back</Link></div>
            </div>
        </div>
        </>
    )
}

export default PoemLayout