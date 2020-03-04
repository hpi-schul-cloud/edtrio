import React, { useState, useEffect, useContext } from "react"
import LessonContext from "~/Contexts/Lesson.context"

import { createBoard, getBoard } from "./utils"
import Action from "~/components/Action"
import Flex from "~/components/Flex"
import Loader from "~/components/Loader"
import logger from "redux-logger"

const Nexboard = ({ focused, state }) => {
	const [loading, setLoading] = useState(true)
	const [board, setBoard] = useState({})
	const { lesson: lessonStore, user: userStore } = useContext(LessonContext)
	
	async function bootstrap() {
		try {
			let board
			if (state._id.value) {
				board = await getBoard(state._id.value)
			} else {
				board = await createBoard(
					lessonStore._id,
					`${lessonStore.title} Nexboard`, // TODO: section title?
				)
			}
			state._id.set(board._id)
			setBoard(board)
		} catch (err) {
			logger.warning(err);
		}

		setLoading(false)
	}

	useEffect(() => {
		bootstrap()
	}, [])

	if (loading) {
		return (
			<Flex justifyCenter>
				<Loader />
			</Flex>
		)
	} else {
		return (
			<Flex column alignEnd>
				<iframe
					src={`${board.publicLink}?username=${userStore.displayName}`}
					style={{
						width: "100%",
						height: "600px",
						resize: "vertical",
						overflow: "auto",
						border: "none",
					}}
				/>
				<Action
					a
					to={`${board.publicLink}?username=${userStore.displayName}`}
					target="_blank">
                    in neuem Tab öffnen
				</Action>
			</Flex>
		)
	}
}

export default Nexboard
