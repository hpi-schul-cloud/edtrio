import React from "react"
import Flex from "~/components/Flex"

import {generatePlugin} from './index'

const EtherpadPreview = () => {
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
}

const etherpadPlugin = generatePlugin(EtherpadPreview)

export default etherpadPlugin
