import React from "react"
import styled from "styled-components"

import Flex from "~/components/Flex"
import Text from "~/components/Text"
import Input from "~/components/Input"

const TitleInput = styled(Input)`
    font-weight: 700;
    font-size: 16px;
    width: 125px;
    margin-top: 14px;
`

const TaskTitle = ({ store, dispatch }) => {
    return (
        <Flex noWrap alignCenter style={{ marginLeft: 25 }}>
            <img
                src={require("~/assets/task-board-red.png")}
                height="20px"
                alt=""
                style={{ marginRight: 15 }}
            />
            <Text noMargin primary>
                Aufgabe:&nbsp;&nbsp;
            </Text>
            <TitleInput
                value={store.task.title}
                onChange={newValue => {
                    dispatch({
                        type: "EDIT_TASK",
                        payload: { title: newValue },
                    })
                }}
            />
        </Flex>
    )
}

export default TaskTitle
