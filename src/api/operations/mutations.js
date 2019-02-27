import gql from "graphql-tag"
import request from "~/api/request"

export const UPDATE_LESSON = gql`
    mutation SaveLesson($id: String!) {
        lesson(id: $lesson) {
            id
            title
        }
    }
`

const updateLessonFakeResponse = lessonId => {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(lessonId)
        }, 1000)
    })
}

export const updateLesson = ({ lessonId, steps, title }, fake) => {
    if (process.env.NODE_ENV !== "production" && fake === true) {
        return updateLessonFakeResponse(lessonId)
    }

    return request(UPDATE_LESSON, { id: lessonId })
}
const deleteSectionFakeResponse = sectionId => {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve({ success: true })
        }, 125)
    })
}

export const deleteSection = ({ sectionId }, fake) => {
    if (process.env.NODE_ENV !== "production" && fake === true) {
        return deleteSectionFakeResponse(sectionId)
    }

    return request(UPDATE_LESSON, { id: sectionId })
}
