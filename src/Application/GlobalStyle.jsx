import { createGlobalStyle } from "styled-components"
import React from "react"

const GS = createGlobalStyle`
	* {
		box-sizing: border-box;
	}

	html, body {
		margin: 0;
		font-family: 'PT Sans', sans-serif;
		font-size: 20px;
		overflow-x: hidden;
	}
`

const GlobalStyle = () => {
    // TODO make distinction for schul-cloud?
    // TODO include theme?
    return <GS />
}

export default GlobalStyle
