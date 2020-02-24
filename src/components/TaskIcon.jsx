import React from "react"
import styled from "styled-components"

import Icon from "~/assets/task-icon.svg"


const TaskBackground = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: linear-gradient(45deg, #75270D 0%, #B6916A 100%);
	margin-right	10px;
	flex-shrink: 0;
`


const TaskIcon = ({ color = "#FFF"}) =>{

	return (
		<TaskBackground >
			<Icon color={color}/>
		</TaskBackground>
	)
}

export default TaskIcon;
