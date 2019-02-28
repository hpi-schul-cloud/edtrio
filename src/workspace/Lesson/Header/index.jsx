import React, { useContext } from "react"
import styled from "styled-components"

import { LessonContext } from "~/contexts/Lesson"

import Container from "~/components/Container"
import Flex from "~/components/Flex"
import Text from "~/components/Text"
import Input from "~/components/Input"
import { Toggle } from "~/components/Button"

import OverviewToggle from "./OverviewToggle"

const StyledHeader = styled(Container)`
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 100;
    padding-top: 5px !important;
    padding-bottom: 5px !important;
    box-shadow: 0 5px 25px -15px rgba(0, 0, 0, 1);

    @media (max-width: 1150px) {
        padding-left: 75px;
        padding-right: 75px;
    }

    @media (max-width: 420px) {
        padding-left: 45px;
        padding-right: 45px;
    }
`

const Wrapper = styled(Flex)`
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

    @media (max-width: 900px) {
        width: 350px;
    }
    @media (max-width: 800px) {
        width: 250px;
    }

    @media (max-width: 750px) {
        margin-bottom: 10px;
    }
`

const Header = () => {
    const { store, dispatch } = useContext(LessonContext)

    return (
        <StyledHeader>
            <OverviewToggle />
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
                    <SaveStatus noMargin>{store.saveStatus}</SaveStatus>
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