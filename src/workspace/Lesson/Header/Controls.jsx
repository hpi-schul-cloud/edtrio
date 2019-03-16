import React, { useEffect, useContext } from "react"
import styled, { css } from "styled-components"

import { List as ListIcon } from "@material-ui/icons"
import { SvgIcon } from "@material-ui/core"

import LessonContext from "~/Contexts/Lesson"

const NotesIcon = props => {
    return (
        <SvgIcon {...props}>
            <path d="M8,12H16V14H8V12M10,20H6V4H13V9H18V12.1L20,10.1V8L14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H10V20M8,18H12.1L13,17.1V16H8V18M20.2,13C20.3,13 20.5,13.1 20.6,13.2L21.9,14.5C22.1,14.7 22.1,15.1 21.9,15.3L20.9,16.3L18.8,14.2L19.8,13.2C19.9,13.1 20,13 20.2,13M20.2,16.9L14.1,23H12V20.9L18.1,14.8L20.2,16.9Z" />
        </SvgIcon>
    )
}

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 24px;
    pointer-events: none;
    user-select: none;

    @media (max-width: 600px) {
        display: flex;
        height: 100%;
        flex-direction: column;
        top: 0;
        justify-content: space-evenly;
        transform: none;
        padding-left: 10px;
    }
`

const baseStyles = css`
    position: absolute;
    top: 0;

    pointer-events: all;
    user-select: none;
    color: ${props => (props.state === "active" ? "#AF0337" : "#373A3C")};
    transition: 250ms color ease-in-out;
    cursor: pointer;

    @media (max-width: 600px) {
        position: static;
    }
`

const StyledListIcon = styled(ListIcon)`
    ${baseStyles}
    left: 25px;
`
const StyledNotesIcon = styled(NotesIcon)`
    ${baseStyles}
    right: 25px;
`

const Controls = () => {
    const { store, dispatch } = useContext(LessonContext)

    useEffect(() => {
        if (store.editing === true && window.innerWidth > 1400)
            dispatch({ type: "TOGGLE_NOTES", payload: true })
        if (store.editing === false)
            dispatch({ type: "TOGGLE_NOTES", payload: false })
    }, [store.editing])

    return (
        <Wrapper>
            <StyledListIcon
                onClick={() => dispatch({ type: "TOGGLE_SECTION_OVERVIEW" })}
                state={store.showSectionOverview ? "active" : undefined}
            />
            <StyledNotesIcon
                onClick={() => dispatch({ type: "TOGGLE_NOTES" })}
                state={store.showNotes ? "active" : undefined}
            />
        </Wrapper>
    )
}

export default Controls
