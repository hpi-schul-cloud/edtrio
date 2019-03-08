import React, { useState, useEffect } from "react"
import { createBoard } from "./utils"

const Nexboard = () => {
    const [state, setState] = useState({ board: {}, project: {} })
    useEffect(() => {
        const newState = createBoard()
        setState(newState)
    }, [])

    return (
        <div>
            <h1>THIS IS A NEXBOARD PLUGIN</h1>
        </div>
    )
}

export default Nexboard
