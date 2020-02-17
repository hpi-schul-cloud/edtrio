import React from "react"
import { object, string, scalar } from "@edtr-io/plugin"

import Homework from "./Homework"
export const HomeworkState = object({
	color: string(),
	name: string(),
	link: string(),
	_id: string(),
	dueDate: scalar(),
})

export const generatePlugin = (component) => ({
	Component: component,
	state: HomeworkState,
	icon: () => (
		<img src={require("./assets/tasks.svg")} style={{ height: 50 }} alt="Aufgabe" />
	),
	title: "Aufgaben",
	description: "Binde eine Aufgabe aus dem Kurs ein.",
})

export const homeworkPlugin = generatePlugin(Homework);

export default homeworkPlugin
