import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import PostPreview from './post-preview'
import classes from './search.module.css'

const SearchForm = (props) => {
    const { posts } = props

    const [query, setQuery] = useState('')

    return (
        <>
        <div className={classes.searchBoxContainer}>
            <span>Search:</span>
            <input type='text' className={classes.searchBox} onChange={e => setQuery(e.target.value)}/>
            </div>
            <div className={classes.postsContainer}>
        { query ?
            <>
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
          </>
            : null }
            </div>
        </>
    )
}

export default SearchForm