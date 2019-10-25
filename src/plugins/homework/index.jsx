import React from "react"
import { object, list, string, number  } from "@edtr-io/plugin"

import Homework from "./Homework"

export const homeworkState = object({
    id: string(),
    title: string('Aufgabe'),
	description: string(),
	selected: number(0),	// todo map to id ?
	link: string(),
})

const homeworkPlugin = {
	Component: Homework,
	state: homeworkState,
	icon: () => (
        <img src={require("./assets/logo.svg")} style={{ height: 50 }} alt="" />
	),
	title: "Homework",
    description: "Link homeworks",
}

export default homeworkPlugin