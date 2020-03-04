import { editorApi, serverApi } from "~/utils/api"
import { NEXBOARD_BOARDS_URI, NEXBOARD_PROJECTS_URI } from "~/config"
// TODO do not use sockets for creating attachments

const TYPE = 'nexboard-projectId';
export const createBoard = async (lessonId, { title, attachments = [], description }) => {
	let attach = attachments.some(a => a.type === TYPE)
	if (!attach) {
		const project = await serverApi.post(NEXBOARD_PROJECTS_URI, {
			title,
		});

		attach = await editorApi.post("attachments", {
			type: TYPE,
			value: project._id,
			target: lessonId,

		})
	}

	const board = await serverApi.post(NEXBOARD_BOARDS_URI, {
		title,
		projectId: attach.value,
		description,
	})
	return board
}

export const getBoard = id => {
	return serverApi.get(`${NEXBOARD_BOARDS_URI}/${id}`)
}
