import { editorApi, serverApi } from "~/utils/api"
import config from "~/config"
// TODO: do not use sockets for creating attachments
// TODO: config is not set
const { NEXBOARD_BOARDS_URI, NEXBOARD_PROJECTS_URI } = config;

const TYPE = 'nexboard-projectId';
export const createBoard = async (lessonId, { title, attachments = [], description }) => {
	let attach = attachments.find(a => a.type === TYPE)
	if (!attach) {
		const project = await serverApi.post(NEXBOARD_PROJECTS_URI, {
			title,
		})
		attach = await editorApi.post("attachments", {
			type: TYPE,
			value: project.id.toString(),
			target: lessonId,
			targetModel: 'lesson'
		})
	}

	const board = await serverApi.post(NEXBOARD_BOARDS_URI, {
		title,
		projectId: attach.value.toString(),
		description,
	})
	return board
}

export const getBoard = id => {
	return serverApi.get(`${NEXBOARD_BOARDS_URI }/${id.toString()}`)
}
