import { createGlobalStyle } from "styled-components"
import React from "react"
import theme from "~/theme"


// import of katex was removed because of problem in styled-componenten to load import
const GS = createGlobalStyle`
	* {
		box-sizing: border-box;
	}

	html, body {
		margin: 0;
		font-family: 'PT Sans', sans-serif;
		font-size: 16px;
		overflow-x: hidden;
		background-color: #fff;
		min-height: 100vh;
		padding: 0;
	}

	body {
		padding-top: 75px;
	}

	blockquote {
		margin: 0 0 0 24px;
		padding-left: 16px;
		border-left: 4px solid rgba(217, 217, 217, 1.00);
		color: #505050;
		font-style: italic;
		font-weight: 300;
	}
`

const GlobalStyle = () => {
	// TODO make distinction for schul-cloud?
	// TODO include theme?
	return <GS />
}

export default GlobalStyle
