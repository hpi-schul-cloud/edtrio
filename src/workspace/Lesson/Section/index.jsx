import React, { useContext, useRef, useEffect } from "react"
import styled, { css } from "styled-components"

import LessonContext from "~/Contexts/Lesson"

import Flex from "~/components/Flex"
import Input from "~/components/Input"
import Text from "~/components/Text"
import Container from "~/components/Container"

import Editor from "./Editor"

const StyledSection = styled(Flex)`
    transition: 250ms all ease-in-out;
    ${props =>
        props.delete &&
        css`
            transform: translateX(500px);
            opacity: 0;
        `}
`

const Wrapper = styled.div`
    flex-shrink: 1;
    flex-grow: 1;
    width: 850px;

    filter: ${props => !props.visible && "blur(2px)"};
    /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
    background-color: #fff;
    border-radius: 5px;
    transition: 250ms margin ease-in-out;
`

const SectionInput = styled(Input)`
    font-weight: 700;
    margin-left: 25px;
    margin-right: 25px;
    margin-right: 25px;
    width: calc(100% - 50px);
    font-family: "PT Sans Narrow", sans-serif;
`

const Warning = styled(Text)`
    width: auto;
    max-width: 850px;
    padding: 15px;
    background-color: #cc0000;
    color: #fff;
    margin-bottom: 25px;
`

const Section = ({ store, dispatch }) => {
    const sectionRef = useRef(null)

    if (!store.activeSectionId)
        return (
            <Container>
                <Flex>
                    <Text center>Kein Abschnitt ausgewählt...</Text>
                </Flex>
            </Container>
        )

    const index = store.lesson.sections.findIndex(
        section => section.id === store.activeSectionId,
    )
    const section = store.lesson.sections[index]
    const isLast = store.lesson.sections.length - 1 === index

    return (
        <StyledSection
            column
            delete={section.delete}
            alignCenter
            data-section={index}
            className="lesson-section"
            ref={sectionRef}>
            <Flex justifyCenter>
                <Warning center bold>
                    +++ Alpha-Testversion +++ ohne Speicherfunktion +++ wir
                    freuen uns über Feedback 🙂 +++
                </Warning>
            </Flex>
            <Wrapper visible={section.visible}>
                <Editor
                    key={section.id}
                    docValue={section.docValue}
                    id={section.id}
                    index={index}
                    editing={store.editing}
                    dispatchChange={collectDocValue => {
                        dispatch({
                            type: "SECTION_DOCVALUE_CHANGE",
                            payload: {
                                sectionId: section.id,
                                collectDocValue,
                            },
                        })
                    }}
                />
            </Wrapper>
        </StyledSection>
    )
}

export default Section
