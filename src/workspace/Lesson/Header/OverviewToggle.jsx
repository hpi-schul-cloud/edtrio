import React, { useEffect, useContext } from "react"
import styled from "styled-components"

import overviewIcon from "~/assets/overview.svg"
import redOverviewIcon from "~/assets/overview-red.svg"

import { LessonContext } from "~/contexts/Lesson"

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 25px;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    cursor: pointer;
    user-select: none;

    @media (max-width: 420px) {
        left: 10px;
    }
`

const StyledIcon = styled.img`
    width: 24px;
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
    opacity: ${props => (props.hidden ? 0 : 1)};
    transition: 250ms opacity ease-in;
`

const OverviewToggle = () => {
    const { store, dispatch } = useContext(LessonContext)
    return (
        <Wrapper onClick={() => dispatch({ type: "TOGGLE_SECTION_OVERVIEW" })}>
            <StyledIcon src={overviewIcon} hidden={store.showSectionOverview} />
            <StyledIcon
                src={redOverviewIcon}
                hidden={!store.showSectionOverview}
            />
        </Wrapper>
    )
}

export default OverviewToggle
