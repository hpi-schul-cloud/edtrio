import React, { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import LessonContext from "~/Contexts/Lesson"

import Container from "~/components/Container"
import Flex from "~/components/Flex"
import Text from "~/components/Text"
import Input from "~/components/Input"
import { Toggle } from "~/components/Button"

import Controls from "./Controls"

const StyledHeader = styled(Container)`
    height: auto;
    position: fixed;
    top: 0;
    width: calc(100vw - 240px);
    left: 239px;
    background-color: #fff;
    z-index: 100;
    padding-top: 5px !important;
    padding-bottom: 5px !important;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.18);

    @media (max-width: 1250px) {
        width: calc(100vw - 60px);
        left: 60px;
        padding-left: 75px !important;
        padding-right: 25px !important;
    }

    ${props =>
        props.isFullScreen &&
        css`
            width: 100vw !important;
            left: 0px !important;
        `}

    &:hover .save-status {
        ${props =>
            props.editing &&
            css`
                opacity: 1 !important;
            `}
    }

    @media (max-width: 1375px) {
        padding-left: 75px;
        padding-right: 75px;
    }

    @media (max-width: 420px) {
        padding-left: 45px;
        padding-right: 45px;
    }
`

const Wrapper = styled(Flex)`
    @media (max-width: 1325px) {
        justify-content: flex-start;
    }

    @media (max-width: 750px) {
        flex-wrap: wrap;
    }
`

const SaveStatus = styled(Text)`
    color: rgb(180, 180, 180);
    margin-right: 25px;
`

const TitleInput = styled(Input)`
    font-weight: 700;
    width: 450px;

    @media (max-width: 1250px) {
        width: 350px;
    }
    @media (max-width: 800px) {
        width: 250px;
    }

    @media (max-width: 750px) {
        margin-bottom: 10px;
    }
`

const Header = ({ isFullScreen }) => {
    const { store, dispatch } = useContext(LessonContext)
    const [showSaveStatus, setShowSaveStatus] = useState(false)

    useEffect(() => {
        let timeout
        if (store.saveStatus === "Ungesicherte Änderungen")
            return setShowSaveStatus(true)
        if (
            store.saveStatus === "Gespeichert" ||
            store.saveStatus === "Lokal Gespeichert"
        )
            timeout = setTimeout(() => setShowSaveStatus(false), 1500)

        return () => clearTimeout(timeout)
    }, [store.saveStatus])

    return (
        <StyledHeader editing={store.editing} isFullScreen={isFullScreen}>
            <Controls />
            <Wrapper noWrap justifyBetween alignCenter>
                <Flex alignCenter noWrap>
                    <TitleInput
                        noMargin
                        size={30}
                        value={store.lesson.title}
                        readOnly={!store.editing}
                        placeholder="Titel für die Lerneinheit"
                        onChange={newValue =>
                            dispatch({
                                type: "LESSON_TITLE_CHANGE",
                                payload: newValue,
                            })
                        }
                    />
                </Flex>
                <Flex alignCenter noWrap>
                    <SaveStatus
                        noMargin
                        className="save-status"
                        inline
                        style={{
                            textAlign: "right",
                            width: "185px",
                            opacity: showSaveStatus ? 1 : 0,
                            transition: "250ms all ease-in-out",
                        }}>
                        {store.saveStatus}
                    </SaveStatus>
                    <Toggle
                        caption="Präsentieren"
                        activeCaption="Bearbeiten"
                        active={store.editing}
                        onChange={newValue => {
                            dispatch({ type: "SET_EDITING", payload: newValue })
                        }}
                    />
                </Flex>
            </Wrapper>
        </StyledHeader>
    )
}

export default Header
