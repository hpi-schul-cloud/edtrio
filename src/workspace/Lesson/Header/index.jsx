import React, { useContext } from "react"
import styled from "styled-components"

import { LessonContext } from "~/contexts/Lesson"

import Container from "~/components/Container"
import Flex from "~/components/Flex"
import Text from "~/components/Text"
import Input from "~/components/Input"
import { Toggle } from "~/components/Button"

const StyledHeader = styled(Container)`
    height: 75px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 100;
    padding-top: 0;
    padding-bottom: 0;
    box-shadow: 0 5px 25px -15px rgba(0, 0, 0, 1);
`

const SaveStatus = styled(Text)`
    color: rgb(180, 180, 180);
    margin-right: 25px;
`

const Header = () => {
    const { store, dispatch } = useContext(LessonContext)

    return (
        <StyledHeader>
            <Flex justifyBetween alignCenter style={{ height: "100%" }}>
                <Flex alignCenter style={{ height: "100%" }}>
                    <Input
                        noMargin
                        style={{ fontWeight: 700, width: 450 }}
                        size={42}
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
                <Flex alignCenter noWrap style={{ height: "100%" }}>
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
            </Flex>
        </StyledHeader>
    )
}

export default Header
