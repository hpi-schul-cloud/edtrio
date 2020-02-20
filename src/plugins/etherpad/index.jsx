import React from "react"
import { object, string } from "@edtr-io/plugin"

import Logo from "./assets/logo.svg"

import Etherpad from "./Etherpad"
export const etherpadState = object({
	id: string(),
	title: string(),
	description: string(),
})

const etherpadPlugin = {
	Component: Etherpad,
	state: etherpadState,
	icon: () => (
		<Logo height="50px" />
	),
	title: "Etherpad",
	description: "Real time collaboration.",
}

export default etherpadPlugin
