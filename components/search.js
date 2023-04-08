import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import PostPreview from './post-preview'
import classes from './search.module.scss'

const SearchForm = (props) => {
    const { posts } = props

    const [query, setQuery] = useState('')
    const [show, setShow] = useState(false)

    const searchClickHandler = () => {
        show ? setShow(false) : setShow(true)
    }

    return (
        <>
        <div className={classes.searchBoxContainer}>
            <button className={classes.searchToggle} onClick={searchClickHandler}>Search</button>
        { show ?
            <>
            <input type='text' className={classes.searchBox} onChange={e => setQuery(e.target.value)}/>           
            
            </>
        : null }
        
        { query ?
            <>
            <div className={classes.postsContainer}>
            {posts.filter((post) => 
            (post.blurb.toLowerCase().includes(query.toLowerCase()) 
            || post.title.toLowerCase().includes(query.toLowerCase()) 
            || post.content.toLowerCase().includes(query.toLowerCase())))
            .map((item) => {
                return (
                        <PostPreview
                        title={item.title}
                        author={item.author}
                        image={item.image}
                        content={item.content}
                        key={item.key}
                        tags={item.tags}
                        slug={item.slug}
                        blurb={item.blurb}
                        />
                        )
                        })}
            </div>
            </>
        : null }
        </div>
        </>
    )
}

export default SearchForm