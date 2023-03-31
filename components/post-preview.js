import classes from './post-preview.module.css'
import Link from "next/link"

const PostPreview = (props) => {

    return (
        <>
        <div className={classes.container}>
        <Link href={`/posts/${props.slug}`}><h2 className={classes.title}>{props.title}</h2></Link>
        <img className={classes.image} src={props.image}/>
        <p className={classes.tags}>Tags: {props.tags.map((tag, i, arr) => <Link key={i} href={`/tag/${tag}`}><span className={classes.tag}>{tag}</span>{i != (arr.length - 1) ? ', ' : ''}</Link>)}</p>
        {/* <div className={classes.content} dangerouslySetInnerHTML={{__html: props.content}}/>    */}
        <div className={classes.blurb}>{props.blurb}</div>
        </div>
        </>
    )
}

export default PostPreview