import { SET_LESSON } from "./lesson.actions"

export const lessonInitialState = {
}
export function lessonReducer(state = lessonInitialState, { type, payload }) {
    switch (type) {
        case SET_LESSON:
            return {
                ...payload,
                changed: new Set()
            }
/*
        case "BOOTSTRAP": {
            const newState = {
                ...state,
                loading: false,
                error: "",
                lesson: {
                    ...payload,
                    changed: new Set(),
                    sections: payload.sections.map(section => {
                        const sectionData = { ...section, changed: new Set() }
                        if (section.new) {
                            sectionData.new = undefined
                            sectionData.changed.add("")
                        }
                        return sectionData
                    }),
                },
                activeSectionId: payload.sections[0]._id,
            }

            return newState
        }

*/
        case "LESSON_UPDATED":
            return {
                ...state,
                ...payload
            }
        case "LESSON_TITLE_CHANGE":
            state.changed.add("title")
            return {
                ...state,
                title: payload.title
            }

        case "LESSON_SAVED":
            state.changed.clear()
            return state


        case "RESET":
            return lessonInitialState

        default:
            return state
    }
}