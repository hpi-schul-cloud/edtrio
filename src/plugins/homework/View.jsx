import React from "react"
import styled from "styled-components"

import TaskIcon from "~/components/TaskIcon"
import Flex from "~/components/Flex"

const Container = styled.div`
    display: flex;
		flex-direction: column;

& span {
	color: #4E6676;
}
& a{
	color: #4E6676;
}


`


const ViewBase = ({state}) => {
	return (
		<Flex>
			<TaskIcon color={state.color.get()}/>
			<Container>
				<b>Aufgabe</b>
				<span>{state.name.get() || "Kein Kurs vorhanden"}</span>
				<small>bis: {new Date(state.dueDate.get()).toLocaleDateString('de-DE')}</small>
			</Container>
		</Flex>
	)
}

const View = ({state, editing}) => {
	if (editing) {
		 return (<ViewBase state={state} />)
	} else {
		return (
			<a href={state.link.get()}>
				<ViewBase state={state} />
			</a>
		)
	}
}

export default View;