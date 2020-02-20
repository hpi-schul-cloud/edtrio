import React from "react"
import { object, string } from "@edtr-io/plugin"

import Nexboard from "./Nexboard"

import LogoIcon from "./assets/logo.png"

export const nexboardState = object({
	id: string(),
})

const nexboardPlugin = {
	Component: Nexboard,
	state: nexboardState,
	icon: () => (
		<LogoIcon width="100%" />
	),
	title: "Nexboard",
	description:
        "Benutze das digitale Nexboard, um all deine Ideen festzuhalten!",
}

export default nexboardPlugin
