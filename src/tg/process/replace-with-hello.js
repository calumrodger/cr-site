import classes from '../styles.module.scss';

const ReplaceWithHello = (props) => {

    const { poem, onUpdate } = props;

    const replaceWithHello = () => {
        let newObjArray = poem.map((item) => {
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