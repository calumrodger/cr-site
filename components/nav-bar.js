import classes from './nav-bar.module.scss'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SearchForm from './search'

const NavBar = (props) => {
    const { posts } = props
    const { randomPost } = props
    const { categories } = props
    let { cat } = props

    const realCategories = categories.filter((category) => (category.slug !== 'uncategorized' || 'poetry'))
    const categoryOrder = ['game', 'film-image', 'book', 'web', 'performance', 'article']
    const sortedCategories = []

    for (let i = 0; i < categoryOrder.length; i++) {
        let category = realCategories.filter(item => item.slug === categoryOrder[i])
        sortedCategories.push(category)
    }

    const finalCategories = sortedCategories.flat()
    console.log(finalCategories)

    const getCategoryDisplayName = (cat) => {
        if (cat.slug === 'game') {
            return 'games'
        }
        if (cat.slug === 'film-image') {
            return 'film/image'
        }
        if (cat.slug === 'book') {
            return 'books'
        }
        if (cat.slug === 'web') {
            return 'webpoems'
        }
        if (cat.slug === 'performance') {
            return 'performance'
        }
        if (cat.slug === 'article') {
            return 'articles'
        }
    }

    const [burgerToggle, setBurgerToggle] = useState(false)

    const router = useRouter()

    const burgerHandler = () => {
        if (burgerToggle === true) {
            setBurgerToggle(false)
        } else {
            setBurgerToggle(true)
        }
    }

    let randomPostSlug
    if (randomPost ) {
        randomPostSlug = randomPost.slug
    } else {
        randomPostSlug = ''
    }
   
    // Return navbar
    return (
        <>

        <div className={`${classes.catsContainer}`}>
            <div className={classes.title}><Link href='/'>calum rodger</Link></div>
            <div className={classes.burgerButton}>
                        <button className={classes.navToggle} onClick={burgerHandler}>Menu</button>
            </div>
            {finalCategories.map((item) => {
                return (
                <div key={item.id} className={`${classes.catContainer} ${burgerToggle ? classes.show : classes.hidden}`}>
                <div className={`${classes.link} ${cat === item.slug ? classes.selectedCat : null}`} key={item.id}><Link className={classes.linkText} href={`/category/${item.slug}`}>{getCategoryDisplayName(item)}</Link></div>
                </div>
            )})}
                <div className={`${classes.catContainer} ${burgerToggle ? classes.show : classes.hidden}`}>
                    <div className={`${classes.link} ${router.pathname === '/category/all' ? classes.selectedCat : null}`} key='all'><Link className={classes.linkText} href={`/category/all`}>all</Link>
                </div>
                <div className={`${classes.catContainer} ${burgerToggle ? classes.show : classes.hidden}`}></div>
                <div className={classes.link}><Link className={classes.linkText} href={`/${randomPostSlug}`}>random</Link></div>
                </div>
        </div>
        </>
        
    )
}

export default NavBar