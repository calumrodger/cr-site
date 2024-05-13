import classes from './output.module.scss';

const ShowAsLines = (props) => {
    const { poem, poemTitle } = props;

    let formattedPoem = [];

    for (let i = 0; i < poem.length; i++) {
        let trailingSpacesRemoved = poem[i].text.replaceAll('\n ', '\n');
        formattedPoem.push({id: poem[i].id, text: trailingSpacesRemoved});
    }

    return (
        <>
        <div className={classes.poemContainer}>
            <div className={classes.poemTitle}>{poemTitle}</div>
            <div className={classes.mainText}>
            {formattedPoem.map((item) => {
                return (
                    <div className={classes.poem} key={item.id}>
                        <div className={classes.line}>{item.text}</div>
                        <br />
                    </div>
                )
            })}
            </div>
        </div>
        </>
    )
}

export default ShowAsLines;