import classes from '../tg-styles.module.scss';

const SaveOutputToTxt = (props) => {

    const { poem } = props;

    // const shakeArr = shake.split('');
    // const shakewrds = shakeArr.filter((item) => item !== "0" && item !== "1" && item !== "2" && item !== "3" && item !== "4" && item !== "5" && item !== "6" && item !== "7" && item !== "8" && item !== "9").join('');
    // console.log(shakewrds)

    let formattedPoem = [];

    for (let i = 0; i < poem.length; i++) {
        let stanzaString = poem[i].stanza.map((item) => item.text).join(' ');
        let trailingSpacesRemoved = stanzaString.replaceAll('\n ', '\n');
        formattedPoem.push({id: poem[i].id, text: trailingSpacesRemoved});
    }

    const saveToTxt = () => {

        const theText = formattedPoem.map((item) => item.text).join('\n');
        // const theText = shakewrds;
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
        <button className={`${classes.button} ${classes.saveToTxtButton}`} onClick={saveToTxt}>save to .txt</button>
        </>
    )
}

export default SaveOutputToTxt