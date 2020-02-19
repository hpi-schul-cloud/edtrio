import React, { useState } from "react"
import styled from "styled-components"
import config from "~/config"

import Icon from "~/assets/task-icon.svg"
import WindowWidth from "./WindowWidth"


const TaskBackground = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 40px;
height: 40px;
border-radius: 50%;
background-color: ${props => props.BackgroundColor};
margin-right:	0.694rem;
flex-shrink: 0;
`

const IconWhite =styled(Icon)`
color: white;
`
const IconColor =styled(Icon)`
color:  ${props => props.BackgroundColor};
margin-right: 0.694rem;
font-size: 12px;
flex-shrink: 0;

`
// const viewportWidth = () =>{
// 	return window.innerWidth;
// }
// const onWidthChange = (setWidth) => () => {
// 	setWidth(viewportWidth());
// }


const TaskIcon = ({ color = "#FFF", windowWidth}) => {

	// const [width, setWidth]  = useState(viewportWidth());
	// window.addEventListener("resize", onWidthChange(setWidth))
	console.log(windowWidth)

	if (windowWidth > config.breakpoints.tablet ){
		return (
			<TaskBackground BackgroundColor={color} >
				<IconWhite />
			</TaskBackground>
		)
	}
	else {
		return (
			<IconColor BackgroundColor={color}/>
		)
	}

}


const ResponsivTaskIcon =  ({ color = "#FFF"}) =>{
	return (
		<WindowWidth>
			<TaskIcon color={color} />
		</WindowWidth>
	)
} 





export default ResponsivTaskIcon;