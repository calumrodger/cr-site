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

    console.log(cat)

    const realCategories = categories.filter((category) => (category.slug !== 'uncategorized' || 'poetry'))
    const categoryOrder = ['game', 'film-image', 'book', 'app', 'performance', 'article']
    const sortedCategories = []

    for (let i = 0; i < categoryOrder.length; i++) {
        let category = realCategories.filter(item => item.slug === categoryOrder[i])
        sortedCategories.push(category)
    }

    const finalCategories = sortedCategories.flat()

    const getCategoryDisplayName = (cat) => {
        if (cat.slug === 'game') {
            return 'GAMES'
        }
        if (cat.slug === 'film-image') {
            return 'FILM/IMAGE'
        }
        if (cat.slug === 'book') {
            return 'BOOKS'
        }
        if (cat.slug === 'app') {
            return 'WEB'
        }
        if (cat.slug === 'performance') {
            return 'PERFORMANCE'
        }
        if (cat.slug === 'article') {
            return 'ARTICLES'
        }
    }

    const [burgerToggle, setBurgerToggle] = useState(false)

    const router = useRouter()
    let tagRef = useRef()

    console.log(router.pathname)

    let allUniqueTags = []
    let allUniqueTagsSorted = []

    if (posts) {
    // Filter by tag logic
        const allTags = posts.map((tags) => (tags.tags)).flat()
        allUniqueTags = allTags.filter((item, pos, self) => (self.indexOf(item) === pos))
        allUniqueTagsSorted = allUniqueTags.sort()
    }
    // Go to relevant tag slug page
    const selectHandler = () => {
        const fullPath = `/tag/${tagRef.current.value}`
        router.push(fullPath)
    }
    // Check if on tag url, if not revert tag menu value to 'select'
    useEffect(() => {
        if (router.query.tag) {
            tagRef.current.value = router.query.tag
        } else {
            tagRef.current.value = 'select'
        }
    }, [router.query])

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
        <div className={classes.topContainer}>      
            <div className={classes.title}><Link href='/'>calum rodger</Link></div>
            <div className={classes.topButtonsContainer}>
                <div className={classes.searchButton}><SearchForm posts={posts}/></div>
                <div className={classes.randomButton}><Link href={`/${randomPostSlug}`}>Random</Link></div>
                <div className={classes.burgerButton}>
                        <button className={classes.navToggle} onClick={burgerHandler}>Menu</button>
                </div>
            </div>
        </div>

        <div className={`${classes.catsContainer} ${burgerToggle ? classes.show : classes.hidden}`}>
            {/* <div className={classes.link} key='featured'><Link className={classes.linkText} href={`/category/featured`}>FEATURED</Link></div> */}
            {/* <div className={classes.line}>|</div> */}
            {finalCategories.map((item) => {
                return (
                <div className={classes.catContainer}>
                <div className={`${classes.link} ${cat === item.slug ? classes.selectedCat : null}`} key={item.id}><Link className={classes.linkText} href={`/category/${item.slug}`}>{getCategoryDisplayName(item)}</Link></div>
                </div>
            )})}
                <div className={classes.catContainer}>
                <div className={`${classes.link} ${router.pathname === '/category/all' ? classes.selectedCat : null}`} key='all'><Link className={classes.linkText} href={`/category/all`}>ALL</Link></div>
                </div>
                <select className={`${classes.dropdown} ${router.pathname.startsWith('/tag/') ? classes.selectedCat : null}`} defaultValue="BY TAG" name="tags" id="tags" onChange={selectHandler} ref={tagRef}>
                <option value='select' key='0' disabled hidden>BY TAG</option>
                {allUniqueTagsSorted.map((tag, i) => {
                    return (
                    <option value={tag} key={i + 1}>{tag}</option>
                )})}
                </select>
        </div>
        </>
        
    )
}

export default NavBar