import React, { useReducer } from "react"

export const initialState = {
    age: 0,
    avatarBackgroundColor: "",
    avatarInitials: "",
    birthday: "",
    createdAt: "",
    displayName: "",
    email: "",
    firstName: "",
    lastName: "",
    permissions: [],
    preferences: {},
    roles: [],
    schoolId: "",
    updatedAt: "",
}
function reducer(state, { type, payload }) {
    switch (type) {
        case "BOOTSTRAP_USER":
            return {
                ...state,
                ...payload,
            }

        default:
            return state
    }
}

const UserContext = React.createContext()

export function UserContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const value = { store: state, dispatch }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContext
