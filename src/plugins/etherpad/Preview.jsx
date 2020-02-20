import React from "react"
import Flex from "~/components/Flex"

import LogoIcon from "./assets/logo.svg"

const etherpadPlugin = {
	Component: () => {
		return (
			<Flex
				justifyCenter
				alignCenter
				style={{
					minHeight: 800,
					backgroundColor: "rgba(240, 240, 240)",
				}}>
				<h1>Etherpad</h1>
			</Flex>
		)
	},
	icon: () => (
		<LogoIcon height="50px" />
	),
	title: "Etherpad",
	description: "Real time collaboration.",
}

export default etherpadPlugin
