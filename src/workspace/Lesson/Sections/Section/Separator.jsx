import React from "react"
import styled, { css } from "styled-components"
import uuid from "uuid/v4"

import api from "~/utils/api"

import plusIcon from "~/assets/add-white.svg"
import Flex from "~/components/Flex"
import Button from "~/components/Button"

const SeparatorWrapper = styled(Flex)`
    align-self: stretch;
    height: 100px;
`

const StyledSeparator = styled.div`
    width: 2px;
    height: 100%;
    border-radius: 1px;
    background-color: ${props => (props.hide ? "transparent" : "#C2C2C2")};
    position: relative;
`

const SeparatorButton = styled(Button)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${props =>
        props.small &&
        css`
            width: 26px;
            height: 26px;
            border-radius: 13px;
            padding: 0;
        `}
`

const StyledImage = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 20px;
`

async function handleClick(dispatch, isFirst, index, lessonId) {
    const tempId = uuid()
    dispatch({
        type: "ADD_SECTION",
        payload: {
            position: isFirst ? -1 : index,
            tempId,
        },
    })

    const newSection = await api.post(
        "/editor/sections",
        {
            lessonId,
            visible: true,
        },
        null,
        null,
        { id: uuid(), lessonId },
    )

    dispatch({
        type: "REPLACE_ADDED_SECTION_ID",
        payload: {
            tempId,
            backendId: newSection.id,
        },
    })
}

const Separator = ({ index, isFirst, isLast, lessonId, dispatch, editing }) => {
    const content =
        isFirst || isLast ? (
            "Neuer Abschnitt"
        ) : (
            <StyledImage src={plusIcon} alt="" />
        )

    return (
        <SeparatorWrapper justifyCenter>
            <StyledSeparator hide={isFirst || isLast}>
                {editing && (
                    <SeparatorButton
                        small={!isFirst && !isLast}
                        onClick={() =>
                            handleClick(dispatch, isFirst, index, lessonId)
                        }
                        noMargin>
                        {content}
                    </SeparatorButton>
                )}
            </StyledSeparator>
        </SeparatorWrapper>
    )
}

export default Separator
