import React from "react"
import { object, string } from "@edtr-io/plugin"

import EtherpadIcon from "./assets/logo.svg"

import Etherpad from "./Etherpad"
export const etherpadState = object({
	id: string(),
	title: string(),
	description: string(),
})

export const generatePlugin = (Component) => ({
	Component,
	state: etherpadState,
	icon: () => (
		<EtherpadIcon height="50px" />
	),
	title: "Etherpad",
	description: "Real time collaboration.",
})

const etherpadPlugin = generatePlugin(Etherpad)

export default etherpadPlugin
