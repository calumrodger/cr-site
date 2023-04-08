import classes from './nav-bar.module.scss'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SearchForm from './search'

const NavBar = (props) => {
    const { posts } = props
    const { randomPost } = props
    const { categories } = props

    const realCategories = categories.filter((category) => (category.slug !== 'uncategorized'))
    const categoryOrder = ['poetry', 'game', 'film-image', 'book', 'app', 'performance', 'other-writing']
    const sortedCategories = []

    for (let i = 0; i < categoryOrder.length; i++) {
        let category = realCategories.filter(item => item.slug === categoryOrder[i])
        sortedCategories.push(category)
    }

    const finalCategories = sortedCategories.flat()

    const getCategoryDisplayName = (cat) => {
        if (cat.slug === 'poetry') {
            return 'Poetry'
        }
        if (cat.slug === 'game') {
            return 'Games'
        }
        if (cat.slug === 'film-image') {
            return 'Film/Image'
        }
        if (cat.slug === 'book') {
            return 'Books'
        }
        if (cat.slug === 'app') {
            return 'Apps'
        }
        if (cat.slug === 'performance') {
            return 'Performance'
        }
        if (cat.slug === 'other-writing') {
            return 'Other Writing'
        }
    }

    const [burgerToggle, setBurgerToggle] = useState(false)

    const router = useRouter()
    let tagRef = useRef()

    let allUniqueTags = []

    if (posts) {
    // Filter by tag logic
        const allTags = posts.map((tags) => (tags.tags)).flat()
        allUniqueTags = allTags.filter((item, pos, self) => (self.indexOf(item) === pos))
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

        <div className={`${classes.linksContainer} ${burgerToggle ? classes.show : classes.hidden}`}>        
        </div>

        <div className={`${classes.catsContainer} ${burgerToggle ? classes.show : classes.hidden}`}>
            {finalCategories.map((item) => {
                return (
                <div className={classes.link} key={item.id}><Link href={`/category/${item.slug}`}>{getCategoryDisplayName(item)}</Link></div>
            )})}
                <div className={classes.link} key='all'><Link href={`/category/all`}>All</Link></div>
            <div className={classes.dropdownConatiner}>
                <span className={classes.dropdownLabel}>Tag: </span>
                <select className={classes.dropdown} defaultValue='select' name="tags" id="tags" onChange={selectHandler} ref={tagRef}>
                <option value='select' key='0' disabled hidden>Select</option>
                {allUniqueTags.map((tag, i) => {
                    return (
                    <option value={tag} key={i + 1}>{tag}</option>
                )})}
                </select>
            </div>
        </div>
        </>
        
    )
}

export default NavBar