import React, { useState } from "react"
import styled from "styled-components"
import config from "~/config"

import Icon from "~/assets/task-icon.svg"


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
const viewportWidth = () =>{
	return window.innerWidth;
}
const onWidthChange = (setWidth) => () => {
	setWidth(viewportWidth());
}


const TaskIcon = ({ color = "#FFF"}) => {

	const [width, setWidth]  = useState(viewportWidth());
	window.addEventListener("resize", onWidthChange(setWidth))

	if (width > config.breakpoints.tablet ){
		return (
			<TaskBackground BackgroundColor={color}>
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








export default TaskIcon;