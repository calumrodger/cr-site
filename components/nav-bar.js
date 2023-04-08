import classes from './nav-bar.module.css'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SearchForm from './search'

const NavBar = (props) => {
    const { posts } = props
    const { randomPost } = props
    const { categories } = props

    const realCategories = categories.filter((category) => (category.slug !== 'uncategorized'))

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
        <div className={classes.container}>      
            <div className={classes.title}><Link href='/'>###under construction###</Link></div>
            <div className={classes.burger}>
            <button className={classes.navToggle} onClick={burgerHandler}>Menu</button>
            </div>
            </div>
            <div className={`${classes.linksContainer} ${burgerToggle ? classes.show : classes.hidden}`}>
            <div className={classes.link}><Link href='/'>Home</Link></div>
            <div className={classes.link}><Link href='/about'>About</Link></div>
            <div className={classes.link}><Link href={`/${randomPostSlug}`}>Random Post</Link></div>
            <div className={classes.link}><SearchForm posts={posts}/></div>
            </div>
            <div className={`${classes.catsContainer} ${burgerToggle ? classes.show : classes.hidden}`}>
            {realCategories.map((item) => {
                return (
            <div className={classes.link} key={item.id}><Link href={`/category/${item.slug}`}>{item.name}</Link></div>
            )})}
             <div className={classes.dropdownConatiner}>
            <p className={classes.dropdownLabel}>Find by tag:</p>
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