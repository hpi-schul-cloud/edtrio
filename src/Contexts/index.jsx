import React from "react"
import { ThemeContextProvider } from "./Theme"
import LessonContextProvider from "./Lesson"

const Contexts = ({ children }) => {
    return (
        <ThemeContextProvider>
            <LessonContextProvider>{children}</LessonContextProvider>
        </ThemeContextProvider>
    )
}

export default Contexts
