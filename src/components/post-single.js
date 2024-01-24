import classes from './post-single.module.scss'
import parse from 'html-react-parser';

const PostSingle = (props) => {
    const { slug } = props
    const parsedContent = parse(props.content)
    let contentOutput = ''

    if (typeof parsedContent !== "string") {
    const filteredContent = parsedContent.filter(item => item !== '\n')


    contentOutput = filteredContent.map((item) => {
        return (
            <div key={item.key} className={`${classes.contentContainer} ${classes.content} ${classes[slug]}`}>    
            {item.props.children}
            </div>
        )
        }
        )
    } else {
        contentOutput = parsedContent
    }

    return (
        <>
        <div className={`${classes.container} ${classes[slug]}`}>
        <h2 className={classes.title}>{props.title}</h2>
        {contentOutput} 
        </div>
        </>
    )
}

export default PostSingle