import React from "react"
import styled from "styled-components"

import TaskIcon from "~/components/TaskIcon"
import Flex from "~/components/Flex"

const FlexContainer = styled(Flex)`
align-items: center;
min-height: 7rem;
`
const Container = styled.div`
    display: flex;
		flex-direction: column;

& span {
	color: #4E6676;
}
`
const Link = styled.a`
text-decoration: none;
color: black;
`

export const ViewBase = ({state}) => {
	return (
		<FlexContainer>
			<TaskIcon color={state.color.get()}/>
			<Container>
				<b>Aufgabe</b>
				<span>{state.name.get() || "Kein Kurs vorhanden"}</span>
				<small>bis: {new Date(state.dueDate.get()).toLocaleDateString('de-DE')}</small>
			</Container>
		</FlexContainer>
	)
}

export const View = ({state, editing}) => {
	if (editing) {
		 return (<ViewBase state={state} />)
	} else {
		return (
			<Link  href={state.link.get()}>
				<ViewBase state={state} />
			</Link>
		)
	}
}

export default View;