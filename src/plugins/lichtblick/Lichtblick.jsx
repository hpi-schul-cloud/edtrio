import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"

import LessonContext from "~/Contexts/Lesson"

import Input from "~/components/Input"
import Flex from "~/components/Flex"

import { createBoard } from "./utils"
import none from "ramda/es/none"

const Lichtblick = ({ focused, state }) => {
    useEffect(() => {
    }, [])

    const { store, dispatch } = useContext(LessonContext)

    let lichtblickFrame
    
        lichtblickFrame = (
            <iframe
                src={`https://nwdl.eu/lichtblick/dist/`}
                allowFullScreen={true}
                style={{
                    width: "100%",
                    height: 800,
                    border: 0,
                    resize: "vertical",
                    overflow: "auto",
                }}
                data-identifier="iframe-lichtblick"
            />
        )
    
    return (
        <div>
            {lichtblickFrame}
        </div>
    )
}

export default Lichtblick
