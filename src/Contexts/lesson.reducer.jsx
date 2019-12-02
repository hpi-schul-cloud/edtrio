import { SET_LESSON, UPDATE_LESSON, LESSON_UPDATED , CHANGE_LESSON_TITLE , LESSON_SAVED, SWAP_SECTIONS } from "./lesson.actions"
import { ADD_SECTION , REPLACE_ADDED_SECTION_ID } from "./section.actions"
import { splice } from "~/utils/reducer"





export const lessonInitialState = {
    title: ''
}
export function lessonReducer(state = lessonInitialState, { type, payload }) {
    console.log(state)
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
        case UPDATE_LESSON:
        case LESSON_UPDATED:
            return {
                ...state,
                ...payload
            }
        case CHANGE_LESSON_TITLE:
            state.changed.add("title")
            return {
                ...state,
                title: payload
            }

        case LESSON_SAVED:
            state.changed.clear()
            return {
                ...state,
                ...payload
            }

        case SWAP_SECTIONS:
            state.changed.add('sections')
            return {
                ...state,
                sections: state.sections.map((sectionId, index, sections) => {
                    switch(index){
                        case payload[0]:
                            return sections[payload[1]]
                        case payload[1]:
                            return sections[payload[0]]
                        default:
                            return sectionId
                    }
                })
            }

        case ADD_SECTION: // TODO: should be saved to local storage but not to the backend
            return {
                ...state,
                sections: splice(state.sections, payload.position, 0, payload.tempId)
            }

        case REPLACE_ADDED_SECTION_ID:
            state.changed.add('sections') // TODO: is this needed or is it already done on server side
            return {
                ...state,
                sections: splice(
                        state.sections,
                        state.sections.indexOf(payload.tempId),
                        1,
                        payload.backendId
                    )
            }

        case "RESET":
            return lessonInitialState

        default:
            return state
    }
}