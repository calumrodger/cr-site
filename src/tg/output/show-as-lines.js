import classes from './output.module.scss';

const ShowAsLines = (props) => {
    const { poem } = props;

    let formattedPoem = [];

    for (let i = 0; i < poem.length; i++) {
        let trailingSpacesRemoved = poem[i].text.replaceAll('\n ', '\n');
        formattedPoem.push({id: poem[i].id, text: trailingSpacesRemoved});
    }

    return (
        <>
        <div className={classes.poemContainer}>
            {formattedPoem.map((item) => {
                return (
                    <div className={classes.poem} key={item.id}>
                        <div className={classes.line}>{item.text}</div>
                        <br />
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default ShowAsLines;