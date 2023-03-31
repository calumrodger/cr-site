import classes from './page.module.css'
import SearchForm from './search'

const Page = (props) => {

    return (
        <>
        <div className={classes.container}>
        <h2 className={classes.title}>{props.title}</h2>
        <div className={classes.content} dangerouslySetInnerHTML={{__html: props.content}}/> 
        </div>   
        {props.slug === 'search' ?             
        <SearchForm posts={props.posts} />
        : null}
        </>
    )
}

export default Page