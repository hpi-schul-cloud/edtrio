export const initialState = {
    lesson: {},
    studentView: !!q.student_view,

    bootstrapFinished: false,
    sectionOverviewExpanded: false,
    showSectionSettings: false,
}
export function lessonReducer(state = lessonReducer, { type, payload }) {
    switch (type) {
        case "SET_EDITING":
            // switch between editing and view mode
            if (state.studentView) return state
            return {
                ...state,
                editing: payload,
            }


        case "TOGGLE_SECTION_OVERVIEW":
            return {
                ...state,
                sectionOverviewExpanded:
                    payload !== undefined
                        ? payload
                        : !state.sectionOverviewExpanded,
            }

        case "TOGGLE_SECTION_SETTINGS":
            return {
                ...state,
                showSectionSettings:
                    payload !== undefined
                        ? payload
                        : !state.showSectionSettings,
            }

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
                activeSectionId: payload.sections[0].id,
            }

            return newState
        }
        case "BOOTSTRAP_FINISH":
            return {
                ...state,
                bootstrapFinished: true,
                saveStatus: "",
            }

        case "SET_ACTIVE_SECTION":
            return {
                ...state,
                activeSectionId: payload.id,
                saveStatus: "",
            }

        case "LESSON_UPDATED":
            return {
                ...state,
                saveStatus: "Aktuallisiert",
                lesson: {
                    ...state.lesson,
                    ...payload,
                }
            }
        case "LESSON_TITLE_CHANGE":
            state.lesson.changed.add("title")
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    title: payload,
                },
            }

        case "LESSON_SAVED":
            state.lesson.changed.clear()
            return state


        case "RESET":
            return initialState

        default:
            return state
    }
}