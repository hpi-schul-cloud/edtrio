import React from "react"
import { object, string } from "@edtr-io/plugin"

import EtherpadIcon from "./assets/logo.svg"

import Etherpad from "./Etherpad"
export const etherpadState = object({
	_id: string(),
	title: string(),
	description: string(),
})

export const  SizedEtherpadIcon = () => (
	<EtherpadIcon height="100%" />
)

export const generatePlugin = (Component) => ({
	Component,
	state: etherpadState,
})

const etherpadPlugin = generatePlugin(Etherpad)

export default etherpadPlugin
