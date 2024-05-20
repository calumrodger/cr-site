export const checkStyles = (word) => {
    let thisStyle = {};
    if (word?.style) {
      if (word?.style?.fontSize) {
        thisStyle = {...thisStyle, fontSize: Math.sign(word.style.fontSize) !== -1 ? '1.' + word.style.fontSize.toString() + 'rem' : `${1 - (( word.style.fontSize / 10) * -1)}rem`}
      } 
      if (word?.style?.colour) {
        thisStyle = {...thisStyle, color: word.style.colour}
        console.log(thisStyle)
      }
      if (word?.style?.fontWeight) {
        thisStyle = {...thisStyle, fontWeight: word.style.fontWeight + "00"}
      }
      if (word?.style?.fontFamily) {
        thisStyle = {...thisStyle, fontFamily: word.style.fontFamily}
      }
      if (word?.style?.opacity) {
        thisStyle = {...thisStyle, rotate: word.style.opacity * 10 + 'deg'}
      }
      if (word?.style?.transform) {
        thisStyle = {...thisStyle, transform: word.style.transform}
      }
      if (word?.style?.fontStyle) {
        thisStyle = {...thisStyle, fontStyle: word.style.fontStyle}
      }

    } else {
      return null;
    }
    return thisStyle;
  }