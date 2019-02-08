import React from "react"
import { ThemeContextProvider } from "./Theme"

const Contexts = ({ children }) => {
    return <ThemeContextProvider>{children}</ThemeContextProvider>
}

export default Contexts
