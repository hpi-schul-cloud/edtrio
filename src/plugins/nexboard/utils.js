import api from "~/utils/api"

export const createBoard = async (lessonId, title) => {
    let nexboardAttachment = await api.get(
        `/editor/attachments?key=nexboard&lesson=${lessonId}`,
    )

    if (!nexboardAttachment.length) {
        const nexboardProject = await api.post(`/nexboard/projects`, {
            // title,
        })

        nexboardAttachment = await api.post("/editor/attachments", {
            key: "nexboard",
            value: nexboardProject.id,
            lesson: lessonId,
        })
    } else {
        nexboardAttachment = nexboardAttachment[0]
    }

    const board = await api.post(`/nexboard/boards`, {
        title,
        projectId: nexboardAttachment.value,
        // description,
    })
    return board
}

export const getBoard = id => {
    return api.get(`/nexboard/boards/${id}`)
}
