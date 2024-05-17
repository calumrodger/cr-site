export const checkStyles = (word) => {
    let thisStyle = {};
    if (word?.style) {
      if (word?.style?.fontSize) {
        thisStyle = {...thisStyle, fontSize: Math.sign(word.style.fontSize) !== -1 ? '1.' + word.style.fontSize.toString() + 'rem' : `${1 - (( word.style.fontSize / 10) * -1)}rem`}
      } 
      if (word?.style?.colour) {
        thisStyle = {...thisStyle, color: word.style.colour}
      }
    } else {
      return null;
    }
    return thisStyle;
  }