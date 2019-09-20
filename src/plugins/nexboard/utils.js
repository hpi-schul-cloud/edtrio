import { courseApi } from "~/utils/api"

export const createBoard = async (lessonId, title) => {
    let nexboardAttachment = await courseApi.get(
        `/editor/attachments?key=nexboard&lesson=${lessonId}`,
    )

    if (!nexboardAttachment.length) {
        const nexboardProject = await courseApi.post(`/nexboard/projects`, {
            // title,
        })

        nexboardAttachment = await courseApi.post("/editor/attachments", {
            key: "nexboard",
            value: nexboardProject.id,
            lesson: lessonId,
        })
    } else {
        nexboardAttachment = nexboardAttachment[0]
    }

    const board = await courseApi.post(`/nexboard/boards`, {
        title,
        projectId: nexboardAttachment.value,
        // description,
    })
    return board
}

export const getBoard = id => {
    return courseApi.get(`/nexboard/boards/${id}`)
}
