import React from "react"
import { object, string, serializedScalar } from "@edtr-io/plugin"

import Homework from "./Homework"
export const HomeworkState = object({
	color: string(),
	name: string(),
	link: string(),
	_id: string(),
	dueDate: serializedScalar(),
})

export const homeworkPlugin = {
	Component: Homework,
	state: HomeworkState,
	icon: () => (
		<img src={require("./assets/tasks.svg")} style={{ height: 50 }} alt="Aufgabe" />
	),
	title: "Aufgaben",
	description: "Binde eine Aufgabe aus dem Kurs ein.",
}

export default homeworkPlugin
