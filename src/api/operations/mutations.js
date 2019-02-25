import gql from "graphql-tag"
import request from "~/api/request"

export const UPDATE_LESSON = gql`
    mutation SaveLesson($id: String!) {
        lesson(id: $lesson) {
            id
            title
            sections
        }
    }
`

const updateLessonFakeResponse = lesson => {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(lesson)
        }, 1000)
    })
}

export const updateLesson = ({ lesson }, fake) => {
    if (process.env.NODE_ENV !== "production" && fake === true) {
        return updateLessonFakeResponse(lesson)
    }

    return request(UPDATE_LESSON, { id: lesson.id })
}
