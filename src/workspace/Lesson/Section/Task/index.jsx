import React from "react"
import styled from "styled-components"

import Input from "~/components/Input"
import Flex from "~/components/Flex"

import DueDate from "./DueDate"
import Share from "./Share"

const TitleInput = styled(Input)`
    border: none;
    color: #000;
    font-weight: 700;
    font-size: 42px;
`

const Task = ({ store, dispatch }) => {
    function change(changeValue) {
        dispatch({
            type: "EDIT_TASK",
            payload: changeValue,
        })
    }

    if (!store.isTask) return null
    return (
        <div style={{ width: 748, marginLeft: 53 }}>
            <TitleInput
                full
                value={store.task.title}
                onChange={newValue => {
                    dispatch({
                        type: "EDIT_TASK",
                        payload: { title: newValue },
                    })
                }}
            />
            <Flex noWrap alignEnd justifyBetween>
                <DueDate task={store.task} change={change} />
                <Share task={store.task} change={change} />
            </Flex>
        </div>
    )
}

export default Task
