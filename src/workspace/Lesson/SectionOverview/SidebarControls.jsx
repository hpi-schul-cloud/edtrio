import React from "react"
import styled, { css } from "styled-components"
import uuid from "uuid/v4"

import api from "~/utils/api"
import theme from "~/theme"

import { getFakeSection } from "~/utils/fake"

import Flex from "~/components/Flex"

const Wrapper = styled(Flex)`
    width: calc(100%);
    background-color: ${props =>
        props.expanded ? theme.primaryColor : "transparent"};
    position: absolute;
    bottom: 0;
    left: 0;
`

const StyledIcon = styled.img`
    cursor: pointer;
    margin: 15px;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
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

const AddWrapper = styled.div`
    ${props =>
        props.visible &&
        css`
            width: 36px;
            height: 36px;
            border-radius: 18px;
            background-color: ${theme.primaryColor};
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px;
        `}
`

const SidebarControls = ({ store, dispatch }) => {
    const expanded = store.sectionOverviewExpanded
    return (
        <Wrapper
            justifyBetween={store.editing}
            justifyEnd={!store.editing}
            expanded={expanded}>
            {store.editing && (
                <AddWrapper visible={!expanded}>
                    <StyledIcon
                        onClick={() => {
                            addNewSection(store, dispatch)
                        }}
                        src={require("~/assets/plus-white.svg")}
                        redRound={!expanded}
                    />
                </AddWrapper>
            )}

            <StyledIcon
                src={
                    !expanded
                        ? require("~/assets/double-arrow-left-red.svg")
                        : require("~/assets/double-arrow-left-white.svg")
                }
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
