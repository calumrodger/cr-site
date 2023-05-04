import classes from './cat-bar.module.scss'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

const CatBar = (props) => {
    const { categories } = props
    let { cat } = props
    const { burgerToggle } = props

    const realCategories = categories.filter((category) => (category.slug !== 'uncategorized' || 'poetry'))
    const categoryOrder = ['book', 'game', 'film-image', 'performance', 'web', 'article']
    const sortedCategories = []

    for (let i = 0; i < categoryOrder.length; i++) {
        let category = realCategories.filter(item => item.slug === categoryOrder[i])
        sortedCategories.push(category)
    }
    const finalCategories = sortedCategories.flat()

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
            return 'web'
        }
        if (cat.slug === 'performance') {
            return 'performance'
        }
        if (cat.slug === 'article') {
            return 'articles'
        }
    }

   
    // Return navbar
    return (
        <>
        <div className={`${classes.catsContainer} ${burgerToggle ? classes.show : classes.hidden}`}>
            {finalCategories.map((item) => {
                return (
                <div key={item.id} className={`${classes.link} ${cat === item.slug ? classes.selectedCat : null}`}><Link className={classes.linkText} href={`/category/${item.slug}`}>{getCategoryDisplayName(item)}</Link></div>
            )})}
        </div>
        </>
        
    )
}

export default CatBar