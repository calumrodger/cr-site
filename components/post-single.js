import classes from './post-single.module.scss'
import parse from 'html-react-parser';

const PostSingle = (props) => {

    const parsedContent = parse(props.content)
    console.log(parsedContent)
    const filteredContent = parsedContent.filter(item => item !== '\n')
    console.log(filteredContent)
    const { slug } = props

    const contentOutput = filteredContent.map((item) => {
        return (
            <div className={`${classes.content} ${classes[slug]}`}>         
            {item.props.children}
            </div>
        )
        }
        )

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