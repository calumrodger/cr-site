import classes from './post-single.module.scss'

const PostSingle = (props) => {

    return (
        <div className={classes.container}>
        <h2 className={classes.title}>{props.title}</h2>
        <div className={classes.content} dangerouslySetInnerHTML={{__html: props.content}}/>   
        </div>
    )
}

export default PostSingle