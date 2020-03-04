import { editorApi, serverApi } from "~/utils/api"
import { NEXBOARD_BOARDS_URI, NEXBOARD_PROJECTS_URI } from "~/config"
// TODO: do not use sockets for creating attachments
// TODO: config is not set
console.log('####', NEXBOARD_BOARDS_URI, NEXBOARD_PROJECTS_URI);

const TYPE = 'nexboard-projectId';
export const createBoard = async (lessonId, { title, attachments = [], description }) => {
	let attach = attachments.find(a => a.type === TYPE)
	if (!attach) {
		const project = await serverApi.post(NEXBOARD_PROJECTS_URI || '/nexboard/projects', {
			title,
		})
		attach = await editorApi.post("attachments", {
			type: TYPE,
			value: project.id.toString(),
			target: lessonId,
			targetModel: 'lesson'
		})
	}

	const board = await serverApi.post(NEXBOARD_BOARDS_URI || '/nexboard/boards', {
		title,
		projectId: attach.value.toString(),
		description,
	})
	return board
}

export const getBoard = id => {
	return serverApi.get(`${NEXBOARD_BOARDS_URI || '/nexboard/boards'}/${id.toString()}`)
}
