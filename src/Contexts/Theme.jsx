import React, { useState } from "react"

export const theme = {
    colors: {
        darkRed: "#660220",
        red: "rgba(175, 4, 55, 1)",
        hpiRed: "#b10438",
        hpiOrange: "#dd6108",
        hpiYellow: "#f6a800",
        hpiBlue: "#007a9e",
        hpiBlueLight: "#007a9e3f",
        text: "#373a3c",
        white: "#fff",
    },
}

export const ThemeContext = React.createContext()

export function ThemeContextProvider({ children }) {
    const [th, setTheme] = useState(theme)

    const value = { theme: th, setTheme }

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}
