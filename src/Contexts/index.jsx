import React from "react"
import { ThemeContextProvider } from "./Theme"
import ApolloContextProvider from "./Apollo"
import LessonContextProvider from "./Lesson"

const Contexts = ({ children }) => {
    return (
        <ThemeContextProvider>
            <ApolloContextProvider>
                <LessonContextProvider>{children}</LessonContextProvider>
            </ApolloContextProvider>
        </ThemeContextProvider>
    )
}

export default Contexts
