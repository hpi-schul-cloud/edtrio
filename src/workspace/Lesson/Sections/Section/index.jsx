import React, { useContext } from "react"
import styled, { css } from "styled-components"

import { LessonContext } from "~/contexts/Lesson"

import Flex from "~/components/Flex"
import Input from "~/components/Input"

import Editor from "./Editor"
import Notes from "./Notes"
import Separator from "./Separator"

const Wrapper = styled.div`
    width: 650px;
    padding: 25px;
    border-radius: 5px;

    box-shadow: 0 5px 30px -15px rgba(0, 0, 0, 1);
    transition: 250ms all ease-in-out;
    margin-right: 25px;

    &:hover {
        box-shadow: 0 5px 40px -15px rgba(0, 0, 0, 1);
    }
`

const OrderChanger = styled(Flex)`
    width: 50px;
    margin-left: 200px;

    transition: 250ms opacity ease-in-out;
    ${props =>
        props.hide &&
        css`
            opacity: 0;
            pointer-events: none;
        `}
`

const Arrow = styled.img`
    cursor: pointer;
    margin: 5px;
    width: 24px;
    ${props =>
        !props.visible &&
        css`
            opacity: 0;
            pointer-events: none;
            cursor: inherit;
        `}
`

const Section = ({ section, isLast, index }) => {
    const { store, dispatch } = useContext(LessonContext)

    return (
        <Flex
            column
            alignCenter
            data-section={index}
            className="lesson-section">
            {index === 0 && (
                <Separator
                    isFirst
                    dispatch={dispatch}
                    index={index}
                    editing={store.editing}
                />
            )}
            <Flex alignStretch>
                <OrderChanger column alignCenter hide={!store.editing}>
                    <Arrow
                        src={require("~/assets/arrow-up.svg")}
                        alt=""
                        visible={index !== 0}
                        onClick={() => {
                            dispatch({
                                type: "SWAP_SECTIONS",
                                payload: [index, index - 1],
                            })
                        }}
                    />
                    <Arrow
                        src={require("~/assets/arrow-down.svg")}
                        alt=""
                        onClick={() => {
                            dispatch({
                                type: "SWAP_SECTIONS",
                                payload: [index, index + 1],
                            })
                        }}
                        visible={!isLast}
                    />
                </OrderChanger>
                <Wrapper>
                    <Input
                        style={{ fontWeight: 700 }}
                        full
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
                    <Editor docValue={section.docValue} />
                </Wrapper>
                <Notes notes={section.notes} sectionId={section.id} />
            </Flex>
            <Separator
                isLast={isLast}
                dispatch={dispatch}
                index={index}
                editing={store.editing}
            />
        </Flex>
    )
}

export default Section
