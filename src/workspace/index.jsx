import React, { useEffect } from "react"
import Lesson from "./Lesson"

const Workspace = () => {
    useEffect(() => {
        const savedColor = document.body.style.backgroundColor
        document.body.style.backgroundColor = "#fff"
        try {
            document.getElementsByTagName("footer")[0].style.display = "none"
        } catch (err) {}

        return () => {
            document.body.style.backgroundColor = savedColor
            try {
                document.getElementsByTagName("footer")[0].style.display =
                    "block"
            } catch (err) {}
        }
    })
    return <Lesson />
}

export default Workspace
