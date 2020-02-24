import React from "react"
import { object, string } from "@edtr-io/plugin"

import Nexboard from "./Nexboard"

import NextboadIcon from "./assets/logo.png"

export const nexboardState = object({
	id: string(),
})

export const generatePlugin = (Component) => ({
	Component,
	state: nexboardState,
	icon: () => (
		<NextboadIcon width="100%" />
	),
	title: "Nexboard",
	description:
        "Benutze das digitale Nexboard, um all deine Ideen festzuhalten!",
})

const nexboardPlugin = generatePlugin(Nexboard)

export default nexboardPlugin
