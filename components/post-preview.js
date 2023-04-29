import classes from './post-preview.module.scss'
import Link from "next/link"
import Image from 'next/image'

const PostPreview = (props) => {

    return (
        <>
        <div className={classes.container}>
        <Link href={`/${props.slug}`}><h2 className={classes.title}>{props.title}</h2></Link>
        <img className={classes.image} src={props.image} alt={props.altText}/>
        <div className={classes.blurb} dangerouslySetInnerHTML={{__html: props.blurb}}/>
        </div>
        </>
    )
}

export default PostPreview