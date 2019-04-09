import api from "~/utils/api"

export const createBoard = async (lessonId, title) => {
    const board = await api.post(`/nexboard/board`, {
        lessonId,
        title,
        // description,
    })
    return board
}

export const getBoard = async id => {
    const board = await api.get(`/nexboard/board/${id}`)
    return board
}
