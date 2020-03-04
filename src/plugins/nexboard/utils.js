import { editorApi, serverApi } from "~/utils/api"
import { NEXBOARD_BOARDS_URI, NEXBOARD_PROJECTS_URI } from "~/config"
// TODO do not use sockets for creating attachments
console.log('####', NEXBOARD_BOARDS_URI, NEXBOARD_PROJECTS_URI);

const TYPE = 'nexboard-projectId';
export const createBoard = async (lessonId, { title, attachments = [], description }) => {
	console.log('attachments', attachments);
	let attach = attachments.some(a => a.type === TYPE)
	if (!attach) {
		const project = await serverApi.post(NEXBOARD_PROJECTS_URI || '/nexboard/prjects', {
			title,
		})

		attach = await editorApi.post("attachments", {
			type: TYPE,
			value: project._id.toString(),
			target: lessonId,

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
	console.log('id', id);
	return serverApi.get(`${NEXBOARD_BOARDS_URI || '/nexboard/boards'}/${id.toString()}`)
}
