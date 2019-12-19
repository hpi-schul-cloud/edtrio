import { serverApi } from "~/utils/api"

export const createBoard = async (lessonId, title) => {
    let nexboardAttachment = await serverApi.get(
        `/editor/attachments?key=nexboard&lesson=${lessonId}`,
    )

    if (!nexboardAttachment.length) {
        const nexboardProject = await serverApi.post(`/nexboard/projects`, {
            // title,
        })

        nexboardAttachment = await serverApi.post("/editor/attachments", {
            key: "nexboard",
            value: nexboardProject._id,
            lesson: lessonId,
        })
    } else {
        nexboardAttachment = nexboardAttachment[0]
    }

    const board = await serverApi.post(`/nexboard/boards`, {
        title,
        projectId: nexboardAttachment.value,
        // description,
    })
    return board
}

export const getBoard = id => {
    return serverApi.get(`/nexboard/boards/${id}`)
}
