import classes from './post-single.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const PostSingle = (props) => {

    return (
        <div className={classes.container}>
        <h2 className={classes.title}>{props.title}</h2>
        <img className={classes.image} src={props.image} alt="alt text"/>
        <div className={classes.content} dangerouslySetInnerHTML={{__html: props.content}}/>   
        </div>
    )
}

export default PostSingle