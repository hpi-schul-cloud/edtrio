import React from "react"
import Flex from "~/components/Flex"

import {generatePlugin} from './index'

const LicktblickPreview = () => {
	return (
		<Flex
			justifyCenter
			alignCenter
			style={{
				minHeight: 500,
				backgroundColor: "rgba(240, 240, 240)",
			}}>
			<h1>Lichtblick</h1>
		</Flex>
	)
}


export default generatePlugin(LicktblickPreview)
