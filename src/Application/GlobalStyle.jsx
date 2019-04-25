import { createGlobalStyle } from "styled-components"
import React from "react"

const GS = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Poppins:400,700|Open+Sans:400,400i,700|Kalam');
	* {
		box-sizing: border-box;
	}

	html, body {
		margin: 0;
		/* font-family: 'PT Sans', sans-serif; */
		font-family: 'Open Sans', sans-serif;
		font-size: 20px;
		overflow-x: hidden;
		background-color: #F8F8F8;
	}
`

const GlobalStyle = () => {
    // TODO make distinction for schul-cloud?
    // TODO include theme?
    return <GS />
}

export default GlobalStyle
