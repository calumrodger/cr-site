import classes from './footer.module.scss'
import { useRouter } from 'next/router'
import { useState } from 'react'

const FooterText = (props) => {
    const { posts } = props

    const { asPath } = useRouter()
    const slug = asPath.replace('/', '')

    let currentText = 'Calum Rodger: Poet + Dev'

    for (let i = 0; i < posts.length; i++) {
        if ( posts[i].slug === slug ) {
            currentText = posts[i].title
            break
        }
    }

    return (
        <>
        <div className={classes.footerText}>
            <span>hello</span>
        </div>
        </>
    )
}

export default FooterText