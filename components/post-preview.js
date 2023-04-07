import classes from './post-preview.module.css'
import Link from "next/link"
import Image from 'next/image'

const PostPreview = (props) => {

    return (
        <>
        <div className={classes.container}>
        <Link href={`/${props.slug}`}><h2 className={classes.title}>{props.title}</h2></Link>
        <img className={classes.image} src={props.image} alt="alt text"/>
        <p className={classes.tags}>Tags: {props.tags.map((tag, i, arr) => <Link key={i} href={`/tag/${tag}`}><span className={classes.tag}>{tag}</span>{i != (arr.length - 1) ? ', ' : ''}</Link>)}</p>
        {/* <div className={classes.content} dangerouslySetInnerHTML={{__html: props.content}}/>    */}
        <div className={classes.blurb} dangerouslySetInnerHTML={{__html: props.blurb}}/>
        </div>
        </>
    )
}

export default PostPreview