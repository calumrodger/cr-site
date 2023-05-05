import { useState, useEffect, useRef } from "react";
const MainContentContainer = (props) => {

    const contentRef = useRef()
    // console.log(contentRef)

    // useEffect(() => {
    //     console.log(contentRef.current.scrollTop)
    // }, [contentRef.current.scrollHeight])

    return (
        <div ref={contentRef}>
        {props.children}
        </div>
    )
}

export default MainContentContainer