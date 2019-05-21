import React from "react"
import styled from "styled-components"
import uuid from "uuid/v4"

import api from "~/utils/api"
import theme from "~/theme"

import { getFakeSection } from "~/utils/fake"

import Flex from "~/components/Flex"

const Wrapper = styled(Flex)`
    width: calc(100% - 5px);
    background-color: ${theme.colorDarkerGrey};
    position: absolute;
    bottom: 0;
    left: 0;
`

const StyledIcon = styled.img`
    cursor: pointer;
    margin: 15px;
    width: 24px;
    transform: ${props => !props.expanded && "rotate(180deg)"};
    transition: 250ms all ease-in-out;
`

async function addNewSection(store, dispatch) {
    const tempId = uuid()
    const lessonId = store.lesson.id
    const position = store.lesson.sections.length - 1
    dispatch({
        type: "ADD_SECTION",
        payload: {
            position,
            tempId,
        },
    })

    const newSection = await api.post(
        "/editor/sections",
        {
            lesson: lessonId,
            visible: true,
            position,
            notes: "",
            title: "",
        },
        null,
        null,
        getFakeSection(lessonId),
    )

    dispatch({
        type: "REPLACE_ADDED_SECTION_ID",
        payload: {
            tempId,
            backendId: newSection._id,
        },
    })
}

const SidebarControls = ({ store, dispatch }) => {
    const expanded = store.sectionOverviewExpanded
    return (
        <Wrapper justifyBetween>
            <StyledIcon
                onClick={() => {
                    addNewSection(store, dispatch)
                }}
                src={require("~/assets/plus-white.svg")}
            />
            <StyledIcon
                src={require("~/assets/double-arrow-left-white.svg")}
                expanded={expanded}
                onClick={() => {
                    dispatch({
                        type: "TOGGLE_SECTION_OVERVIEW",
                        payload: !expanded,
                    })
                }}
            />
        </Wrapper>
    )
}

export default SidebarControls
