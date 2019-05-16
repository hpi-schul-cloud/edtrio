import React, { useEffect, useContext } from "react"
import styled, { css } from "styled-components"

import listIcon from "~/assets/list.svg"
import redListIcon from "~/assets/list-red.svg"

import LessonContext from "~/Contexts/Lesson"

import Flex from "~/components/Flex"

const StyledListIcon = styled.img`
    pointer-events: all;
    user-select: none;
    cursor: pointer;
    left: 25px;
    width: 32px;
    margin: 0 25px;
`

const Controls = () => {
    const { store, dispatch } = useContext(LessonContext)

    return (
        <Flex alignCenter>
            <StyledListIcon
                src={store.showSectionOverview ? redListIcon : listIcon}
                onClick={() => dispatch({ type: "TOGGLE_SECTION_OVERVIEW" })}
            />
        </Flex>
    )
}

export default Controls
