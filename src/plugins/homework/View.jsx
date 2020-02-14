import React from "react"

import TaskIcon from "~/components/TaskIcon"
import Flex from "~/components/Flex"


const ViewBase = ({state}) => {
	return (
		<Flex>
			<TaskIcon color={state.color.get()}/>
			<div>
				<b>Aufgabe</b>
				<div>
					<span>{state.name.get() || "Kein Kurs vorhanden"}</span>
					<a href={state.link.get()}>
						<img src={require("./assets/open-new-window.svg")} />
					</a>
					<small>bis: {new Date(state.dueDate.get()).toLocaleDateString()}</small>
				</div>
			</div>
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