import React, { useReducer } from "react"

export const initialState = {
    editing: false,
}

function reducer(state, { type, payload }) {
    switch (type) {
        case "SET_EDITING":
            return {
                ...state,
                editing: payload,
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
