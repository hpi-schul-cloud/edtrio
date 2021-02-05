import React, { useEffect } from "react"
import shortid from "shortid"

import config from "~/config"

const Etherpad = ({ state }) => {
	useEffect(() => {
		if (state._id.value) return
		state._id.set(shortid.generate())
	}, [])

	const url = config.ETHERPAD_URL;

	if (state._id.get()) {
		return (
			<iframe
				src={url+state._id.value}
				style={{
					width: "100%",
					height: 800,
					resize: "vertical",
					overflow: "auto",
				}}
				data-identifier="iframe-0"
			/>
		)
	}
	return (null)
}

export default Etherpad
