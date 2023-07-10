import classes from './post-preview.module.scss'
import Link from "next/link"

const PostPreview = (props) => {

    return (
        <>
        <div className={classes.container}>
        <img className={classes.image} src={props.image} alt={props.altText}/>
        <div className={classes.textContainer}>
        <h2 className={classes.title}><Link href={`/${props.slug}`}>{props.title}</Link></h2><span> </span>
        <div className={classes.blurb} dangerouslySetInnerHTML={{__html: props.blurb}}/>
        </div>
        </div>
        </>
    )
}

export default PostPreview