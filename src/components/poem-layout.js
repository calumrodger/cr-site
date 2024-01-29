'use client';
import classes from './poem-layout.module.scss'
import NavbarTitle from './navbar-title';
import Link from 'next/link'

const PoemLayout = (props) => {

    const poemTitle = props.title 
    const borderColour = props.borderColour ? props.borderColour : '#1a1a19'
    const textColour = props.textColour ? props.textColour : '#fcfcf5'
    const borderWidthIs = props.borderWidth ? props.borderWidth : '10rem'

    return (
        <>
        <div className={classes.grid} style={{borderWidth: borderWidthIs}} >

            <div className={classes.navbarSubtitle} style={{backgroundColor: borderColour, color: textColour}}>
            </div>
            <div className={classes.navbarTitle} style={{backgroundColor: borderColour, color: textColour}}>
           
            </div>

            <div className={classes.leftMargin} style={{backgroundColor: borderColour, color: textColour}} />
            <div className={classes.rightMargin} style={{backgroundColor: borderColour, color: textColour}} />

            <div className={classes.mainContent} >
                {props.children}
            </div>

            <div className={classes.footerText} style={{backgroundColor: borderColour, color: textColour}} >
                <div>{poemTitle}</div>
            </div>

            <div className={classes.footerButtons} style={{backgroundColor: borderColour, color: textColour}} >
                <div><Link href='/category/web'>◀ back</Link></div>
            </div>
        </div>
        </>
    )
}

export default PoemLayout