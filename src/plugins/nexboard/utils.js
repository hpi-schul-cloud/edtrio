import api from "~/utils/api"

export const createBoard = async (lessonId, title) => {
    return api.post(`/nexboard/board`, {
        lessonId,
        title,
        // description,
    })
}

export const getBoard = async id => {
    return api.get(`/nexboard/board/${id}`)
}
