import classes from './poem.module.scss';

const Poem = (props) => {

  // console.log(props.text)
  // console.log(props.text[0].snippet.topLevelComment)

  const justTheText = props.text.map((item, index) => {
    return item.snippet.topLevelComment.snippet.textOriginal
  })
  const justTheTextString = justTheText.join(" ")
  console.log(justTheTextString)

  function markovChainGenerator(text) {
    const textArr = text.split(' ')
    const markovChain = {};
  for (let i = 0; i < textArr.length; i++) {
      let word = textArr[i].toLowerCase().replace(/[\W_]/, "")
      if (!markovChain[word]) {
        markovChain[word] = []
        }
      if (textArr[i + 1]) {
        markovChain[word].push(textArr[i + 1].toLowerCase().replace(/[\W_]/, ""));
  }
  }
  return markovChain
  }

  const markovChain = markovChainGenerator(justTheTextString)

  const words = Object.keys(markovChain)
  let word = words[Math.floor(Math.random() * words.length)]
  let result = ''
  for (let i = 0; i < words.length; i++ ) {
    result += word + ' ';
    let newWord =  markovChain[word][Math.floor(Math.random() * markovChain[word].length)]
    word = newWord;
    if (!word || !markovChain.hasOwnProperty(word)) word = words[Math.floor(Math.random() * words.length)]
  }
  // console.log(result)

  // const markov = markovChainGenerator(justTheTextString)
  // console.log(markov)

  const poemBits = result.split(' ');
  const line1 = `${poemBits[0]} ${poemBits[1]} ${poemBits[2]} ${poemBits[3]}`
  const line2 = `${poemBits[4]} ${poemBits[5]} ${poemBits[6]} ${poemBits[7]}`
  const line3 = `${poemBits[8]} ${poemBits[9]} ${poemBits[10]} ${poemBits[11]}`
  const line4 = `${poemBits[12]} ${poemBits[13]} ${poemBits[14]} ${poemBits[15]}`

  return (
    <div className={classes.pageContainer}>
    <div className={classes.pageContent}>
      {/* { props.text.map((item, index) => {

        if ( item.replies ) {
          return (
            <div key={index}>
              <div>{item.snippet.topLevelComment.snippet.textOriginal}</div>
              {item.replies.comments.map((reply, index) => {
                return (
                  <div key={index}>
                    <div style={{fontSize: ".8rem"}}>{reply.snippet.textOriginal}</div>
                  </div>
                )
              })}
              <br/>
            </div>
          )
        } else {
        return (
          <div key={index}>
            <div>{item.snippet.topLevelComment.snippet.textOriginal}</div>
            <div>{item.snippet.topLevelComment.snippet.publishedAt}</div>
            <br/>
          </div>
        )}
      })} */}
          <div>{line1}</div>
          <div>{line2}</div>
          <div>{line3}</div>
          <div>{line4}</div>
    </div>

    </div>
  );
};

export default Poem;
