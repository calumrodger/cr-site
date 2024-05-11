import classes from './output.module.scss';

const SaveOutputToTxt = (props) => {

    const { poem } = props;

    let formattedPoem = [];

    for (let i = 0; i < poem.length; i++) {
        let trailingSpacesRemoved = poem[i].text.replaceAll('\n ', '\n');
        formattedPoem.push({id: poem[i].id, text: trailingSpacesRemoved});
    }

    const saveToTxt = () => {

        const blob = new Blob([formattedPoem[0].text], { type: "text/plain;charset=utf-8" })
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
        <button className={classes.button} onClick={saveToTxt}>save output to .txt</button>
        </>
    )
}

export default SaveOutputToTxt