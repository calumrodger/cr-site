import classes from '../styles.module.scss';
import { nGram } from 'n-gram';

const NGrammer = (props) => {

    const { stanza, setStanza, setOldStanza } = props;

    const nGrammer = () => {

        const stringStanza = stanza.map((item) => {
            if (item.type === 'text') {
                return item.text;
            } else {
                return;
            }
        }).join('');

        const grammedStanza = nGram(10)(stringStanza);

        let currentIndex = grammedStanza.length;

        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [grammedStanza[currentIndex], grammedStanza[randomIndex]] = [
                grammedStanza[randomIndex], grammedStanza[currentIndex]];
        }

        const stringGram = grammedStanza.join('');
        const mappedGrammedStanza = grammedStanza.map((item, index) => {
            return { id: index, type: 'text', text: item, selected: false }
        })
        setStanza(mappedGrammedStanza);
        setOldStanza(stanza);
      }
      
    return (
    <div className={classes.pageContainer}>
    <button onClick={nGrammer}>nGramify</button>
    </div>
    )
    }

export default NGrammer;