import classes from './output.module.scss';
import { checkStyles } from '@tg/utils/utils';

const ShowAsLines = (props) => {
    const { poem, poemTitle } = props;

    // let formattedPoem = [];

    // for (let i = 0; i < poem.length; i++) {

    //     let trailingSpacesRemoved = poem[i].text.replaceAll('\n ', '\n');
    //     formattedPoem.push({id: poem[i].id, text: trailingSpacesRemoved});
    // }


    return (
        <>
        <div className={classes.poemContainer}>
            <div className={classes.poemTitle}>{poemTitle}</div>
            <div className={classes.mainText}>
            {poem.map((t, i) => {
              return (
                <div key={i} id={i} className={`${classes.stanza} ${t.selected ? classes.selected : null}`}>
                {t.stanza.map((j, i) => {
                  if (j.text === '\n') {
                    return <br id={i} key={i} className={classes.lineBreak}/>
                  } else {
                    return <span id={i} key={i} style={checkStyles(j)} className={`${classes.word} ${t.selected ? classes.selected : null}`}>{j.text} </span>
                  }
                })}
                <br/>
                </div>
          )}
          )}
            </div>
        </div>
        </>
    )
}

export default ShowAsLines;