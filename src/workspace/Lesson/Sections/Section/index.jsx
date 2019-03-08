import React, { useContext, useRef, useEffect } from "react"
import styled, { css } from "styled-components"

import { LessonContext } from "~/contexts/Lesson"

import Flex from "~/components/Flex"
import Input from "~/components/Input"

import Editor from "./Editor"
import Notes from "./Notes"
import Separator from "./Separator"
import Controls from "./Controls"

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
    padding: 25px;
    flex-shrink: 1;
    flex-grow: 1;
    max-width: 850px;

    filter: ${props => !props.visible && "blur(2px)"};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    background-color: #fff;
    border-radius: 5px;
    transition: 250ms margin ease-in-out;
`

const Section = ({ section, isLast, index }) => {
    const { store, dispatch } = useContext(LessonContext)
    const sectionRef = useRef(null)
    return (
        <StyledSection
            column
            delete={section.delete}
            alignCenter
            data-section={index}
            className="lesson-section"
            ref={sectionRef}>
            {index === 0 && (
                <Separator
                    isFirst
                    lessonId={store.lesson.id}
                    dispatch={dispatch}
                    index={index}
                    editing={store.editing}
                />
            )}
            <Flex noWrap alignStretch justifyCenter style={{ width: "100%" }}>
                <Controls
                    sectionTitle={section.title}
                    store={store}
                    index={index}
                    dispatch={dispatch}
                    isLast={isLast}
                    sectionRef={sectionRef}
                    visible={section.visible}
                    sectionId={section.id}
                />
                <Wrapper visible={section.visible}>
                    <Input
                        style={{ fontWeight: 700 }}
                        full
                        noMargin
                        size={32}
                        value={section.title}
                        readOnly={!store.editing}
                        placeholder="Titel für diesen Abschnitt"
                        onChange={newValue =>
                            dispatch({
                                type: "SECTION_TITLE_CHANGE",
                                payload: {
                                    sectionId: section.id,
                                    title: newValue,
                                },
                            })
                        }
                    />
                    <Editor
                        docValue={section.docValue}
                        index={index}
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
                <Notes notes={section.notes} sectionId={section.id} />
            </Flex>
            <Separator
                isLast={isLast}
                dispatch={dispatch}
                index={index}
                lessonId={store.lesson.id}
                editing={store.editing}
            />
        </StyledSection>
    )
}

export default Section
