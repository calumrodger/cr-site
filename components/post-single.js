import classes from './post-single.module.css'
import Link from 'next/link'
import Image from 'next/image'

const PostSingle = (props) => {

    return (
        <div className={classes.container}>
        <h2 className={classes.title}>{props.title}</h2>
        <img className={classes.image} src={props.image} alt="alt text"/>
        <p className={classes.author}>by {props.author}</p>
        <p className={classes.tags}>Tags: {props.tags.map((tag, i, arr) => <Link key={i} href={`/tag/${tag}`}><span className={classes.tag}>{tag}</span>{i != (arr.length - 1) ? ', ' : ''}</Link>)}</p>
        <div className={classes.content} dangerouslySetInnerHTML={{__html: props.content}}/>   
        </div>
    )
}

export default PostSingle