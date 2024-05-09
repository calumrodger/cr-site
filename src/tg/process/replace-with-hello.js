import classes from '../styles.module.scss';

const ReplaceWithHello = (props) => {

    const { stanza, onUpdate } = props;

    const replaceWithHello = () => {
        let newObjArray = stanza.map((item) => {
          if (item.selected) {
            return { id: item.id, text: "hello", selected: true }
          } else {
            return item;
          }
        });
        onUpdate(newObjArray);
      }
      
    return (
    <div className={classes.pageContainer}>
    <button onClick={replaceWithHello}>replace selected with hello</button>
    </div>
    )
    }

export default ReplaceWithHello;