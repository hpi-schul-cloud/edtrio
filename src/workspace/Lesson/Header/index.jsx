import React, { useContext } from "react"
import styled from "styled-components"

import { LessonContext } from "~/contexts/Lesson"

import Container from "~/components/Container"
import Flex from "~/components/Flex"
import Heading from "~/components/Heading"
import { Toggle } from "~/components/Button"

const StyledHeader = styled(Container)`
    height: 125px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
`

const Header = ({ title }) => {
    const { store, dispatch } = useContext(LessonContext)

    return (
        <StyledHeader>
            <Flex justifyBetween alignCenter>
                <Flex alignCenter>
                    <Heading>{title}</Heading>
                </Flex>
                <Flex>
                    <Toggle
                        caption="Presentation"
                        activeCaption="Edit"
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
