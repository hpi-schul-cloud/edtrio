import React, { useReducer } from "react"

export const initialState = {
    loading: true,
    error: "",
    lesson: {},
    editing: false,
}

function reducer(state, { type, payload }) {
    switch (type) {
        case "SET_EDITING":
            return {
                ...state,
                editing: payload,
            }

        case "BOOTSTRAP": {
            return {
                ...state,
                loading: false,
                error: "",
                lesson: payload,
            }
        }
        case "ERROR": {
            return {
                ...state,
                error:
                    payload === undefined
                        ? "Ein Fehler ist aufgetreten..."
                        : payload,
            }
        }
        case "LOADING": {
            return {
                ...state,
                loading: !!payload,
            }
        }
        case "RESET":
            return initalState
        default:
            return state
    }
}

export const LessonContext = React.createContext()

export default function LessonContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const value = { store: state, dispatch }

    return (
        <LessonContext.Provider value={value}>
            {children}
        </LessonContext.Provider>
    )
}
