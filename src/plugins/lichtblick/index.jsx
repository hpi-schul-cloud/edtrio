import React from "react"
import { object, string, boolean } from "@edtr-io/plugin"
import LichtblickIcon from "./assets/logo.svg"

import Lichtblick from "./Lichtblick"
export const lichtblickState = object({
	data: object({}),
	videoTitle: string(),
	videoUuid: string(),
	videoUri: string(),
	video: object({}),
	changed: boolean(false),
})

export const  SizedLichtblickIcon = () => (
	<LichtblickIcon height="100%" />
)

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
