import classes from '../styles.module.scss';
import { nGram } from 'n-gram';

const NGrammer = (props) => {

    const { poem, setPoem, setOldPoem } = props;

    console.log(poem)

    const nGrammer = () => {

        const stringPoem = poem.map((item) => {
            if (item.type === 'text') {
                return item.text;
            } else {
                return;
            }
        }).join('');
        console.log(stringPoem);
        const grammedPoem = nGram(10)(stringPoem);
        console.log(grammedPoem);

        let currentIndex = grammedPoem.length;

        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [grammedPoem[currentIndex], grammedPoem[randomIndex]] = [
                grammedPoem[randomIndex], grammedPoem[currentIndex]];
        }

        const stringGram = grammedPoem.join('');
        console.log(stringGram)
        console.log(grammedPoem);
        const mappedGrammedPoem = grammedPoem.map((item, index) => {
            return { id: index, type: 'text', text: item, selected: false }
        })
        setPoem(mappedGrammedPoem);
        setOldPoem(poem);
      }
      
    return (
    <div className={classes.pageContainer}>
    <button onClick={nGrammer}>nGramify</button>
    </div>
    )
    }

export default NGrammer;