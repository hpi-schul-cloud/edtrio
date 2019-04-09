import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"

import LessonContext from "~/Contexts/Lesson"

import Input from "~/components/Input"
import Flex from "~/components/Flex"

import { createBoard } from "./utils"

const Etherpad = ({ focused, state }) => {
    useEffect(() => {
        if (state.id.value) return
        state.id.set(shortid.generate())
    }, [])

    const { store, dispatch } = useContext(LessonContext)

    let etherpadFrame
    if (state.id.value) {
        etherpadFrame = (
            <iframe
                src={`https://etherpad.schul-cloud.org/etherpad/p/${
                    // TODO maybe make this variable?
                    state.id.value
                }`}
                style={{
                    width: "100%",
                    height: 400,
                    resize: "vertical",
                    overflow: "auto",
                }}
                data-identifier="iframe-0"
            />
        )
    }
    return (
        <div>
            {/* <Flex alignEnd>
                <Input
                    size={24}
                    placeholder="Etherpad Titel"
                    style={{ marginBottom: 15, marginRight: 15, width: 150 }}
                    onChange={state.title.set}
                    value={state.title.value}
                    readOnly={!store.editing}
                />
                <Input
                    size={16}
                    style={{ marginBottom: 15, flexGrow: 1 }}
                    placeholder="Etherpad Beschreibung"
                    onChange={state.description.set}
                    value={state.description.value}
                    readOnly={!store.editing}
                />
            </Flex> */}
            {etherpadFrame}
        </div>
    )
}

export default Etherpad
