import React from "react"
import { ThemeContextProvider } from "./Theme"
import ApolloContextProvider from "./Apollo"

const Contexts = ({ children }) => {
    return (
        <ThemeContextProvider>
            <ApolloContextProvider>{children}</ApolloContextProvider>
        </ThemeContextProvider>
    )
}

export default Contexts
