import React, { useEffect } from "react"
import Lesson from "./Lesson"

const Workspace = () => {
    useEffect(() => {
        const savedColor = document.body.style.backgroundColor
        document.body.style.backgroundColor = "#fff"

        return () => {
            document.body.style.backgroundColor = savedColor
        }
    })
    return <Lesson />
}

export default Workspace
