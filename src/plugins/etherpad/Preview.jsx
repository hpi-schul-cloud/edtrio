import React from "react"
import Flex from "~/components/Flex"

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
		{/* <img src={require("./assets/logo.svg")} style={{ height: 50 }} alt="" /> */}
	),
	title: "Etherpad",
	description: "Real time collaboration.",
}

export default etherpadPlugin
