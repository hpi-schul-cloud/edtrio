import React, { useEffect, useContext } from "react"
import styled, { css } from "styled-components"

import listIcon from "~/assets/list.svg"
import redListIcon from "~/assets/list-red.svg"
import notesIcon from "~/assets/notes.svg"
import redNotesIcon from "~/assets/notes-red.svg"

import LessonContext from "~/Contexts/Lesson"

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
    height: 24px;

    pointer-events: all;
    user-select: none;
    cursor: pointer;

    @media (max-width: 600px) {
        position: static;
    }
`

const StyledListIcon = styled.img`
    ${baseStyles}
    left: 25px;
`
const StyledNotesIcon = styled.img`
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
                src={store.showSectionOverview ? redListIcon : listIcon}
                onClick={() => dispatch({ type: "TOGGLE_SECTION_OVERVIEW" })}
            />
            <StyledNotesIcon
                src={store.showNotes ? redNotesIcon : notesIcon}
                onClick={() => dispatch({ type: "TOGGLE_NOTES" })}
                state={store.showNotes ? "active" : undefined}
            />
        </Wrapper>
    )
}

export default Controls
