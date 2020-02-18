import React from "react"
import styled from "styled-components"
import config from "~/config"

import TaskIcon from "~/components/TaskIcon"
import Flex from "~/components/Flex"

const FlexContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
min-height: 7rem;
flex-wrap: inital;
max-width: 60%;

	@media (max-width: ${config.breakpoints.tablet + 'px'}) {
		align-items: start;
		max-width: 100%;
	}
}
`
const Container = styled.div`
display: flex;
flex-direction: column;

	& span {
		color: #4E6676;
	}
	& b {
		font-family: "PT Sans Narrow", sans-serif;
		font-size: 1.05rem;
	}
	& date {
		font-size: 0.875rem;
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
				<date>bis: {new Date(state.dueDate.get()).toLocaleDateString('de-DE')}</date>
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