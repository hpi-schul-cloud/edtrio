import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"

import LessonContext from "~/Contexts/Lesson"

import Input from "~/components/Input"
import Flex from "~/components/Flex"

import { createBoard } from "./utils"

const Lichtblick = ({ focused, state }) => {
    useEffect(() => {
    }, [])

    const { store, dispatch } = useContext(LessonContext)

    let lichtblickFrame
    
        lichtblickFrame = (
            <iframe
                src={`https://nwdl.eu/lichtblick/dist/`}
                style={{
                    width: "100%",
                    height: 800,
                    resize: "vertical",
                    overflow: "auto",
                }}
                data-identifier="iframe-0"
            />
        )
    
    return (
        <div>
            {lichtblickFrame}
        </div>
    )
}

export default Lichtblick
