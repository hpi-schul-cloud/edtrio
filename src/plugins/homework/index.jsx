import React from "react"
import { object, string, scalar } from "@edtr-io/plugin"
import Homework from "./Homework"
import  HomeworkIcon from "./assets/tasks.svg"

export { default as HomeworkIcon } from "./assets/tasks.svg"

export const SizedHomeworkIcon = () => {
	return (<HomeworkIcon height="100%" />)
}

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
})

export const homeworkPlugin = generatePlugin(Homework);

export default homeworkPlugin
