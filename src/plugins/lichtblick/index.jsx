import React from "react"
import { object, string, boolean } from "@edtr-io/plugin"

import Lichtblick from "./Lichtblick"
export const lichtblickState = object({
	data: object({}),
	changed: boolean(false),
})

export const generatePlugin = (Component) => ({
	Component,
	state: lichtblickState,
	icon: () => (
		<img src={require("./assets/logo.svg")} style={{ height: 50 }} alt="" />
	),
	title: "Lichtblick (Demo)",
	description: "Medienanalyse 2.0.",
})

const lichtblickPlugin = generatePlugin(Lichtblick)

export default lichtblickPlugin
