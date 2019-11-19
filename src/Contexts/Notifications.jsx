import React, { useReducer } from "react"
import qs from "qs"
import { mergeDiff } from "~/utils/diff"
import { createDispatch, thunkMiddleware } from "~/utils/dispatch"

const q = qs.parse(window.location.search, { ignoreQueryPrefix: true })

export const initialState = {
    loading: true,
    error: "",
    saveStatus: "",
}
function reducer(state, { type, payload }) {
    switch (type) {
        case "ERROR":
            return {
                ...state,
                error:
                    payload === undefined
                        ? "Ein Fehler ist aufgetreten..."
                        : payload,
            }

        case "LOADING":
            return {
                ...state,
                loading: !!payload,
			}

		case "SAVE_STATUS":
			return {
				...state,
				saveStatus: payload,
			}

        case "RESET":
            return initialState

        default:
            return state
    }
}

const NotificationsContext = React.createContext()

export function NotificationsContextProvider({ children}) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const value = { store: state, dispatch: createDispatch(dispatch, state, thunkMiddleware()) }

    return (
        <NotificationsContext.Provider value={value}>
            {children}
        </NotificationsContext.Provider>
    )
}

export default NotificationsContext
