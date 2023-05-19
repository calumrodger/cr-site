import classes from './post-single.module.scss'
import parse from 'html-react-parser';

const PostSingle = (props) => {
    const { slug } = props
    const parsedContent = parse(props.content)
    console.log(parsedContent)
    let contentOutput = ''

    if (typeof parsedContent !== "string") {
    const filteredContent = parsedContent.filter(item => item !== '\n')
    console.log(filteredContent)


    contentOutput = filteredContent.map((item) => {
        return (
            <div key={item.key} className={`${classes.content} ${classes[slug]}`}>         
            {item.props.children}
            </div>
        )
        }
        )
    } else {
        contentOutput = parsedContent
    }

    return (
        <div className={classes.container}>
        <h2 className={classes.title}>{props.title}</h2>
        <div  className={`${classes.allContent} ${classes[slug]}`}>
        {contentOutput} 
        </div>
        </div>
    )
}

export default PostSingle