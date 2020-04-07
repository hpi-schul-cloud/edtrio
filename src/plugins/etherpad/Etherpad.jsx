import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"

import LessonContext from "~/Contexts/Lesson.context"

import Input from "~/components/Input"
import Flex from "~/components/Flex"

import { createBoard } from "./utils"

const Etherpad = ({ focused, state }) => {
	useEffect(() => {
		if (state._id.value) return
		state._id.set(shortid.generate())
	}, [])

	const { store, dispatch } = useContext(LessonContext)

	let etherpadFrame
	if (state._id.get()) {
		return (
			<iframe
				src={`https://etherpad.schul-cloud.org/p/${
					// TODO maybe make this variable?
					state._id.value
				}`}
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
