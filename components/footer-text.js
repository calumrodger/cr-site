import classes from './footer.module.scss'
import { useRouter } from 'next/router'
import { useState } from 'react'

const FooterText = (props) => {
    const { posts } = props

    const { asPath } = useRouter()
    const slug = asPath.replace('/', '')

    let currentText = `at the interface of poetry and tech since '05!`

    // for (let i = 0; i < posts.length; i++) {
    //     if ( posts[i].slug === slug ) {
    //         currentText = posts[i].title
    //         break
    //     }
    // }

    return (
        <>
        <div className={classes.footerText}>
            <span>{currentText}</span>
        </div>
        </>
    )
}

export default FooterText