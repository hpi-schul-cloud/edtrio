import React from "react"
import styled, { css } from "styled-components"
import uuid from "uuid/v4"

import api from "~/utils/api"
import theme from "~/theme"

import { getFakeSection } from "~/utils/fake"
import { createSection } from "~/actions/lesson"
import Flex from "~/components/Flex"
import {editor} from "~/utils/socket"

const Wrapper = styled(Flex)`
    width: 100%;
    background-color: ${props => (props.expanded ? "#455B6A" : "transparent")};
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
    const newSection = await editor.emit('create', `lesson/${lessonId}/sections`)
  /* const newSection = await api.post(
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
*/
    dispatch({
        type: "REPLACE_ADDED_SECTION_ID",
        payload: {
            tempId,
            backendId: newSection._id,
        },
    })
}

const AddWrapper = styled.div`
    height: 24px;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${props =>
        props.visible
            ? css`
                  margin: 10px;
              `
            : css`
                  position: absolute;
                  top: 0;
                  left: 50%;
                  transform: translate(-50%, -50%);
              `}
`

const SidebarControls = ({ store, dispatch }) => {
    const expanded = store.sectionOverviewExpanded
    const {lesson} = store
    return (
        <Wrapper justifyEnd column={!expanded} alignCenter expanded={expanded}>
            {store.editing && (
                <AddWrapper visible={!expanded}>
                    <StyledIcon
                        onClick={() => {
                            dispatch(createSection(lesson.sections.length-1))
                            // addNewSection(store, dispatch)
                        }}
                        style={{ width: 40, height: 40 }}
                        src={require("~/assets/plus-red-round.svg")}
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
