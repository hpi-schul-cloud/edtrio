import React, { useState, useEffect, useContext } from "react"
import LessonContext from "~/Contexts/Lesson.context"

import { createBoard, getBoard } from "./utils"
import Action from "~/components/Action"
import Flex from "~/components/Flex"
import Loader from "~/components/Loader"

const Nexboard = ({ focused, state }) => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [board, setBoard] = useState({})
	const { store } = useContext(LessonContext)
	
	async function bootstrap() {
		try {
			let board
			const id = state.id.get();
			if (id && id !== '<empty string>') {
				board = await getBoard(id)
			} else {
				const { _id: lessonId, attachments, title } = store.lesson;
				board = await createBoard(lessonId.toString(),{ 
					title:`${title} Nexboard`, // TODO: should set by user
					attachments, 
					description: ''
				})
				state.id.set(board.id.toString())
			}	
			setBoard(board)
		} catch (err) {
			console.warn(err);
			setError(err);
		}

		setLoading(false)
	}

	useEffect(() => {
		bootstrap()
	}, [])

	if (error) {
		return (
			<div>
				<p>Can not render nexboard!</p>
				{JSON.stringify(error.message)}
			</div>
		)
	} else if (loading) {
		return (
			<Flex justifyCenter>
				<Loader />
			</Flex>
		)
	} else {
		const displayName = (store.user || {}).displayName || 'user';
		// TODO: Username is not pass at he moment 
		return (
			<Flex column alignEnd>
				<iframe
					src={`${board.publicLink}?username=${displayName}`}
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
					to={`${board.publicLink}?username=${displayName}`}
					target="_blank">
                    in neuem Tab öffnen
				</Action>
			</Flex>
		)
	}
}

export default Nexboard
