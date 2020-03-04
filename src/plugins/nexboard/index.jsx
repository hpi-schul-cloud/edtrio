import React from "react"
import { object, string } from "@edtr-io/plugin"

import Nexboard from "./Nexboard"

import NextboadIconSVG from "./assets/logo.svg"

export const nexboardState = object({
	id: string(),
})

export const  SizedNextboardIcon = () => (
	<NextboadIconSVG width="100%" />
)

export const generatePlugin = (Component) => ({
	Component,
	state: nexboardState,
})

const nexboardPlugin = generatePlugin(Nexboard)

export default nexboardPlugin
