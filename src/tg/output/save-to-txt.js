import classes from '../tg-styles.module.scss';

const SaveOutputToTxt = (props) => {

    const { poem } = props;

    let formattedPoem = [];

    for (let i = 0; i < poem.length; i++) {
        let stanzaString = poem[i].stanza.map((item) => item.text).join(' ');
        let trailingSpacesRemoved = stanzaString.replaceAll('\n ', '\n');
        formattedPoem.push({id: poem[i].id, text: trailingSpacesRemoved});
    }

    const saveToTxt = () => {

        const theText = formattedPoem.map((item) => item.text).join('\n');
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