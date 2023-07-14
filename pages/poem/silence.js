import { getPostData, postDataSorter, categoryDataSorter, getCategoryData } from "../../helpers/api-utils";
import { useState } from 'react'
import classes from './silence.module.scss'

const Silence = (props) => {

    const { titleSetter } = props

    titleSetter('silence')

    const [topleft, setTopLeft] = useState('silence')
    const [topcentre, setTopCentre] = useState('silence')
    const [topright, setTopRight] = useState('silence')
    const [secondleft, setSecondLeft] = useState('silence')
    const [secondcentre, setSecondCentre] = useState('silence')
    const [secondright, setSecondRight] = useState('silence')
    const [centreleft, setCentreLeft] = useState('silence')
    const [centrecentre, setCentreCentre] = useState('')
    const [centreright, setCentreRight] = useState('silence')
    const [fourthleft, setFourthLeft] = useState('silence')
    const [fourthcentre, setFourthCentre] = useState('silence')
    const [fourthright, setFourthRight] = useState('silence')
    const [bottomleft, setBottomLeft] = useState('silence')
    const [bottomcentre, setBottomCentre] = useState('silence')
    const [bottomright, setBottomRight] = useState('silence')

    const [currentSilence, setCurrentSilence] = useState('centrecentre')

    const all = 
    [[topleft, setTopLeft], [topcentre, setTopCentre], [topright, setTopRight],
    [secondleft, setSecondLeft], [secondcentre, setSecondCentre], [secondright, setSecondRight],
    [centreleft, setCentreLeft], [centrecentre, setCentreCentre], [centreright, setCentreRight],
    [fourthleft, setFourthLeft], [fourthcentre, setFourthCentre], [fourthright, setFourthRight],
    [bottomleft, setBottomLeft], [bottomcentre, setBottomCentre], [bottomright, setBottomRight]]

    const change = (e) => {
        if (e.target.textContent === '') {
        let silences = all.filter(item => item.includes('silence'))
        let trueSilence = all.filter(item => item.includes(''))
        trueSilence[0][1]('silence')
        let randomSilence = silences[Math.floor(Math.random() * silences.length)]
        randomSilence[1]('')
        }
    }

    return (
        <>
        <div className={classes.pageContent}>
       <div className={classes.gridContainer}>
        <div id="topleft" onClick={change}>{topleft}</div>
        <div id="topcentre" onClick={change}>{topcentre}</div>
        <div id="topright" onClick={change}>{topright}</div>
        <div id="secondleft" onClick={change}>{secondleft}</div>
        <div id="secondcentre" onClick={change}>{secondcentre}</div>
        <div id="secondright" onClick={change}>{secondright}</div>
        <div id="centreleft" onClick={change}>{centreleft}</div>
        <div id="centrecentre" onClick={change}>{centrecentre}</div>
        <div id="centreright" onClick={change}>{centreright}</div>
        <div id="fourthleft" onClick={change}>{fourthleft}</div>
        <div id="fourthcentre" onClick={change}>{fourthcentre}</div>
        <div id="fourthright" onClick={change}>{fourthright}</div>
        <div id="bottomleft" onClick={change}>{bottomleft}</div>
        <div id="bottomcentre" onClick={change}>{bottomcentre}</div>
        <div id="bottomright" onClick={change}>{bottomright}</div>
    </div>
    <div className={classes.textContainer}>
    <span className={classes.text1}>
    <em>silence</em><br/>
    Eugen Gomringer 1954</span>
    <div className={classes.text2} text-align="justify"><span>
    The constellation is ordered by the poet. He determines the play-area, the field or force and suggests its possibilities. The reader, the new reader, grasps the idea of play, and joins in.</span></div>
    <div className={classes.text205}><span>From Line to Constellation 1950</span></div>
    <span className={classes.text3}>play-area remaster Calum Rodger 2022</span>
    </div>
    </div>
        </>
    )
}

export default Silence

export async function getStaticProps() {
    const data = await getPostData()
    const posts = postDataSorter(data)
    const categoryData = await getCategoryData()
    const categories = categoryDataSorter(categoryData)
  
    return {
      props: { posts, categories },
      revalidate: 600
    }
  }