import classes from './post-preview-featured.module.css'
import Image from 'next/image'
import Link from "next/link"

const PostPreviewFeatured = (props) => {

    return (
        <div className={classes.container}>
        <Link href={`/posts/${props.slug}`}><h2 className='item-title'>{props.title}</h2></Link>
        <img className={classes.image} src={props.image} alt="alt text" />
        <p className={classes.tags}>Tags: {props.tags.map((tag, i, arr) => <Link key={i} href={`/tag/${tag}`}><span className={classes.tag}>{tag}</span>{i != (arr.length - 1) ? ', ' : ''}</Link>)}</p>
        {/* <div className={classes.content} dangerouslySetInnerHTML={{__html: props.content}}/>   */}
        <p className={classes.blurb}>{props.blurb}</p> 
        </div>
    )
}

export default PostPreviewFeatured