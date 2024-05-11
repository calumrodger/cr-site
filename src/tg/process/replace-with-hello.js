import classes from './process.module.scss';

const ReplaceWithHello = (props) => {

    const { stanza, onUpdate } = props;

    const replaceWithHello = () => {
        let newObjArray = stanza.map((item) => {
          if (item.selected) {
            if (Math.random() > 0.5) {
              return { id: item.id, type: "text", text: "hello", selected: true }
            } else {
              return { id: item.id, type: "text", text: "world", selected: true }
            }  
          } else {
            return item;
          }
        });
        onUpdate(newObjArray);
      }
      
    return (
    <div className={classes.pageContainer}>
    <button className={classes.button} onClick={replaceWithHello}>replace selected with 'hello' or 'world'</button>
    </div>
    )
    }

export default ReplaceWithHello;