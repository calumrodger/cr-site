import classes from '../tg-styles.module.scss';
import { stressDictionary } from '../utils/cmu-stress-count-dictionary';

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

    const it = `a
    about
    all
    also
    and
    as
    at
    be
    because
    but
    by
    can
    come
    could
    day
    do
    even
    find
    first
    for
    from
    get
    give
    go
    have
    he
    her
    here
    him
    his
    how
    I
    if
    in
    into
    it
    its
    just
    know
    like
    look
    make
    man
    many
    me
    more
    my
    new
    no
    not
    now
    of
    on
    one
    only
    or
    other
    our
    out
    people
    say
    see
    she
    so
    some
    take
    tell
    than
    that
    the
    their
    them
    then
    there
    these
    they
    thing
    think
    this
    those
    time
    to
    two
    up
    use
    very
    want
    way
    we
    well
    what
    when
    which
    who
    will
    with
    would
    year
    you
    your`
    
    const itArray = it.split("\n");
    console.log(itArray)
    
    let newDictionary = [];
    let dictionaryKeys = Object.keys(stressDictionary);
    let dictionaryValues = Object.values(stressDictionary);

    for (let i = 0; i < dictionaryKeys.length; i++) {
        if (itArray.includes(dictionaryKeys[i])) {
            newDictionary.push({word: dictionaryKeys[i], pronunciation: 0});
        } else {
            newDictionary.push({word: dictionaryKeys[i], pronunciation: dictionaryValues[i]});
        }
    }
    console.log(newDictionary)

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