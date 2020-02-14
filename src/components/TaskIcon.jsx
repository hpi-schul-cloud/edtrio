import React from "react"
import styled from "styled-components"



const TaskBackground = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: blue;

`


const TaskIcon = () =>{
  
	return <TaskBackground>
		<img src={require("~/assets/task-icon.svg")} />
	</TaskBackground>
    
}








export default TaskIcon;