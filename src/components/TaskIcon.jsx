import React from "react"
import styled from "styled-components"



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


const TaskIcon = () =>{
  
	return (
		<TaskBackground >
			<img src={require("~/assets/task-icon.svg")} />
		</TaskBackground>
	)
}








export default TaskIcon;