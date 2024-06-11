import classes from '../tg-styles.module.scss';
// import { dictionary } from 'cmu-pronouncing-dictionary';

const SaveOutputToTxt = (props) => {

    const { poem } = props;

    // const shakeArr = shake.split('');
    // const shakewrds = shakeArr.filter((item) => item !== "0" && item !== "1" && item !== "2" && item !== "3" && item !== "4" && item !== "5" && item !== "6" && item !== "7" && item !== "8" && item !== "9").join('');
    // console.log(shakewrds)

    // let dictionaryKeys = Object.keys(dictionary);
    // let dictionaryValues = Object.values(dictionary);
    // let newArray = dictionaryKeys.map((item, index) => {
    //     return {word: item, pronunciation: dictionaryValues[index]};
    // });

    let formattedPoem = [];

    for (let i = 0; i < poem.length; i++) {
        let stanzaString = poem[i].stanza.map((item) => item.text).join(' ');
        let trailingSpacesRemoved = stanzaString.replaceAll('\n ', '\n');
        formattedPoem.push({id: poem[i].id, text: trailingSpacesRemoved});
    }

    const saveToTxt = () => {

        const theText = formattedPoem.map((item) => item.text).join('\n');
        // const theText = newArray;
        const blob = new Blob([theText], { type: "text/plain;charset=utf-8" })
        const fileName = 'output.txt'
        let newLink = document.createElement('a')
        newLink.download = fileName

        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(blob);
        }
        else {
            newLink.href = window.URL.createObjectURL(blob);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }

        newLink.click(); 

    }

    return (
        <>
        <button className={`${classes.button} ${poem.length > 0 ? null : classes.disabled} ${classes.saveToTxtButton}`} onClick={poem.length > 0 ? saveToTxt : null}>SAVE TO TXT</button>
        </>
    )
}

export default SaveOutputToTxt