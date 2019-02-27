import React, { useContext } from "react"
import styled from "styled-components"

import arrowLeft from "~/assets/arrow-left.svg"

import { LessonContext } from "~/contexts/Lesson"

import Heading from "~/components/Heading"
import Flex from "~/components/Flex"
import Text from "~/components/Text"

const Wrapper = styled(Flex)`
    padding: ${props => (props.visible ? 15 : 0)}px;
    width: ${props => (props.visible ? 250 : 0)}px;
    background-color: ${props =>
        props.visible ? "rgb(250, 250, 250)" : "#fff"};

    transition: 250ms all ease-in-out;
    height: 100%;
`

const StyledNotes = styled.textarea`
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    background-color: ${props =>
        props.visible ? "rgb(250, 250, 250)" : "#fff"};
    opacity: ${props => (props.visible ? 1 : 0)};
    pointer-events: ${props => !props.visible && "none"};
    border: none;
    font-size: 20px;
    max-height: 100%;
    flex-grow: 1;
    line-height: 1.5;
    transition: 250ms all ease-in-out;
    color: rgb(100, 100, 100);
    font-family: "PT Sans", sans-serif;
    resize: none;

    &:focus {
        outline: none;
    }
`

const Toggle = styled(Flex)`
    position: absolute;
    top: 50;
    left: 100%;
    background-color: rgb(250, 250, 250);
    padding: 5px;
    cursor: pointer;
    user-select: none;
    border-radius: 0 5px 5px 0;
    z-index: 20;
`

const ToggleText = styled(Text)`
    display: inline-block;
    margin-bottom: 0;
    user-select: none;
    cursor: pointer;
    text-align: center;
    height: ${props => (props.hide ? 0 : 20)}px;
    opacity: ${props => (props.hide ? 0 : 1)};
    overflow: hidden;
    transition: 250ms all ease-in-out;
`

const ToggleArrow = styled.img`
    transform-origin: center center;
    margin-top: 5px;
    height: 14px;
    transition: 250ms all ease-in-out;
    transform: ${props =>
        props.open ? "translateX(-1px)" : "translateX(1px) rotate(180deg)"};
`

const Notes = ({ notes, sectionId }) => {
    const { store, dispatch } = useContext(LessonContext)

    return (
        <div style={{ paddingTop: 50, position: "relative", marginRight: 20 }}>
            <Toggle
                column
                alignCenter
                onClick={() => dispatch({ type: "TOGGLE_NOTES" })}>
                {"NOTIZEN".split("").map((char, i) => (
                    <ToggleText key={i} hide={store.showNotes}>
                        {char}
                    </ToggleText>
                ))}
                <ToggleArrow src={arrowLeft} open={store.showNotes} />
            </Toggle>
            <Wrapper visible={store.showNotes} column editing={store.editing}>
                <Heading
                    h5
                    style={{
                        opacity: store.showNotes ? 1 : 0,
                        transition: "250ms opacity ease-in-out",
                    }}>
                    Notizen
                </Heading>
                <StyledNotes
                    autoCorrect="off"
                    spellCheck={store.editing}
                    readOnly={!store.editing}
                    visible={store.showNotes}
                    value={notes}
                    onChange={evt =>
                        dispatch({
                            type: "NOTES",
                            payload: {
                                sectionId,
                                newValue: evt.target.value,
                            },
                        })
                    }
                />
            </Wrapper>
        </div>
    )
}

export default Notes
