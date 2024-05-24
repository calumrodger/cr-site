export const checkStyles = (word) => {
    let thisStyle = {};
    if (word?.style) {
      if (word?.style?.fontSize) {
        thisStyle = {...thisStyle, fontSize: Math.sign(word.style.fontSize) !== -1 ? '1.' + word.style.fontSize.toString() + 'rem' : `${1 - (( word.style.fontSize / 10) * -1)}rem`}
      } 
      if (word?.style?.color) {
        thisStyle = {...thisStyle, color: word.style.color}
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
      if (word?.style?.textTransform) {
        thisStyle = {...thisStyle, textTransform: word.style.textTransform}
      }
      if (word?.style?.visibility) {
        thisStyle = {...thisStyle, visibility: word.style.visibility}
      }

    } else {
      return null;
    }
    return thisStyle;
  }

  export const checkPoemStyles = (stanza) => {
    let thisStyle = {};
    if (stanza?.style) {
      if (stanza?.style?.fontSize) {
        thisStyle = {...thisStyle, fontSize: Math.sign(stanza.style.fontSize) !== -1 ? '1.' + stanza.style.fontSize.toString() + 'rem' : `${1 - (( stanza.style.fontSize / 10) * -1)}rem`}
      } 
      if (stanza?.style?.color) {
        thisStyle = {...thisStyle, color: stanza.style.color}
      }
      if (stanza?.style?.fontWeight) {
        thisStyle = {...thisStyle, fontWeight: stanza.style.fontWeight + "00"}
      }
      if (stanza?.style?.fontFamily) {
        thisStyle = {...thisStyle, fontFamily: stanza.style.fontFamily}
      }
      if (stanza?.style?.opacity) {
        thisStyle = {...thisStyle, rotate: stanza.style.opacity * 10 + 'deg'}
      }
      if (stanza?.style?.transform) {
        thisStyle = {...thisStyle, transform: stanza.style.transform}
      }
      if (stanza?.style?.fontStyle) {
        thisStyle = {...thisStyle, fontStyle: stanza.style.fontStyle}
      }
      if (stanza?.style?.textTransform) {
        thisStyle = {...thisStyle, textTransform: stanza.style.textTransform}
      }
      if (stanza?.style?.visibility) {
        thisStyle = {...thisStyle, visibility: stanza.style.visibility}
      }

    } else {
      return null;
    }
    return thisStyle;
  }