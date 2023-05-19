import classes from './post-preview.module.scss'
import Link from "next/link"

const PostPreview = (props) => {

    return (
        <>
        <div className={classes.container}>
        <img className={classes.image} src={props.image} alt={props.altText}/>
        <div className={classes.textContainer}>
        <Link href={`/${props.slug}`}><h2 className={classes.title}>{props.title}</h2><span> </span></Link>
        <span className={classes.fakeSpan}> </span>
        <div className={classes.blurb} dangerouslySetInnerHTML={{__html: props.blurb}}/>
        </div>
        </div>
        </>
    )
}

export default PostPreview