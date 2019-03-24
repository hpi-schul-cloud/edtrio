import React, { useState } from "react"

const GroupsContext = React.createContext()

export function GroupsContextProvider({ children }) {
    const [state, setState] = useState({})

    const value = { state, setState }

    return (
        <GroupsContext.Provider value={value}>
            {children}
        </GroupsContext.Provider>
    )
}

export default GroupsContext
